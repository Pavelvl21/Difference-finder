import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';



import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');
const expectedJson = readFileSync(getFixturePath('expected-json.txt'), 'utf8');

test('genDiff', () => {
  expect(genDiff(file1, file2)).toEqual(expectedJson);
});