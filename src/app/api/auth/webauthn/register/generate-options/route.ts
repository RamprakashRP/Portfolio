import { NextResponse } from 'next/server';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { cookies } from 'next/headers';
import { rpName, ADMIN_USER_ID, ADMIN_USERNAME } from '@/lib/webauthn';
import { supabase } from '@/lib/supabase';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const rpID = url.hostname;

  try {
    // 1. Fetch existing credentials for the admin user so we don't re-register the same device
    const { data: credentials } = await supabase
      .from('passkey_credentials')
      .select('id')
      .eq('user_id', ADMIN_USER_ID);

    const excludeCredentials = (credentials || []).map(cred => ({
      id: cred.id,
      type: 'public-key' as const,
      transports: ['internal', 'usb', 'ble', 'nfc'] as any,
    }));

    // Convert userID to Uint8Array as required by newer versions of SimpleWebAuthn
    const userIDUint8 = new Uint8Array(Buffer.from(ADMIN_USER_ID));

    // 2. Generate Registration Options
    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID: userIDUint8,
      userName: ADMIN_USERNAME,
      attestationType: 'none',
      excludeCredentials,
      authenticatorSelection: {
        residentKey: 'required',
        userVerification: 'preferred',
      },
    });

    // 3. Store challenge in an httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set('registration_challenge', options.challenge, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 300, // 5 minutes
    });

    return NextResponse.json(options);
  } catch (error: any) {
    console.error('Error generating registration options', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
