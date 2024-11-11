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


export { createBroadcast };

