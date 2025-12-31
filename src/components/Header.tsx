'use client';

import { User } from '@/types';

interface HeaderProps {
	user: User | null;
	onLogout: () => Promise<void>;
}

export function Header({ user, onLogout }: Readonly<HeaderProps>) {
	return (
		<header className="relative z-10 pt-16 pb-8 px-6">
			<div className="max-w-4xl mx-auto text-center">
				<h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4">
					<span className="bg-linear-to-r from-emerald-300 via-green-300 to-teal-200 bg-clip-text text-transparent">Moments</span>
				</h1>
				<p className="text-white/40 text-lg font-light tracking-wide">Our visual journey through time</p>
				{user && (
					<div className="mt-4 flex items-center justify-center gap-4">
						<span className="text-white/40 text-sm">Hi, {user.name}</span>
						<button type="button" onClick={onLogout} className="text-white/40 hover:text-white/60 text-sm underline transition-colors">
							Sign out
						</button>
					</div>
				)}
			</div>
		</header>
	);
}
