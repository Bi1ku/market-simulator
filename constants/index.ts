import { hookstate } from '@hookstate/core';
import { localstored } from '@hookstate/localstored';
import { User } from '@prisma/client';
import axios from 'axios';

export const BRANDFETCH_BASE_API = 'https://api.brandfetch.io/v2/brands/';

export type Props = {};

export const customAxios = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const brandFetchConfig = {
  headers: {
    Authorization: `Bearer ${process.env.BRANDFETCH_API_KEY}`,
  },
};

export const globalLoading = hookstate<boolean>(false);

interface Notification {
  title?: string;
  description: string;
  type: 'success' | 'error';
  show: boolean;
}

export const defaultNotification: Notification = {
  title: '',
  description: '',
  type: 'success',
  show: false,
};

export const globalNotification = hookstate<Notification>(defaultNotification);

export const emptyUser: User = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  currency: 0,
};
