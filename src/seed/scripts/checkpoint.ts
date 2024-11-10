import fs from 'fs';
import csv from 'csv-parser';
import { Checkpoint, PrismaClient } from '@prisma/client';

export async function seed(rootPath: string): Promise<void> {
  console.log('Seeding checkpoints...');
  const prisma = new PrismaClient();
  const data = [] as Checkpoint[];

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(`${rootPath}/datas/checkpoint.csv`)
      .pipe(csv())
      .on('data', (row) => {
        data.push({
          id: row.id as string,
          display_name: row.display_name as string,
          floor: parseInt(row.floor as string),
          booth_id: (row.booth_id as string || null),
          category: row.category as string,
          cooldown_duration: parseInt(row.cooldown_duration as string),
        });
      })
      .on('end', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });

  await prisma.checkpoint.createMany({ data });
  console.log('Seeding checkpoints completed!');
  await prisma.$disconnect();
}

