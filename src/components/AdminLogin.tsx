import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export const AdminLogin: React.FC<{onSuccess:(user:any)=>void; onCancel:()=>void}> = ({onSuccess,onCancel}) => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault(); setBusy(true); setError('');
    const {data,error}=await supabase.auth.signInWithPassword({email,password});
    if(error) setError('Invalid email or password.');
    else if(data.user?.app_metadata?.role !== 'admin') {
      await supabase.auth.signOut();
      setError('This account is not authorized for the admin dashboard.');
    } else onSuccess(data.user);
    setBusy(false);
  };

  return <div className="min-h-screen bg-[#f6fbf5] flex items-center justify-center px-4">
    <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-[#dec0b5]/70 bg-white p-7 shadow-xl">
      <div className="text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9f3e07]">Paradise Hotel & Restaurant</p>
        <h1 className="mt-2 font-headline-md">Admin Login</h1>
        <p className="mt-2 text-sm text-[#57423a]">Authorized staff only.</p>
      </div>
      <div className="mt-6 space-y-4">
        <label className="block space-y-1.5"><span className="text-xs font-bold text-[#57423a]">Email</span><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-xl border border-[#dec0b5] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#9f3e07]" /></label>
        <label className="block space-y-1.5"><span className="text-xs font-bold text-[#57423a]">Password</span><input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-xl border border-[#dec0b5] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#9f3e07]" /></label>
        {error&&<p className="rounded-xl bg-[#ffdad6] px-3 py-2 text-sm font-semibold text-[#93000a]">{error}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-[#9f3e07] px-4 py-3 text-sm font-bold text-white hover:bg-[#7d2d00] disabled:opacity-60">{busy?'Signing in...':'Login'}</button>
        <button type="button" onClick={onCancel} className="w-full rounded-xl bg-[#f0f5f0] px-4 py-3 text-sm font-bold text-[#36684c]">Back to website</button>
      </div>
    </form>
  </div>;
};
