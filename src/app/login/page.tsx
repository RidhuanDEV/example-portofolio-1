"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, Mail, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md border border-white/10 bg-[#08090b]/40 p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
      {/* Decorative top border glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      <div className="mb-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-400">control plane</p>
        <h1 className="mt-3 text-3xl font-semibold text-white tracking-tight">Admin Authentication</h1>
        <p className="mt-2 text-sm text-zinc-400">Sign in to manage your portfolio</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5">
        {error ? (
          <div className="flex items-center gap-3 border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
            <AlertCircle size={18} className="shrink-0 text-red-400" />
            <p>{error}</p>
          </div>
        ) : null}

        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium text-zinc-300 flex items-center gap-2">
            <Mail size={14} className="text-zinc-500" />
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="admin-input focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all duration-200"
            placeholder="admin@example.com"
            disabled={loading}
            autoComplete="email"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium text-zinc-300 flex items-center gap-2">
            <Lock size={14} className="text-zinc-500" />
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="admin-input focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all duration-200"
            placeholder="••••••••"
            disabled={loading}
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 bg-cyan-400 px-4 py-3 text-sm font-semibold text-zinc-950 disabled:opacity-50 mt-4 cursor-pointer btn-hover-lift hover:bg-cyan-300 transition duration-200"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              Authenticate
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Suspense
        fallback={
          <div className="flex items-center gap-2 text-zinc-400">
            <Loader2 size={20} className="animate-spin text-cyan-400" />
            <span className="font-mono text-sm uppercase tracking-wider">Loading auth portal...</span>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
