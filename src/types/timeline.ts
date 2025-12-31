export interface TimelineItem {
	id: string;
	imageUrl: string;
	caption: string;
	date: string;
	fileName: string;
}

export interface EditState {
	id: string | null;
	caption: string;
	date: string;
}

// For creating a new item (before MongoDB assigns _id)
export interface CreateTimelineItem {
	imageUrl: string;
	caption: string;
	date: string;
	fileName: string;
}

// MongoDB document (with _id and timestamps)
export interface TimelineDocument {
	_id: string;
	imageUrl: string;
	caption: string;
	date: string;
	fileName: string;
	createdAt: Date;
	updatedAt?: Date;
}

// For updating an item (all fields optional)
export interface UpdateTimelineItem {
	caption?: string;
	date?: string;
}

// API response types
export interface ApiResponse<T> {
	data?: T;
	error?: string;
}

export interface TimelineApiResponse extends ApiResponse<TimelineItem[]> {}

export interface SingleItemApiResponse extends ApiResponse<TimelineItem> {}
