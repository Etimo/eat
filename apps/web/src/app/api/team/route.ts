'use server';
import { createTeam, getTeams } from '@/server/team';
import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export const GET = async () => {
  const teams = await getTeams();
  return Response.json({ teams });
};

export const POST = async (request: NextRequest) => {
  const payload = await request.json();

  const team = await createTeam(payload);

  revalidateTag('teams');
  if (payload.competition) {
    revalidateTag('competitions');
  }
  return Response.json({ team });
};
