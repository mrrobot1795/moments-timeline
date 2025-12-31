import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import type { TimelineDocument, CreateTimelineItem, TimelineItem } from '@/types';

export async function GET() {
	try {
		const db = await getDatabase();
		const items = await db.collection<TimelineDocument>('timeline').find({}).sort({ date: 1 }).toArray();

		const formattedItems: TimelineItem[] = items.map(item => ({
			id: item._id.toString(),
			imageUrl: item.imageUrl,
			caption: item.caption,
			date: item.date,
			fileName: item.fileName,
		}));

		return NextResponse.json(formattedItems);
	} catch (error) {
		console.error('Failed to fetch timeline:', error);
		return NextResponse.json({ error: 'Failed to fetch timeline' }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const db = await getDatabase();
		const body: CreateTimelineItem = await request.json();

		const newItem = {
			imageUrl: body.imageUrl,
			caption: body.caption || '',
			date: body.date,
			fileName: body.fileName,
			createdAt: new Date(),
		};

		const result = await db.collection('timeline').insertOne(newItem);

		const createdItem: TimelineItem = {
			id: result.insertedId.toString(),
			imageUrl: newItem.imageUrl,
			caption: newItem.caption,
			date: newItem.date,
			fileName: newItem.fileName,
		};

		return NextResponse.json(createdItem);
	} catch (error) {
		console.error('Failed to create item:', error);
		return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
	}
}
