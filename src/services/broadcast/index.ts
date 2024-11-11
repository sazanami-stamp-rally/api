import prisma from "@src/prisma";

async function createBroadcast(boothId: string, title: string, body: string) {
  return await prisma.broadcast.create({
    data: {
      booth_id: boothId,
      title,
      body,
    },
  });
}


async function getAllBroadcast() {
  return await prisma.broadcast.findMany();
}

export { createBroadcast, getAllBroadcast };

