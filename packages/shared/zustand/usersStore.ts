import { User } from '@shared/types';
import { create } from 'zustand';

interface UsersState {
  users: User[];
  getCurrentUser: () => User;
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [
    // Team 1
    {
      id: '1',
      name: 'Lukas',
      teamId: '1',
      team: { id: '1', name: 'v17 enjoyers' },
    },
    {
      id: '2',
      name: 'Rickard',
      teamId: '1',
      team: { id: '1', name: 'v17 enjoyers' },
    },
    {
      id: '3',
      name: 'Klara',
      teamId: '1',
      team: { id: '1', name: 'v17 enjoyers' },
    },
    {
      id: '4',
      name: 'Jassyr',
      teamId: '1',
      team: { id: '1', name: 'v17 enjoyers' },
    },
    // Team 2
    {
      id: '5',
      name: 'Therese',
      teamId: '2',
      team: { id: '2', name: 'Lorem Ipsum' },
    },
    {
      id: '6',
      name: 'André',
      teamId: '2',
      team: { id: '2', name: 'Lorem Ipsum' },
    },
    {
      id: '7',
      name: 'Daniel',
      teamId: '2',
      team: { id: '2', name: 'Lorem Ipsum' },
    },
    {
      id: '8',
      name: 'Morgan',
      teamId: '2',
      team: { id: '2', name: 'Lorem Ipsum' },
    },
    // Team 3
    {
      id: '9',
      name: 'Erik',
      teamId: '3',
      team: { id: '3', name: 'Padél pack' },
    },
    {
      id: '10',
      name: 'Björn',
      teamId: '3',
      team: { id: '3', name: 'Padél pack' },
    },
    {
      id: '11',
      name: 'Johan',
      teamId: '3',
      team: { id: '3', name: 'Padél pack' },
    },
    {
      id: '12',
      name: 'Julius',
      teamId: '3',
      team: { id: '3', name: 'Padél pack' },
    },
    // Team 4
    {
      id: '13',
      name: 'Mikael',
      teamId: '4',
      team: { id: '4', name: 'Ctrl+Alt+Elite' },
    },
    {
      id: '14',
      name: 'Niclas',
      teamId: '4',
      team: { id: '4', name: 'Ctrl+Alt+Elite' },
    },
    {
      id: '15',
      name: 'Saga',
      teamId: '4',
      team: { id: '4', name: 'Ctrl+Alt+Elite' },
    },
    {
      id: '16',
      name: 'Jeanette',
      teamId: '4',
      team: { id: '4', name: 'Ctrl+Alt+Elite' },
    },
    // Team 5
    {
      id: '17',
      name: 'Henrik',
      teamId: '5',
      team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
    },
    {
      id: '18',
      name: 'Philip',
      teamId: '5',
      team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
    },
    {
      id: '19',
      name: 'Joakim',
      teamId: '5',
      team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
    },
    {
      id: '20',
      name: 'Axel',
      teamId: '5',
      team: { id: '5', name: 'Erik, Björn, Johan och Julius' },
    },
  ],
  getCurrentUser: () => {
    const users = get().users;
    return (
      users[5] ?? { name: '', id: '', teamId: '', team: { id: '', name: '' } }
    );
  },
}));
