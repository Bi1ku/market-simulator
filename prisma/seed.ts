import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (prisma) => {
    const user = await prisma.user.create({
      data: {
        email: '2008owenshi@gmail.com',
        password: bcrypt.hashSync(
          'password',
          faker.datatype.number({ min: 5, max: 10 }),
        ),
        name: 'Owen Shi',
        username: 'Biiku',
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
