import { seed as booth } from './scripts/booth';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const rootPath = dirname(fileURLToPath(import.meta.url));

// booth関数を呼び出す
await booth(rootPath);

// TODO: 他のシードも実装して呼び出す
