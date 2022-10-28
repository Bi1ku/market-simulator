// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      const response = await prisma.user.create({ data: req.body });
      return res.status(200).json(response);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
}
