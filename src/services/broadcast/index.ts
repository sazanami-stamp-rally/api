import prisma from "@src/prisma";

async function createBroadcast(boothId: string, title: string, body: string, type: string) {
  return await prisma.broadcast.create({
    data: {
      booth_id: boothId,
      title,
      body,
      type
    },
  });
}


async function getAllBroadcast() {
  return await prisma.broadcast.findMany();
}

async function getAllBroadcastWithCursorPagination(cursorId: string | null, limit: number, type?: string) {
  return await prisma.broadcast.findMany({
    ...(cursorId && {
      cursor: {
        id: cursorId
      }
    }),
    ...(type && {
      where: {
        type
      }
    }),
    orderBy: {
      id: 'desc', // createdAtを使ってもいいけど、cuidも10000レコード/ミリ秒までならソート可能性が保たれるので
    },
    take: limit,
  });
}

export { createBroadcast, getAllBroadcast, getAllBroadcastWithCursorPagination };

