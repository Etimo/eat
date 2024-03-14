'use server';
import { User } from '@/types';
import { BASE_URL, revalidateCacheTags } from './utils';

export const getUsers = async (): Promise<User[]> => {
  const url = `${BASE_URL}/user`;
  try {
    const users = await fetch(url, revalidateCacheTags(['users'])).then((res) =>
      res.json(),
    );
    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUser = async (id: string): Promise<User | null> => {
  const url = `${BASE_URL}/user/${id}`;
  try {
    const user = await fetch(url, revalidateCacheTags(['users'])).then((res) =>
      res.json(),
    );
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
