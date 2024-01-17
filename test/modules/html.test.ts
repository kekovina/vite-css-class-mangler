import { describe, expect, it } from 'vitest';
import transformHTML from '../../src/modules/html';

const createDiv = (input: string) => `<div class="${input}"></div>`;

const config = {
  length: 5
};

describe('test html transformer', () => {
  it('should not transform anything', () => {
    const code = 'not html';

    const classMapping = new Map();
    const result = transformHTML(code, classMapping, config);

    expect(result).toBe('not html');
  });

  it('should transform "ab" to "AB"', () => {
    const code = createDiv('ab');

    const classMapping = new Map();
    classMapping.set('ab', 'AB');
    const result = transformHTML(code, classMapping, config);
    expect(result).contain('AB');
  });

  it('should transform "ab bc" to "AB BC"', () => {
    const code = createDiv('ab bc');

    const classMapping = new Map();
    classMapping.set('ab', 'AB');
    classMapping.set('bc', 'BC');
    const result = transformHTML(code, classMapping, config);
    expect(result).contain('AB BC');
  });

  it('should transform "ab bc" to random string', () => {
    const code = createDiv('ab bc');

    const classMapping = new Map();
    const result = transformHTML(code, classMapping, config);

    expect(result).toMatch(/class="[A-z0-9]+\s[A-z0-9]+"/g);
  });
});
