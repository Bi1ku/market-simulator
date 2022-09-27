export const WEBSCRAPE_URL = 'https://www.google.com/finance/';
export const LOGO_URL =
  'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.jpg';
export const BRANDFETCH_BASE_API = 'https://api.brandfetch.io/v2/brands/';

export const config = {
  headers: {
    Authorization: `Bearer ${process.env.BRANDFETCH_API_KEY}`,
  },
};
