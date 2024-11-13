import { PrismaClient } from '@prisma/client';

export async function seed(): Promise<void> {
  const prisma = new PrismaClient();
  await prisma.seeded.create({
    data: {
      id: "seeded"
    },
  });
  console.log('Seeded records inserted');
  await prisma.$disconnect();
}

