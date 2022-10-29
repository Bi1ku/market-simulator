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
    if (req.method === 'POST') {
      const response = await prisma.user.create({
        data: {
          ...req.body,
          password: hashSync(req.body.password, 10),
        },
      });
      return res.json({ success: true, data: response });
    }
  } catch (e) {
    return res.json({ success: false, data: e });
  }
}
