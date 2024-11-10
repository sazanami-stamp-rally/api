import { seed as booth } from './scripts/booth';
import { seed as checkpoint } from './scripts/checkpoint';
import { seed as checkpointBooth } from './scripts/checkpoint_booth';
import { seed as user } from './scripts/user';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const rootPath = dirname(fileURLToPath(import.meta.url));

// booth関数を呼び出す
await booth(rootPath);
await checkpoint(rootPath);
await checkpointBooth(rootPath);
await user(rootPath);

// TODO: 他のシードも実装して呼び出す
