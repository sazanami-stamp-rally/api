import { Meta, PrismaClient } from "@prisma/client";

async function isDbSeeded(): Promise<boolean> {

  const prisma = new PrismaClient();

  return prisma.meta.findFirst().then((meta: Meta | null) => {
    prisma.$disconnect();
    return !!meta;
  });
}

export { isDbSeeded };
