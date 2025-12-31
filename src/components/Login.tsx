'use client';

import { useState } from 'react';

interface LoginProps {
	onLogin: (email: string, password: string, rememberMe: boolean) => Promise<{ success: boolean; error?: string }>;
}

export function Login({ onLogin }: Readonly<LoginProps>) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		const result = await onLogin(email, password, rememberMe);
		if (!result.success) {
			setError(result.error || 'Login failed');
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#0a0d0a] px-4">
			<div className="w-full max-w-md">
				<h1 className="text-4xl font-light text-center mb-2">
					<span className="bg-linear-to-r from-emerald-300 via-green-300 to-teal-200 bg-clip-text text-transparent">Moments</span>
				</h1>
				<p className="text-white/40 text-center mb-8">Our visual journey through time</p>

				<form onSubmit={handleSubmit} className="bg-white/3 border border-white/10 rounded-2xl p-8">
					<label htmlFor="email" className="block text-white/60 text-sm mb-2">
						Email
					</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder="you@example.com"
						required
						className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/50 mb-4"
					/>

					<label htmlFor="password" className="block text-white/60 text-sm mb-2">
						Password
					</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder="••••••••"
						required
						className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/50 mb-4"
					/>
					<label className="flex items-center gap-2 mb-4 cursor-pointer">
						<input
							type="checkbox"
							checked={rememberMe}
							onChange={e => setRememberMe(e.target.checked)}
							className="w-4 h-4 rounded border-white/10 bg-white/5 text-emerald-500 focus:ring-emerald-500/50"
						/>
						<span className="text-white/60 text-sm">Remember me for 7 days</span>
					</label>

					{error && <p className="text-red-400 text-sm mb-4">{error}</p>}

					<button
						type="submit"
						disabled={isLoading}
						className="w-full py-3 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors disabled:opacity-50"
					>
						{isLoading ? 'Signing in...' : 'Sign in'}
					</button>
				</form>
			</div>
		</div>
	);
}
