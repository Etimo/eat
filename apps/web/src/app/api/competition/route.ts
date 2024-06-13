'use server';
import { getCompetitionsGroupedByYear } from '@/server/competition';

export const GET = async () => {
  const competitions = await getCompetitionsGroupedByYear();
  return Response.json({ competitions });
};
