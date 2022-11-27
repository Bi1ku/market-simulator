import { User } from '@prisma/client';
import { globalNotification } from '../constants';

export const success = (description: string) => {
  globalNotification.set({
    title: 'Success',
    description,
    type: 'success',
    show: true,
  });
};

export const error = (description?: string) => {
  globalNotification.set({
    title: 'Error',
    description: description || 'Something went wrong',
    type: 'error',
    show: true,
  });
};

export const formatFullName = (user: User) =>
  `${user.firstName} ${user.lastName}`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
