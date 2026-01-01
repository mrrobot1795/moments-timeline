'use client';

import { Header, AmbientBackground, UploadZone, Timeline, EmptyState, Login, Toast } from '@/components';
import { useTimeline, useFileUpload, useAuth, useToast } from '@/hooks';

function LoadingSpinner() {
	return (
		<div className="py-24 text-center">
			<div className="w-12 h-12 mx-auto mb-4 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
			<p className="text-white/40 font-light">Loading your moments...</p>
		</div>
	);
}

export default function ImageTimeline() {
	const { user, isLoading: authLoading, isAuthenticated, login, logout } = useAuth();
	const { items, isLoading, error, addItem, updateItem, deleteItem, clearError } = useTimeline(isAuthenticated);
	const { toast, showToast, hideToast } = useToast();

	const handleAddItem = async (imageUrl: string, fileName: string) => {
		await addItem(imageUrl, fileName);
		showToast('Moment added!', 'success');
	};

	const handleUpdateItem = async (id: string, updates: { caption?: string; date?: string }) => {
		await updateItem(id, updates);
		showToast('Moment updated!', 'success');
	};

	const handleDeleteItem = async (id: string) => {
		await deleteItem(id);
		showToast('Moment deleted', 'info');
	};
	const { isDragging, fileInputRef, handleDrop, handleDragOver, handleDragLeave, handleFileSelect, openFilePicker } = useFileUpload({
		onFileProcessed: handleAddItem,
		maxWidth: 1920, // Adjust max dimensions
		maxHeight: 1080,
		quality: 0.8,
	});

	// Show loading while checking auth
	if (authLoading) {
		return (
			<main className="relative min-h-screen w-screen bg-[#0a0d0a] text-white flex items-center justify-center">
				<AmbientBackground />
				<LoadingSpinner />
			</main>
		);
	}

	if (!isAuthenticated) {
		return (
			<>
				<AmbientBackground />
				<Login onLogin={login} />
			</>
		);
	}

	const renderContent = () => {
		if (isLoading) {
			return <LoadingSpinner />;
		}

		if (items.length > 0) {
			return <Timeline items={items} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem} />;
		}

		return <EmptyState />;
	};

	return (
		<main className="relative min-h-screen w-full h-screen bg-[#0a0d0a] text-white overflow-x-hidden">
			<AmbientBackground />

			<div className="relative z-10 flex flex-col items-center w-full">
				<Header user={user} onLogout={logout} />

				<UploadZone
					isDragging={isDragging}
					fileInputRef={fileInputRef}
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onFileSelect={handleFileSelect}
					onOpenPicker={openFilePicker}
				/>
				{/* Error message */}
				{error && (
					<div className="w-full max-w-xl mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-center">
						{error}
						<button type="button" onClick={clearError} className="ml-4 text-red-400 hover:text-red-300 underline">
							Dismiss
						</button>
					</div>
				)}

				{/* Loading state */}
				{renderContent()}
			</div>
			{toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
		</main>
	);
}
