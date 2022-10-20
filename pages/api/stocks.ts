// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { scraper } from '../../scrapers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      const response = await scraper(req.query.ticker as string);
      res.status(200).json(response);
    }
  } catch (e) {
    res.status(500).json(e);
  }
}
