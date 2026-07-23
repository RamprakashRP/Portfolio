import { NextResponse } from 'next/server';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { cookies } from 'next/headers';
import { rpID, origin } from '@/lib/webauthn';
import { supabase } from '@/lib/supabase';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-for-development-only-change-in-prod');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const expectedChallenge = cookies().get('authentication_challenge')?.value;

    if (!expectedChallenge) {
      return NextResponse.json({ error: 'Challenge expired' }, { status: 400 });
    }

    // Get the credential from database
    const { data: credential } = await supabase
      .from('passkey_credentials')
      .select('*')
      .eq('id', body.id)
      .single();

    if (!credential) {
      return NextResponse.json({ error: 'Credential not found' }, { status: 400 });
    }

    const verification = await verifyAuthenticationResponse({
      response: body,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      authenticator: {
        credentialID: Buffer.from(credential.id, 'base64url'),
        credentialPublicKey: Buffer.from(credential.public_key, 'base64url'),
        counter: Number(credential.sign_count),
        transports: credential.transports,
      },
    });

    const { verified, authenticationInfo } = verification;

    if (verified && authenticationInfo) {
      // Update counter in DB
      await supabase.from('passkey_credentials').update({
        sign_count: authenticationInfo.newCounter,
        last_used_at: new Date().toISOString()
      }).eq('id', credential.id);

      // Generate JWT for session
      const token = await new SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(JWT_SECRET);

      // Set cookie
      cookies().set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
      });
      
      cookies().delete('authentication_challenge');

      return NextResponse.json({ verified: true });
    }

    return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
  } catch (error: any) {
    console.error('Error verifying auth', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
