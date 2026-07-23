import { NextResponse } from 'next/server';
import { verifyRegistrationResponse } from '@simplewebauthn/server';
import { cookies } from 'next/headers';
import { ADMIN_USER_ID } from '@/lib/webauthn';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const url = new URL(req.url);
  const rpID = url.hostname;
  const origin = url.origin;

  try {
    const body = await req.json();
    
    // Retrieve challenge from cookie
    const cookieStore = await cookies();
    const expectedChallenge = cookieStore.get('registration_challenge')?.value;
    
    if (!expectedChallenge) {
      return NextResponse.json({ error: 'Challenge not found or expired' }, { status: 400 });
    }

    const verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
    });

    const { verified, registrationInfo } = verification;

    if (verified && registrationInfo) {
      const { credential, credentialDeviceType, credentialBackedUp } = registrationInfo;
      const { id, publicKey, counter } = credential;

      // Base64Url encode buffer
      const credentialIDBase64 = id; // id is already a base64url string in v13
      const publicKeyBase64 = Buffer.from(publicKey).toString('base64url');

      // Save to Supabase
      const { error } = await supabase.from('passkey_credentials').insert({
        id: credentialIDBase64,
        user_id: ADMIN_USER_ID,
        public_key: publicKeyBase64,
        sign_count: counter,
        transports: body.response.transports || [],
        device_type: credentialDeviceType,
        backed_up: credentialBackedUp,
      });

      if (error) {
        console.error('Database insert error:', error);
        return NextResponse.json({ error: 'Failed to save credential' }, { status: 500 });
      }

      // Clear challenge cookie
      cookieStore.delete('registration_challenge');
      return NextResponse.json({ verified: true });
    }

    return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
  } catch (error: any) {
    console.error('Error verifying registration', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
