'use server';
import { getActivityTypes } from '@/server/activityTypes';

export const GET = async () => {
  const activityTypes = await getActivityTypes();
  return Response.json({ activityTypes });
};
