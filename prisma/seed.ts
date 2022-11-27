import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { connect } from 'http2';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (prisma) => {
    Object.keys(prisma).forEach(
      async (key) =>
        !key.startsWith('_') && (await prisma[key as 'user'].deleteMany()),
    );

    const user = await prisma.user.create({
      data: {
        email: '2008owenshi@gmail.com',
        password: await bcrypt.hash('password', 10),
        firstName: 'Owen',
        lastName: 'Shi',
      },
    });

    const stock = await prisma.stock.create({
      data: {
        ticker: 'AAPL',
        amount: 100,
        price: 123.45,
        owner: { connect: { id: user.id } },
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
