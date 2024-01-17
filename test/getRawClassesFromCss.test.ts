import { describe, it, expect } from 'vitest';
import { getRawClassesFromCss } from '../src/utils';

const testCasesBase = [
  { from: '.ab', expect: ['ab'] },
  { from: '.ab.cd', expect: ['ab', 'cd'] },
  { from: '.ab .cd', expect: ['ab', 'cd'] },
  { from: '.ab.cd:hover', expect: ['ab', 'cd'] },
  { from: '.ab.cd:nth-child(1)', expect: ['ab', 'cd'] },
  { from: '.ab:nth-child(1).cd', expect: ['ab', 'cd'] },
  { from: '.cd::after', expect: ['cd'] },
  { from: '.ab::after.cd', expect: ['ab', 'cd'] },

  { from: '.ab,.cd', expect: ['ab', 'cd'] },
  { from: '.ab~.cd', expect: ['ab', 'cd'] },
  { from: '.ab, .cd', expect: ['ab', 'cd'] },
  { from: '.ab ~ .cd', expect: ['ab', 'cd'] }
];

const testCasesTailwind = [
  { from: '.flex', expect: ['flex'] },
  { from: '.base-1/2', expect: ['base-1/2'] },
  { from: '.grid-cols-2', expect: ['grid-cols-2'] },
  { from: '.-transform-x-1/2', expect: ['-transform-x-1/2'] },
  { from: '.cursor-pointer{', expect: ['cursor-pointer'] },
  { from: '.hover:text-gray-400:hover{', expect: ['hover:text-gray-400'] }
];

describe('getRawClassesFromCss. Base', () => {
  testCasesBase.map((testCase) =>
    it(`should get "${testCase.expect}" class from "${testCase.from}"`, () => {
      const input = testCase.from;
      expect(getRawClassesFromCss(input)).toEqual(testCase.expect);
    })
  );
});

describe('getRawClassesFromCss. Tailwind 3', () => {
  testCasesTailwind.map((testCase) =>
    it(`should get "${testCase.expect}" class from "${testCase.from}"`, () => {
      const input = testCase.from;
      expect(getRawClassesFromCss(input)).toEqual(testCase.expect);
    })
  );
});
