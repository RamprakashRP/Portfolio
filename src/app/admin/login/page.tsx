'use client';
import { useState, useEffect } from 'react';
import { startAuthentication } from '@simplewebauthn/browser';
import { useRouter } from 'next/navigation';
import { Fingerprint } from 'lucide-react';

export default function AdminLoginPage() {
  const [status, setStatus] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const router = useRouter();

  // Optionally auto-trigger on mount, but button is better for UX
  const handleLogin = async () => {
    setIsAuthenticating(true);
    setStatus('Requesting authentication options...');
    try {
      const resp = await fetch('/api/auth/webauthn/authenticate/generate-options');
      const options = await resp.json();
      
      if (options.error) {
        throw new Error(options.error);
      }

      setStatus('Please use your authenticator...');
      const asseResp = await startAuthentication(options);

      setStatus('Verifying authentication...');
      const verifyResp = await fetch('/api/auth/webauthn/authenticate/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(asseResp),
      });

      const verifyResult = await verifyResp.json();
      if (verifyResult.verified) {
        setStatus('Authentication successful! Redirecting...');
        // Refresh router so middleware recognizes the new cookie
        router.push('/admin');
        router.refresh();
      } else {
        throw new Error(verifyResult.error || 'Verification failed');
      }
    } catch (error: any) {
      console.error(error);
      setStatus(`Login failed: ${error.message}`);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_70%)]" />
      
      <div className="relative z-10 flex flex-col items-center bg-white/[0.02] border border-white/5 p-12 rounded-3xl shadow-2xl backdrop-blur-xl max-w-sm w-full">
        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner relative overflow-hidden">
          <Fingerprint className={`w-10 h-10 ${isAuthenticating ? 'text-red-500 animate-pulse' : 'text-neutral-400'}`} />
          {isAuthenticating && (
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50 blur-[2px] animate-[scan_1.5s_ease-in-out_infinite]" />
          )}
        </div>

        <h1 className="text-2xl font-bold mb-2 tracking-tight">Admin Authentication</h1>
        <p className="text-neutral-500 text-center mb-8 text-sm">
          Please verify your identity using a registered device passkey to continue.
        </p>

        <button 
          onClick={handleLogin}
          disabled={isAuthenticating}
          className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Fingerprint className="w-5 h-5" />
          {isAuthenticating ? 'Authenticating...' : 'Sign in with Passkey'}
        </button>

        {status && (
          <p className="mt-6 text-sm text-center text-neutral-400 max-w-[250px]">{status}</p>
        )}
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-10px); }
          50% { transform: translateY(90px); }
          100% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
