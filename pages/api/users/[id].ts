// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt, { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      const { id } = req.query;
      const response = await prisma.user.findUniqueOrThrow({
        where: {
          id: id as string,
        },
      });
      return res.json({ success: true, data: response });
    }
  } catch (e) {
    return res.json({ success: false, data: e });
  }
}
