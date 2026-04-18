import { NextResponse } from 'next/server';
import { getAllUsers, createUser, updateUser, deleteUser, getUserCount, CreateUpdateUserDto } from '@/services/user.service';
import { USER_EMAIL_EXISTS } from '@/constants/messages';


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 10;
    const skip = (page - 1) * pageSize;
    const [users, total] = await Promise.all([
      getAllUsers({ skip, take: pageSize }),
      getUserCount()
    ]);
    return NextResponse.json({ users, total });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = await createUser(data);
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 400 });
  }
}


export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id'));

  if (!id) {
    return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  }

  try {
    const data: CreateUpdateUserDto = await request.json();
    const user = await updateUser(id, data);
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id'));
  if (!id) {
    return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  }
  try {
    await deleteUser(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 400 });
  }
}
