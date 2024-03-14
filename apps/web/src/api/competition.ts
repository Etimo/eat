'use server';
import { Competition } from '@/types';
import { BASE_URL, revalidateCacheTags } from './utils';

export const getCompetitions = async (): Promise<Competition[]> => {
  const url = `${BASE_URL}/competition`;
  try {
    const competitions = await fetch(
      url,
      revalidateCacheTags(['competitions']),
    ).then((res) => res.json());
    return competitions;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCompetition = async (
  id: string,
): Promise<Competition | null> => {
  const url = `${BASE_URL}/competition/${id}`;
  try {
    const competition = await fetch(
      url,
      revalidateCacheTags(['competitions']),
    ).then((res) => res.json());
    return competition;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCompetitionsGroupedByYear = async (): Promise<
  { year: string; competitions: Competition[] }[]
> => {
  const url = `${BASE_URL}/competition/groupByYear`;
  try {
    const competitions = await fetch(
      url,
      revalidateCacheTags(['competitions']),
    ).then((res) => res.json());
    return competitions;
  } catch (error) {
    console.error(error);
    return [];
  }
};
