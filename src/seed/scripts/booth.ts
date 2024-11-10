import csv from 'csv-parser';
import fs from 'fs';
import { PrismaClient, Booth } from '@prisma/client';

export function seed(rootPath: string): void {
  console.log('Seeding booths...');
  const prisma = new PrismaClient();
  const data = [] as Booth[];

  fs.createReadStream(`${rootPath}/datas/booth.csv`)
    .pipe(csv())
    .on('data', (row) => {
      data.push({
        id: row.id as string,
        display_name: row.display_name as string,
        floor: row.floor as number,
        category: row.category as string,
        flags: row.flags ? row.flags.split(',') : [],
      });
    })
    .on('end', async () => {
      await prisma.booth.createMany({
        data
      });
      console.log('Seeding booths completed!');
      prisma.$disconnect();
    });
}
