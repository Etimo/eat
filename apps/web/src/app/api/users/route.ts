'use server';
import { getUsers } from '@/api';

export const GET = async () => {
  const users = await getUsers();
  return Response.json({ users });
};
