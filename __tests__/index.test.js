import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const yamlFile1 = getFixturePath('file1.yaml');
const yamlFile2 = getFixturePath('file2.yaml');
const expectedJson = readFileSync(getFixturePath('expected.txt'), 'utf8');
const expectedYaml = readFileSync(getFixturePath('expected.txt'), 'utf8');

test('genDiff', () => {
  expect(genDiff(jsonFile1, jsonFile2)).toEqual(expectedJson);
  expect(genDiff(yamlFile1, yamlFile2)).toEqual(expectedYaml);
});
