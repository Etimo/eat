'use server';
import { getUsers } from '@/server/user';

export const GET = async () => {
  const users = await getUsers();
  return Response.json({ users });
};
