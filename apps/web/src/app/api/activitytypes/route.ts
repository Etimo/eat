'use server';
import { getActivityTypes } from '@/api';

export const GET = async () => {
  const activityTypes = await getActivityTypes();
  return Response.json({ activityTypes });
};
