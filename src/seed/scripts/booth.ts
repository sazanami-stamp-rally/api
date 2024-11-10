import fs from 'fs';
import csv from 'csv-parser';
import { Booth, PrismaClient } from '@prisma/client';

export async function seed(rootPath: string): Promise<void> {
  console.log('Seeding booths...');
  const prisma = new PrismaClient();
  const data = [] as Booth[];

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(`${rootPath}/datas/booth.csv`)
      .pipe(csv())
      .on('data', (row) => {
        data.push({
          id: row.id as string,
          display_name: row.display_name as string,
          floor: parseInt(row.floor as string),
          category: row.category as string,
          flags: row.flags ? row.flags.split(',') : [],
        });
      })
      .on('end', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });

  await prisma.booth.createMany({ data });
  console.log('Seeding booths completed!');
  await prisma.$disconnect();
}

