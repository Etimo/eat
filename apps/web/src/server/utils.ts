export const BASE_URL = 'http://127.0.0.1:3100';
export const getOptions = <T>(method: string, body?: T) => {
  const options: RequestInit = {
    method,
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };
  if (body) options.body = JSON.stringify(body);
  return options;
};

export const revalidateCacheTags = (tags: string[]) => ({
  next: { tags },
});
