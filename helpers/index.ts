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
