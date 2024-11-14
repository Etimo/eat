import { getAuthSession } from '@/auth';

export const BASE_URL = 'http://127.0.0.1:3100';
export const getOptions = async <T>(method: string, body?: T) => {
  const accessToken = await getAccessToken();

  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  });

  const options: RequestInit = {
    method,
    headers,
  };
  if (body) options.body = JSON.stringify(body);
  return options;
};

export const revalidateCacheTags = (tags: string[]) => ({
  next: { tags },
});

export const getAccessToken = async (): Promise<string | null> => {
  const session = await getAuthSession();
  if (!session) return null;
  return session.accessToken;
};
