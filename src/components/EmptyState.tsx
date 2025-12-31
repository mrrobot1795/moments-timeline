import { ClockIcon } from './Icons';

export function EmptyState() {
	return (
		<div className="relative z-10 text-center py-24 px-6">
			<div className="max-w-md mx-auto">
				<div className="w-24 h-24 mx-auto mb-8 rounded-full bg-emerald-500/2 flex items-center justify-center">
					<ClockIcon className="w-12 h-12 text-emerald-400/20" />
				</div>
				<h2 className="text-2xl font-light text-white/30 mb-3">No moments yet</h2>
				<p className="text-white/20 font-light">Upload your first image to start building your timeline</p>
			</div>
		</div>
	);
}
