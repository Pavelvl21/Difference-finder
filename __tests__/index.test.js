import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const yamlFile1 = getFixturePath('file1.yaml');
const yamlFile2 = getFixturePath('file2.yaml');

const expectedStlish = readFileSync(getFixturePath('expectedStylish.txt'), 'utf8');
const expectedPlain = readFileSync(getFixturePath('expectedPlain.txt'), 'utf8');
const expectedJSON = readFileSync(getFixturePath('expectedJSON.txt'), 'utf8');

test('Stylish', () => {
  expect(genDiff(jsonFile1, jsonFile2, 'stylish')).toEqual(expectedStlish);
  expect(genDiff(yamlFile1, yamlFile2, 'stylish')).toEqual(expectedStlish);
});
test('Plain', () => {
  expect(genDiff(jsonFile1, jsonFile2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(yamlFile1, yamlFile2, 'plain')).toEqual(expectedPlain);
});
test('JSON', () => {
  expect(genDiff(jsonFile1, jsonFile2, 'json')).toEqual(expectedJSON);
  expect(genDiff(yamlFile1, yamlFile2, 'json')).toEqual(expectedJSON);
});
