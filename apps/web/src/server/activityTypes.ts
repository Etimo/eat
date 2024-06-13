'use server';
import { ActivityType } from '@/types';

const baseUrl = 'http://127.0.0.1:3100';

export const getActivityTypes = async (): Promise<ActivityType[]> => {
  const url = `${baseUrl}/activitytype`;
  try {
    const activityTypes = await fetch(url).then((res) => res.json());
    return activityTypes;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getActivityTypesByUser = async (
  user: string,
): Promise<ActivityType[]> => {
  const url = `${baseUrl}/activitytype/user/${user}`;
  try {
    const activityTypes = await fetch(url).then((res) => res.json());
    return activityTypes;
  } catch (error) {
    console.error(error);
    return [];
  }
};
