import { Seeded, PrismaClient } from "@prisma/client";

async function isDbSeeded(): Promise<boolean> {

  const prisma = new PrismaClient();

  return prisma.seeded.findFirst().then((seeded: Seeded | null) => {
    prisma.$disconnect();
    return !!seeded;
  });
}

export { isDbSeeded };
