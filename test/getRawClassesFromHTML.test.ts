import { describe, it, expect } from 'vitest';
import { getRawClassesFromTemplate } from '../src/utils';

const createDiv = (input: string) => `<div class="${input}"></div>`;

const testCasesBase = [
  { from: 'not html', expect: [] },
  { from: createDiv('ab'), expect: ['ab'] },
  { from: createDiv('ab bc'), expect: ['ab', 'bc'] }
];

const testCasesTailwind = [
  { from: createDiv('grid grid-column-2'), expect: ['grid', 'grid-column-2'] },
  { from: createDiv('rounded-2xl -translate-x-1/2'), expect: ['rounded-2xl', '-translate-x-1/2'] }
];

describe('getRawClassesFromHTML. Base', () => {
  testCasesBase.map((testCase) =>
    it(`should get "${testCase.expect}" class from "${testCase.from}"`, () => {
      const input = testCase.from;
      expect(getRawClassesFromTemplate(input)).toEqual(testCase.expect);
    })
  );
});

describe('getRawClassesFromHTML. Tailwind 3', () => {
  testCasesTailwind.map((testCase) =>
    it(`should get "${testCase.expect}" class from "${testCase.from}"`, () => {
      const input = testCase.from;
      expect(getRawClassesFromTemplate(input)).toEqual(testCase.expect);
    })
  );
});
