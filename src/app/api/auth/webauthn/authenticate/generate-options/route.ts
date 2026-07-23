import { NextResponse } from 'next/server';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { cookies } from 'next/headers';
import { rpID, ADMIN_USER_ID } from '@/lib/webauthn';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: credentials } = await supabase
      .from('passkey_credentials')
      .select('id, transports')
      .eq('user_id', ADMIN_USER_ID);

    if (!credentials || credentials.length === 0) {
      return NextResponse.json({ error: 'No passkeys found for admin.' }, { status: 404 });
    }

    const allowCredentials = credentials.map(cred => ({
      id: cred.id,
      type: 'public-key' as const,
      transports: cred.transports as any,
    }));

    const options = await generateAuthenticationOptions({
      rpID,
      allowCredentials,
      userVerification: 'preferred',
    });

    const cookieStore = await cookies();
    cookieStore.set('authentication_challenge', options.challenge, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 300,
    });

    return NextResponse.json(options);
  } catch (error: any) {
    console.error('Error generating auth options', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
