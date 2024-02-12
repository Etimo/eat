import { Activity, Team, User } from '@shared/types';
import { create } from 'zustand';

type UserTime = {
  name: string;
  time: number;
};

type ActivityDate = Record<
  string,
  { user: User; activities: { activity: Activity; time: number }[] }[]
>;

interface ActivitiesState {
  activities: ActivityDate;
  getTeamMembers: (team: string) => User[];
  getTeams: () => Team[];
  getAllTeamsTotalMinutes: () => UserTime[];
  getAllUserActivities: (currentUser: User) => {
    key: string;
    data: { user: User; activities: { activity: Activity; time: number }[] }[];
  }[];
  getTeamTotalMinutes: (team: string) => UserTime[];
  getUserTotalMinutes: (user: User) => number;
  getTeamDayMinutes: (team: string, date: string) => UserTime[];
  getUserDayMinutes: (user: User, date: string) => number;
  getUserActivityTypes: (currentUser: User) => Activity[];
}
export const useDataStore = create<ActivitiesState>((set, get) => ({
  activities: {
    '2023-05-02': [
      // Team 1
      {
        user: {
          id: '',
          name: 'Lukas',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Rickard',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Klara',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [{ activity: { id: '', name: 'Klättring' }, time: 45 }],
      },
      {
        user: {
          id: '',
          name: 'Jassyr',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 48 }],
      },
      // Team 2
      {
        user: {
          id: '',
          name: 'Therese',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 45 }],
      },
      {
        user: {
          id: '',
          name: 'André',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [
          { activity: { id: '', name: 'Gym' }, time: 45 },
          { activity: { id: '', name: 'Promenad' }, time: 70 },
          { activity: { id: '', name: 'Discgolf' }, time: 90 },
        ],
      },
      {
        user: {
          id: '',
          name: 'Daniel',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [{ activity: { id: '', name: 'Cykling' }, time: 30 }],
      },
      {
        user: {
          id: '',
          name: 'Morgan',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [],
      },
      // Team 3
      {
        user: {
          id: '',
          name: 'Erik',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Björn',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [
          { activity: { id: '', name: 'Cykling' }, time: 60 },
          { activity: { id: '', name: 'Cykling' }, time: 60 },
        ],
      },
      {
        user: {
          id: '',
          name: 'Johan',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [{ activity: { id: '', name: 'Löpning' }, time: 30 }],
      },
      {
        user: {
          id: '',
          name: 'Julius',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [],
      },
      // Team 4
      {
        user: {
          id: '',
          name: 'Mikael',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Niclas',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Saga',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Jeanette',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 45 }],
      },
      // Team 5
      {
        user: {
          id: '',
          name: 'Henrik',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Philip',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 45 }],
      },
      {
        user: {
          id: '',
          name: 'Joakim',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [
          { activity: { id: '', name: 'Cykel' }, time: 30 },
          { activity: { id: '', name: 'Löpning' }, time: 30 },
          { activity: { id: '', name: 'Gym' }, time: 60 },
        ],
      },
      {
        user: {
          id: '',
          name: 'Axel',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [
          { activity: { id: '', name: 'Cykel' }, time: 35 },
          { activity: { id: '', name: 'Gym' }, time: 60 },
        ],
      },
    ],
    '2023-05-03': [
      // Team 1
      {
        user: {
          id: '',
          name: 'Lukas',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [{ activity: { id: '', name: 'Klättring' }, time: 90 }],
      },
      {
        user: {
          id: '',
          name: 'Rickard',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [{ activity: { id: '', name: 'Klättring' }, time: 140 }],
      },
      {
        user: {
          id: '',
          name: 'Klara',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Jassyr',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 45 }],
      },
      // Team 2
      {
        user: {
          id: '',
          name: 'Therese',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [{ activity: { id: '', name: 'Poledance' }, time: 70 }],
      },
      {
        user: {
          id: '',
          name: 'André',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [
          { activity: { id: '', name: 'Gym' }, time: 45 },
          { activity: { id: '', name: 'Promenad' }, time: 20 },
        ],
      },
      {
        user: {
          id: '',
          name: 'Daniel',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [{ activity: { id: '', name: 'Gym' }, time: 60 }],
      },
      {
        user: {
          id: '',
          name: 'Morgan',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [{ activity: { id: '', name: 'Gym' }, time: 60 }],
      },
      // Team 3
      {
        user: {
          id: '',
          name: 'Erik',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Björn',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [
          { activity: { id: '', name: 'Cykling' }, time: 30 },
          { activity: { id: '', name: 'Löpning' }, time: 40 },
        ],
      },
      {
        user: {
          id: '',
          name: 'Johan',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [{ activity: { id: '', name: 'Löpning' }, time: 40 }],
      },
      {
        user: {
          id: '',
          name: 'Julius',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [{ activity: { id: '', name: 'Discgolf' }, time: 60 }],
      },
      // Team 4
      {
        user: {
          id: '',
          name: 'Mikael',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Niclas',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Saga',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 105 }],
      },
      {
        user: {
          id: '',
          name: 'Jeanette',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 62 }],
      },
      // Team 5
      {
        user: {
          id: '',
          name: 'Henrik',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [{ activity: { id: '', name: 'Gym' }, time: 45 }],
      },
      {
        user: {
          id: '',
          name: 'Philip',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 60 }],
      },
      {
        user: {
          id: '',
          name: 'Joakim',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Axel',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [{ activity: { id: '', name: 'Gym' }, time: 60 }],
      },
    ],
    '2023-06-04': [
      // Team 1
      {
        user: {
          id: '',
          name: 'Lukas',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Rickard',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [{ activity: { id: '', name: 'Klättring' }, time: 45 }],
      },
      {
        user: {
          id: '',
          name: 'Klara',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Jassyr',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [],
      },
      // Team 2
      {
        user: {
          id: '',
          name: 'Therese',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [{ activity: { id: '', name: 'Poledance' }, time: 70 }],
      },
      {
        user: {
          id: '',
          name: 'André',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 60 }],
      },
      {
        user: {
          id: '',
          name: 'Daniel',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Morgan',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [],
      },
      // Team 3
      {
        user: {
          id: '',
          name: 'Erik',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Björn',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [
          { activity: { id: '', name: 'Cykling' }, time: 30 },
          { activity: { id: '', name: 'Löpning' }, time: 60 },
          { activity: { id: '', name: 'Friidrott' }, time: 40 },
        ],
      },
      {
        user: {
          id: '',
          name: 'Johan',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [{ activity: { id: '', name: 'Löpning' }, time: 30 }],
      },
      {
        user: {
          id: '',
          name: 'Julius',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [],
      },
      // Team 4
      {
        user: {
          id: '',
          name: 'Mikael',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Niclas',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Saga',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 30 }],
      },
      {
        user: {
          id: '',
          name: 'Jeanette',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [
          { activity: { id: '', name: 'Promenad' }, time: 30 },
          { activity: { id: '', name: 'Gym' }, time: 60 },
        ],
      },
      // Team 5
      {
        user: {
          id: '',
          name: 'Henrik',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [{ activity: { id: '', name: 'Gym' }, time: 45 }],
      },
      {
        user: {
          id: '',
          name: 'Philip',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 60 }],
      },
      {
        user: {
          id: '',
          name: 'Joakim',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Axel',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [],
      },
    ],
    '2023-07-05': [
      // Team 1
      {
        user: {
          id: '',
          name: 'Lukas',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [{ activity: { id: '', name: 'Klättring' }, time: 120 }],
      },
      {
        user: {
          id: '',
          name: 'Rickard',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [{ activity: { id: '', name: 'Klättring' }, time: 120 }],
      },
      {
        user: {
          id: '',
          name: 'Klara',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Jassyr',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [{ activity: { id: '', name: 'Klättring' }, time: 120 }],
      },
      // Team 2
      {
        user: {
          id: '',
          name: 'Therese',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [{ activity: { id: '', name: 'Poledance' }, time: 30 }],
      },
      {
        user: {
          id: '',
          name: 'André',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Daniel',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Morgan',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [],
      },
      // Team 3
      {
        user: {
          id: '',
          name: 'Erik',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Björn',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Johan',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [{ activity: { id: '', name: 'Cykling' }, time: 100 }],
      },
      {
        user: {
          id: '',
          name: 'Julius',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [{ activity: { id: '', name: 'Discgolf' }, time: 120 }],
      },
      // Team 4
      {
        user: {
          id: '',
          name: 'Mikael',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Niclas',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Saga',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Jeanette',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 45 }],
      },
      // Team 5
      {
        user: {
          id: '',
          name: 'Henrik',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [{ activity: { id: '', name: 'Gym' }, time: 60 }],
      },
      {
        user: {
          id: '',
          name: 'Philip',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 30 }],
      },
      {
        user: {
          id: '',
          name: 'Joakim',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Axel',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [{ activity: { id: '', name: 'Löpning' }, time: 30 }],
      },
    ],
    '2023-08-06': [
      // Team 1
      {
        user: {
          id: '',
          name: 'Lukas',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Rickard',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [{ activity: { id: '', name: 'Klättring' }, time: 240 }],
      },
      {
        user: {
          id: '',
          name: 'Klara',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Jassyr',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [],
      },
      // Team 2
      {
        user: {
          id: '',
          name: 'Therese',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [{ activity: { id: '', name: 'Pingis' }, time: 30 }],
      },
      {
        user: {
          id: '',
          name: 'André',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Daniel',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [{ activity: { id: '', name: 'Gym' }, time: 60 }],
      },
      {
        user: {
          id: '',
          name: 'Morgan',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [],
      },
      // Team 3
      {
        user: {
          id: '',
          name: 'Erik',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Björn',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 90 }],
      },
      {
        user: {
          id: '',
          name: 'Johan',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [{ activity: { id: '', name: 'Löpning' }, time: 30 }],
      },
      {
        user: {
          id: '',
          name: 'Julius',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [],
      },
      // Team 4
      {
        user: {
          id: '',
          name: 'Mikael',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 180 }],
      },
      {
        user: {
          id: '',
          name: 'Niclas',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Saga',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Jeanette',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 30 }],
      },
      // Team 5
      {
        user: {
          id: '',
          name: 'Henrik',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [{ activity: { id: '', name: 'Gym' }, time: 60 }],
      },
      {
        user: {
          id: '',
          name: 'Philip',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 60 }],
      },
      {
        user: {
          id: '',
          name: 'Joakim',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Axel',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [{ activity: { id: '', name: 'Gym' }, time: 50 }],
      },
    ],
    '2023-09-07': [
      // Team 1
      {
        user: {
          id: '',
          name: 'Lukas',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [{ activity: { id: '', name: 'Klättring' }, time: 70 }],
      },
      {
        user: {
          id: '',
          name: 'Rickard',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [
          { activity: { id: '', name: 'Slackline' }, time: 90 },
          { activity: { id: '', name: 'Promenad' }, time: 90 },
        ],
      },
      {
        user: {
          id: '',
          name: 'Klara',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Jassyr',
          teamId: '1',
          team: { id: '1', name: 'v17 enjoyers' },
        },
        activities: [],
      },
      // Team 2
      {
        user: {
          id: '',
          name: 'Therese',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [{ activity: { id: '', name: 'Poledance' }, time: 70 }],
      },
      {
        user: {
          id: '',
          name: 'André',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 30 }],
      },
      {
        user: {
          id: '',
          name: 'Daniel',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 50 }],
      },
      {
        user: {
          id: '',
          name: 'Morgan',
          teamId: '2',
          team: { id: '2', name: 'Lorem Ipsum' },
        },
        activities: [],
      },
      // Team 3
      {
        user: {
          id: '',
          name: 'Erik',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 120 }],
      },
      {
        user: {
          id: '',
          name: 'Björn',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [{ activity: { id: '', name: 'Löpning' }, time: 90 }],
      },
      {
        user: {
          id: '',
          name: 'Johan',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [{ activity: { id: '', name: 'Löpning' }, time: 30 }],
      },
      {
        user: {
          id: '',
          name: 'Julius',
          teamId: '3',
          team: { id: '3', name: 'Padél Pack' },
        },
        activities: [],
      },
      // Team 4
      {
        user: {
          id: '',
          name: 'Mikael',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [],
      },
      {
        user: {
          id: '',
          name: 'Niclas',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [{ activity: { id: '', name: 'Löpning' }, time: 30 }],
      },
      {
        user: {
          id: '',
          name: 'Saga',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 35 }],
      },
      {
        user: {
          id: '',
          name: 'Jeanette',
          teamId: '4',
          team: { id: '4', name: 'Ctrl+Alt+Elite' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 110 }],
      },
      // Team 5
      {
        user: {
          id: '',
          name: 'Henrik',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [{ activity: { id: '', name: 'Gym' }, time: 60 }],
      },
      {
        user: {
          id: '',
          name: 'Philip',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [{ activity: { id: '', name: 'Promenad' }, time: 120 }],
      },
      {
        user: {
          id: '',
          name: 'Joakim',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [{ activity: { id: '', name: 'Gym' }, time: 70 }],
      },
      {
        user: {
          id: '',
          name: 'Axel',
          teamId: '5',
          team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
        },
        activities: [{ activity: { id: '', name: 'Badminton' }, time: 60 }],
      },
    ],
  },
  getTeamMembers: (team) => {
    const data = get().activities;
    const users = Object.entries(data)
      .flatMap(([key, date]) => {
        return date.map((x) => x.user).filter((x) => x.team?.id === team);
      })
      .filter(
        (value, index, self) =>
          self.findIndex((v) => v.name === value.name) === index,
      );
    return users;
  },
  getTeams: () => {
    const data = get().activities;
    const teams = Object.entries(data)
      .flatMap(([key, date]) => {
        return date.map((x) => x.user);
      })
      .filter(
        (value, index, self) =>
          self.findIndex((v) => v.teamId === value.teamId) === index,
      )
      .map((item) => ({ name: item.team.name, id: item.teamId }));
    return teams;
  },
  getAllTeamsTotalMinutes: () => {
    const data = get().activities;
    const teams = get().getTeams();
    const time = teams.map((team) => {
      const t = Object.entries(data).flatMap(([key, date]) => {
        return date
          .filter(({ user }) => user.team.name === team.name)
          .flatMap((user) => user.activities)
          .reduce((total, { time }) => total + time, 0);
      });
      return {
        name: team.name,
        time: t.reduce((total, value) => total + value, 0),
      };
    });
    return time;
  },
  getAllUserActivities: (currentUser) => {
    const data = get().activities;
    const userData = Object.entries(data).map(([key, date]) => {
      return {
        key,
        data: date.filter(({ user }) => user.name === currentUser.name),
      };
    });
    // const userData = [] as ActivityDate[];
    // Object.entries(data).forEach(({ 0: key, 1: data }) => {
    //   // userData[key] = data.filter(({ user }) => user.name === currentUser.name);
    //   userData[key] = data.filter(({ user }) => user.name === currentUser.name);
    // });
    return userData;
  },
  getTeamTotalMinutes: (team) => {
    const data = get().activities;
    const users = get().getTeamMembers(team);
    const time = users.map((u) => {
      const t = Object.entries(data).flatMap(([key, date]) => {
        return date
          .filter(({ user }) => user.name === u.name)
          .flatMap((user) => user.activities)
          .reduce((total, { time }) => total + time, 0);
      });

      return {
        name: u.name,
        time: t.reduce((total, value) => total + value, 0),
      };
    });

    return time;
  },
  getUserTotalMinutes: (user: User) => {
    const teamTotalMinutes = get().getTeamTotalMinutes(user.teamId);
    const userMinutes = teamTotalMinutes.find((x) => x.name === user.name);
    return userMinutes ? userMinutes.time : 0;
  },
  getTeamDayMinutes: (team, date) => {
    const data = get().activities;
    const day = data[date];
    const members = get().getTeamMembers(team);
    if (day) {
      return members.map((member) => {
        const memberActivities = day.find((d) => d.user.name === member.name);
        if (memberActivities) {
          return {
            name: member.name,
            time: memberActivities.activities.reduce(
              (total, { time }) => total + time,
              0,
            ),
          };
        }
        return {
          name: member.name,
          time: 0,
        };
      });
    }
    return members.map((user) => ({ name: user.name, time: 0 }));
  },
  getUserDayMinutes: (user, date) => {
    const teamDayMinutes = get().getTeamDayMinutes(user.teamId, date);
    const userMinutes = teamDayMinutes.find((x) => x.name === user.name);
    return userMinutes ? userMinutes.time : 0;
  },
  getUserActivityTypes: (currentUser) => {
    const data = get().activities;
    const activities = Object.entries(data).flatMap(([key, date]) => {
      return date
        .filter(({ user }) => user.name === currentUser.name)
        .flatMap((user) => user.activities)
        .map(({ activity }) => activity);
    });

    // Return unique activities
    return activities.filter(
      (value, index, self) =>
        self.findIndex((v) => v.name === value.name) === index,
    );
  },
}));
