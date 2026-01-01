export function AmbientBackground() {
	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden">
			{/* Main gradient blobs - smaller on mobile */}
			<div
				className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-600/10 rounded-full blur-[80px] sm:blur-[120px] animate-pulse"
				style={{ animationDuration: '4s' }}
			/>
			<div
				className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-80 sm:h-80 bg-green-500/10 rounded-full blur-[60px] sm:blur-[100px] animate-pulse"
				style={{ animationDuration: '6s' }}
			/>
			<div
				className="absolute top-1/2 left-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-teal-600/10 rounded-full blur-[50px] sm:blur-[80px] animate-pulse"
				style={{ animationDuration: '5s' }}
			/>

			{/* Floating particles - visible on all devices */}
			<div className="absolute top-1/4 right-1/3 w-2 h-2 bg-emerald-400/30 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
			<div
				className="absolute top-2/3 left-1/4 w-1.5 h-1.5 bg-teal-400/30 rounded-full animate-bounce"
				style={{ animationDuration: '4s', animationDelay: '1s' }}
			/>
			<div
				className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-green-400/40 rounded-full animate-bounce"
				style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}
			/>

			{/* Subtle grid overlay */}
			<div
				className="absolute inset-0 opacity-[0.02]"
				style={{
					backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
					backgroundSize: '40px 40px',
				}}
			/>
		</div>
	);
}
