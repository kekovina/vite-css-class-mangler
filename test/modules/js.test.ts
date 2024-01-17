import { describe, expect, it } from 'vitest';
import transformJs from '../../src/modules/js';

type PluginConfig = {
  length?: number;
  unwatchedClasses?: string[];
};

const config: PluginConfig = {
  length: 5
};

describe('test js transformer', () => {
  describe('transform of class selector', () => {
    it('should not transform anything', () => {
      const code = 'none';

      const classMapping = new Map();
      const result = transformJs(code, classMapping, config);

      expect(result.code).toBe('none');
    });

    it('should transform "const a = `.abc`" to "const a = `.cba`"', () => {
      const code = 'const a = `.abc`';

      const classMapping = new Map();
      classMapping.set('abc', 'cba');
      const result = transformJs(code, classMapping, config);

      expect(result.code).toContain('.cba');
    });

    it('should not transform name of var "const variable = `.abc`"', () => {
      const code = 'const variable = `.abc`';

      const classMapping = new Map();
      classMapping.set('variable', 'cba');
      const result = transformJs(code, classMapping, config);

      expect(result.code).toContain('variable');
    });

    it('should transform class with dot', () => {
      const code = '$(`.abc`).toggleClass(`active`)';

      const classMapping = new Map();
      classMapping.set('abc', 'cba');
      const result = transformJs(code, classMapping, config);

      expect(result.code).toContain('.cba');
    });
    it('should transform class without dot', () => {
      const code = '$(`.abc`).toggleClass(`active`)';

      const classMapping = new Map();
      classMapping.set('active', 'not-active');
      const result = transformJs(code, classMapping, config);

      expect(result.code).toContain('not-active');
    });
    it('should transform difficult selector', () => {
      const code = '$(`.abc:nth-child(12):hover`).toggleClass(`active`)';

      const classMapping = new Map();
      classMapping.set('abc', 'cba');
      const result = transformJs(code, classMapping, config);

      expect(result.code).toContain('.cba');
    });
    it('should transform selector from unwatchedClass', () => {
      const code = '$(`.abc`).toggleClass(`active`)';

      const classMapping = new Map();
      const configWithUnwatched = { ...config, unwatchedClasses: ['abc'] };
      const result = transformJs(code, classMapping, configWithUnwatched);

      expect(result.code).not.contain('.abc');
    });
    it('should transform deep selector', () => {
      const code = '$(`.selector.abc:nth-child(12):hover`).toggleClass(`active`)';

      const classMapping = new Map();
      classMapping.set('abc', 'cba');
      const result = transformJs(code, classMapping, config);

      expect(result.code).toContain('.cba');
    });
    it('should transform escaped selector', () => {
      const code = '$(`.selector.-transform-x-1/2`).toggleClass(`active`)';

      const classMapping = new Map();
      classMapping.set('-transform-x-1/2', 'cba');
      const result = transformJs(code, classMapping, config);

      expect(result.code).toContain('.cba');
    });
  });

  describe('transform of id selector', () => {
    it('should not transform const a = #abc', () => {
      const code = 'const a = #abc`';

      const classMapping = new Map();
      classMapping.set('abc', 'cba');
      const result = transformJs(code, classMapping, config);

      expect(result.code).not.toContain('#cba');
    });

    it('should not transform $(`#abc`)', () => {
      const code = '$(`#abc`).toggleClass(`active`)';

      const classMapping = new Map();
      classMapping.set('abc', 'cba');
      const result = transformJs(code, classMapping, config);

      expect(result.code).not.toContain('#cba');
    });

    it('should not transform $(`.a#abc`)', () => {
      const code = '$(`.a#abc`).toggleClass(`active`)';

      const classMapping = new Map();
      classMapping.set('abc', 'cba');
      const result = transformJs(code, classMapping, config);

      expect(result.code).not.toContain('#cba');
    });

    it('should not transform $(`.a .k#abc`)', () => {
      const code = '$(`.a .k#abc`).toggleClass(`active`)';

      const classMapping = new Map();
      classMapping.set('abc', 'cba');
      classMapping.set('k', 'K');
      const result = transformJs(code, classMapping, config);

      expect(result.code).toContain('K#abc');
    });
  });
  describe('transform of attributes', () => {
    it('should not transform name of attr "data-abc" a[data-abc="bde"]', () => {
      const code = 'a[data-abc="bde"]';

      const classMapping = new Map();
      classMapping.set('data-abc', 'cba');
      const result = transformJs(code, classMapping, config);

      expect(result.code).not.toContain('cba');
    });

    it('should not transform value of attr "data-abc" a[data-abc="bde"]', () => {
      const code = 'a[data-abc="bde"]';

      const classMapping = new Map();
      classMapping.set('bde', 'BDE');
      const result = transformJs(code, classMapping, config);

      expect(result.code).not.toContain('BDE');
    });
  });

  describe('transform of js code', () => {
    it('should not transform js method', () => {
      const code = '$(`.abc`).toggleClass(`active`)';

      const classMapping = new Map();
      classMapping.set('toggleClass', 'cba');
      const result = transformJs(code, classMapping, config);

      expect(result.code).contain('toggleClass');
    });
  });
});
