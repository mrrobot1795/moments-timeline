export function AmbientBackground() {
	return (
		<div className="fixed inset-0 pointer-events-none">
			<div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]" />
			<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-[100px]" />
			<div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-600/8 rounded-full blur-[80px]" />
		</div>
	);
}
