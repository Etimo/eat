'use server';
import { CreateTeam, Team } from '@/types';
import { BASE_URL, getOptions, revalidateCacheTags } from './utils';

// GET
export const getTeams = async (): Promise<Team[]> => {
  const url = `${BASE_URL}/team`;
  const options = await getOptions('GET');

  try {
    const teams = await fetch(url, {
      ...options,
      ...revalidateCacheTags(['teams']),
    }).then((res) => res.json());
    return teams;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// POST
export const createTeam = async (team: CreateTeam): Promise<Team | null> => {
  const url = `${BASE_URL}/team`;
  const options = await getOptions<{ team: CreateTeam }>('POST', {
    team,
  });

  try {
    const response = await fetch(url, {
      ...options,
      ...revalidateCacheTags(['teams', 'competitions']),
    });
    if (response.status === 200) {
      return response.json();
    }
    throw Error;
  } catch (error) {
    console.error(error);
    return null;
  }
};
