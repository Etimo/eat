'use server';
import { createActivity } from '@/server/activity';
import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const payload = await request.json();

  const activity = await createActivity(payload);

  revalidateTag('activities');
  return Response.json({ activity });
};
