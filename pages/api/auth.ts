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
      const { email, password } = req.body;

      const student = await prisma.user.findFirst({
        where: {
          email: email as string,
        },
      });
      if (!student) throw 'Invalid email';

      const check = bcrypt.compareSync(password as string, student.password);
      if (check) return res.json({ success: true, data: student });
      else throw 'Invalid credentials';
    }
  } catch (e) {
    return res.json({ success: false, data: e });
  }
}
