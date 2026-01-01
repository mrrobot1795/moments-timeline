export function ImageSkeleton() {
	return (
		<div className="aspect-4/3 bg-white/5 rounded-t-2xl overflow-hidden">
			<div className="w-full h-full animate-pulse bg-linear-to-r from-white/5 via-white/10 to-white/5 bg-size-[200%_100%] animate-shimmer" />
		</div>
	);
}
