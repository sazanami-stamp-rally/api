import { seed as booth } from './scripts/booth';
import { seed as checkpoint } from './scripts/checkpoint';
import { seed as checkpointBooth } from './scripts/checkpoint_booth';
import { seed as user } from './scripts/user';
import { seed as user1 } from './scripts/user_1';
import { seed as user2 } from './scripts/user_2';
import { seed as seeded } from './scripts/seeded';

import { isDbSeeded } from './isDbSeeded';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const rootPath = dirname(fileURLToPath(import.meta.url));

if (await isDbSeeded()) {
  console.log('Database is already seeded');
  process.exit(0);
}

await booth(rootPath);
await checkpoint(rootPath);
await checkpointBooth(rootPath);
await user(rootPath);
await user1(rootPath);
await user2(rootPath);

// シード済みであることを記録する
await seeded();

// TODO: 他のシードも実装して呼び出す
