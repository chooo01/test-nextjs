import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    
    const usersByMinute = await prisma.user.groupBy({
      by: ['createdAt'],
      _count: { id: true },
      orderBy: { createdAt: 'asc' },
    });

    const result: Record<string, number> = {};
    usersByMinute.forEach(row => {
      const minute = row.createdAt.toISOString().slice(0, 16);
      const key = minute.replace('T', ' ');
      result[key] = (result[key] || 0) + row._count.id;
    });

    const data = Object.entries(result).map(([minute, count]) => ({
      minute,
      count,
    }));

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
