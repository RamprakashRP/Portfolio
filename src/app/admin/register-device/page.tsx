'use client';
import { useState } from 'react';
import { startRegistration } from '@simplewebauthn/browser';

export default function RegisterDevicePage() {
  const [secret, setSecret] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [status, setStatus] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const expectedSecret = process.env.NEXT_PUBLIC_REGISTER_SECRET || 'ramprakash_secret_2026';
    if (secret === expectedSecret) {
      setIsAuthenticated(true);
    } else {
      setStatus('Invalid secret');
    }
  };

  const handleRegister = async () => {
    setStatus('Generating registration options...');
    try {
      const resp = await fetch('/api/auth/webauthn/register/generate-options');
      const options = await resp.json();
      
      if (options.error) {
        throw new Error(options.error);
      }

      setStatus('Please use your authenticator...');
      const attResp = await startRegistration(options);

      setStatus('Verifying registration...');
      const verifyResp = await fetch('/api/auth/webauthn/register/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attResp),
      });

      const verifyResult = await verifyResp.json();
      if (verifyResult.verified) {
        setStatus('Registration successful! You can now use this device to log in.');
      } else {
        throw new Error(verifyResult.error || 'Verification failed');
      }
    } catch (error: any) {
      console.error(error);
      setStatus(`Error: ${error.message}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">Device Registration</h1>
        <form onSubmit={handleAuth} className="flex flex-col gap-4 w-64">
          <input 
            type="password" 
            value={secret} 
            onChange={e => setSecret(e.target.value)}
            placeholder="Enter registration secret"
            className="p-2 rounded bg-neutral-900 border border-neutral-700 text-white"
          />
          <button type="submit" className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition">
            Unlock
          </button>
        </form>
        {status && <p className="mt-4 text-red-400">{status}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Register New Device</h1>
      <p className="text-neutral-400 mb-8 max-w-md text-center">
        Register this device (Mobile, Tablet, or PC) to use its biometric authentication (FaceID / Fingerprint) to access the Admin Panel.
      </p>
      
      <button 
        onClick={handleRegister}
        className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition shadow-[0_0_20px_rgba(255,255,255,0.3)]"
      >
        Register Passkey on this Device
      </button>

      {status && <p className="mt-6 text-neutral-300 bg-white/5 p-4 rounded border border-white/10">{status}</p>}
    </div>
  );
}
