'use server';
import { getCompetitionsGroupedByYear } from '@/api';

export const GET = async () => {
  const competitions = await getCompetitionsGroupedByYear();
  return Response.json({ competitions });
};
