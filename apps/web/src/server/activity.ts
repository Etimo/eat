'use server';
import { Activity } from '@/types/Activity';
import { BASE_URL, getOptions, revalidateCacheTags } from './utils';
import { CreateActivity } from '@/types';

// GET
export const getActivitiesByTeam = async (
  team: string,
): Promise<{ team: string; activities: Activity[] }> => {
  const url = `${BASE_URL}/activity/team/${team}`;
  const options = await getOptions('GET');

  try {
    const res = await fetch(url, {
      ...options,
      ...revalidateCacheTags(['activities']),
    });
    const activities = await res.json();

    return { team, activities };
  } catch (error) {
    console.error(error);
    return { team, activities: [] };
  }
};

export const getActivitiesByUser = async (
  user: string,
  sortMostRecent: boolean = false,
): Promise<Activity[]> => {
  const url = `${BASE_URL}/activity/user/${user}`;
  const options = await getOptions('GET');

  try {
    const activities: Activity[] = await fetch(url, {
      ...options,
      ...revalidateCacheTags(['activities']),
    }).then((res) => res.json());

    return activities.sort((a, b) =>
      sortMostRecent ? (a.date > b.date ? -1 : 1) : a.date > b.date ? 1 : -1,
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getActivities = async () => {
  const url = `${BASE_URL}/activity`;
  const options = await getOptions('GET');

  try {
    const activities: Activity[] = await fetch(url, {
      ...options,
      ...revalidateCacheTags(['activities']),
    }).then((res) => res.json());

    return activities.sort((a, b) => (a.date > b.date ? -1 : 1));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getActivityMonthsByUser = async (
  user: string,
): Promise<{ user: string; months: string[] }> => {
  const url = `${BASE_URL}/activity/user/${user}/months`;
  try {
    const months = await fetch(url, revalidateCacheTags(['activities'])).then(
      (res) => res.json(),
    );
    return { user, months };
  } catch (error) {
    console.error(error);
    return { user, months: [] };
  }
};

export const getActivitiesByUserGroupedByMonth = async (
  user: string,
): Promise<{
  user: string;
  activityGroups: { month: string; activities: Activity[] }[];
}> => {
  const url = `${BASE_URL}/activity/user/${user}/groupByMonth`;
  try {
    const activityGroups = await fetch(
      url,
      revalidateCacheTags(['activities']),
    ).then((res) => res.json());
    return { user, activityGroups };
  } catch (error) {
    console.error(error);
    return { user, activityGroups: [] };
  }
};

// POST
export const createActivity = async (
  activity: CreateActivity,
): Promise<Activity | null> => {
  const url = `${BASE_URL}/activity`;
  const options = await getOptions<{ activity: CreateActivity }>('POST', {
    activity,
  });

  try {
    const response = await fetch(url, {
      ...options,
      ...revalidateCacheTags(['activities']),
    });
    if (response.status === 200) {
      return await response.json();
    }
    throw Error;
  } catch (error) {
    console.error(error);
    return null;
  }
};
