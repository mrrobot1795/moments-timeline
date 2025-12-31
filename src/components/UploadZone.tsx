'use client';

import { ImageIcon } from './Icons';

interface UploadZoneProps {
	isDragging: boolean;
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	onDrop: (e: React.DragEvent) => void;
	onDragOver: (e: React.DragEvent) => void;
	onDragLeave: (e: React.DragEvent) => void;
	onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onOpenPicker: () => void;
}

export function UploadZone({ isDragging, fileInputRef, onDrop, onDragOver, onDragLeave, onFileSelect, onOpenPicker }: Readonly<UploadZoneProps>) {
	return (
		<section
			aria-label="File upload drop zone"
			className="relative z-10 w-full max-w-xl pb-8"
			onDrop={onDrop}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
		>
			<button
				type="button"
				onClick={onOpenPicker}
				className={`
          w-full p-8 md:p-12 rounded-2xl cursor-pointer
          border border-dashed transition-all duration-500 ease-out
          ${isDragging ? 'border-emerald-400 bg-emerald-500/10 scale-[1.02]' : 'border-white/10 bg-white/2 hover:border-white/20 hover:bg-white/4'}
        `}
			>
				<input ref={fileInputRef} type="file" accept="image/*" multiple onChange={onFileSelect} className="hidden" />
				<div className="flex flex-col items-center justify-center text-center">
					<div
						className={`
              w-16 h-16 mb-6 rounded-full
              flex items-center justify-center transition-all duration-500
              ${isDragging ? 'bg-emerald-500/20' : 'bg-white/5'}
            `}
					>
						<ImageIcon className={`w-8 h-8 transition-colors duration-300 ${isDragging ? 'text-emerald-400' : 'text-white/30'}`} />
					</div>
					<p className="text-white/60 font-light mb-2">{isDragging ? 'Release to add to timeline' : 'Drop images here or click to browse'}</p>
					<p className="text-white/30 text-sm">Supports JPG, PNG, GIF, WebP</p>
				</div>
			</button>
		</section>
	);
}
