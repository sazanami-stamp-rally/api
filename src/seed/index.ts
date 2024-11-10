import { seed as booth } from './scripts/booth';

// 自身のディレクトリを取得
const rootPath = __dirname;

// booth関数を呼び出す
await booth(rootPath);

// TODO: 他のシードも実装して呼び出す
