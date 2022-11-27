// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      const data = await prisma.stock.findUnique({
        where: {
          ticker: req.query.ticker as string,
        },
        include: {
          stockData: true,
        },
      });
      return res.json({ success: true, data });
    }
  } catch (e) {
    res.json({ success: false, data: e });
  }
}
