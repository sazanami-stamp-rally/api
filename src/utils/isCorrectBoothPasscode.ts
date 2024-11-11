import prisma from "@src/prisma";

async function isCorrectBoothPasscode(boothId: string, passcode: string): Promise<Boolean> {
  const booth = await prisma.booth.findUnique({
    where: {
      id: boothId
    }
  });
  if (!booth) {
    return false;
  }
  return booth.passcode === passcode;
}

export { isCorrectBoothPasscode };
