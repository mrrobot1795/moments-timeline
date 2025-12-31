import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import type { UpdateTimelineItem } from '@/types';

interface RouteParams {
	params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;
		const db = await getDatabase();
		const body: UpdateTimelineItem = await request.json();

		const updateData: UpdateTimelineItem & { updatedAt: Date } = {
			updatedAt: new Date(),
		};
		if (body.caption !== undefined) updateData.caption = body.caption;
		if (body.date !== undefined) updateData.date = body.date;

		await db.collection('timeline').updateOne({ _id: new ObjectId(id) }, { $set: updateData });

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Failed to update item:', error);
		return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;
		const db = await getDatabase();

		const result = await db.collection('timeline').deleteOne({ _id: new ObjectId(id) });

		if (result.deletedCount === 0) {
			return NextResponse.json({ error: 'Item not found' }, { status: 404 });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Failed to delete item:', error);
		return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
	}
}
