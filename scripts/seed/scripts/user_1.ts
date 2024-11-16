import fs from 'fs';
import csv from 'csv-parser';
import { User, PrismaClient } from '@prisma/client';

export async function seed(rootPath: string): Promise<void> {
  console.log('Seeding users...');
  const prisma = new PrismaClient();
  const data = [] as User[];

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(`${rootPath}/datas/user_1.csv`)
      .pipe(csv())
      .on('data', (row) => {
        data.push({
          id: row.id as string,
          display_name: null,
          is_activated: false
        });
      })
      .on('end', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });

  await prisma.user.createMany({ data });
  console.log('Seeding user completed!');
  await prisma.$disconnect();
}

