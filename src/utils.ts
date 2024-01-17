import random from 'randomstring';
import Crypto from 'crypto';

export function addSlashes(str: string): string {
  return (str + '').replace(/\\/g, '\\\\');
}

const HtmlmElements = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'ruby',
  'rb',
  'rt',
  'rtc',
  'rp',
  's',
  'samp',
  'script',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr'
];

export const cssPseudoClasses = [
  'active',
  'checked',
  'disabled',
  'empty',
  'enabled',
  'first-child',
  'first-of-type',
  'focus',
  'hover',
  'in-range',
  'invalid',
  'lang',
  'last-child',
  'last-of-type',
  'link',
  'not',
  'nth-child',
  'nth-last-child',
  'nth-last-of-type',
  'nth-of-type',
  'only-of-type',
  'only-child',
  'optional',
  'out-of-range',
  'read-only',
  'read-write',
  'required',
  'root',
  'target',
  'valid',
  'visited'
];
export const cssPseudoElements = [
  'after',
  'before',
  'cue',
  'first-letter',
  'first-line',
  'selection',
  'slotted',
  'backdrop',
  'placeholder',
  'marker',
  'spelling-error',
  'grammar-error'
];
export const HTMLElementsRegex = new RegExp(`/(${HtmlmElements.join('|')})/`, 'gmi');
export const cssPseudoElementsRegex = cssPseudoElements.join('|');
export const cssPseudoRegex = cssPseudoClasses.join('|');

export const escapeClassName = (className: string) => {
  return className.replace(/[()]/, '').replace(/[/\\^$*+?.()|[\]{}:]/g, '\\\\$&');
};

export const unescapeClassName = (className: string) => {
  return className.replace(/\\/gim, '');
};

export const removeCssPsuedoSelector = (code: string) => {
  return code.replace(new RegExp(`:(${cssPseudoRegex})[(\\w\\d)]*`, 'g'), '');
};
export const removeCssPsuedoElements = (code: string): string => {
  return code.replace(new RegExp(`::(${cssPseudoElementsRegex})[(\\w\\d)]*`, 'g'), '');
};

const getRandomInt = (min: number, max: number) => {
  return (Crypto.randomBytes(1)[0] % (max - min + 1)) + min;
};

export const getFiletype = (id: string) => {
  const res = id.match(new RegExp('[^\\.]+$'));
  return res ? res[0] : '';
};

export const getRandomClassName = (config: { length?: number; min?: number; max?: number }) => {
  let length = 5;

  config.length
    ? (length = config.length)
    : config.min && config.max && (length = getRandomInt(config.min, config.max));

  return random.generate({
    length,
    charset: 'alphabetic'
  });
};

export const endsWith = (id: string, suffixes: string[]) => {
  return suffixes.some((suffix) => {
    return id.endsWith(suffix);
  });
};

export const getRegexps = (id: string) => {
  const arr: RegExp[] = [];
  switch (getFiletype(id)) {
    case 'html':
      arr.push(new RegExp('(?<=class["\'],\\s*["\']).*?(?=["\'])', 'gm'));
      break;
  }
  return arr;
};

export const getRawClassesFromCss = (code: string): string[] => {
  const classRegExp = /\.([A-z-][a-z-0-9\\[\]/()_':]+)/gim;

  let m: RegExpExecArray;

  let matches = [];

  while ((m = classRegExp.exec(code)) !== null) {
    if (m.index === classRegExp.lastIndex) {
      classRegExp.lastIndex++;
    }
    matches.push(m[1]);
  }

  matches = matches
    .sort((a, b) => b.length - a.length && (b[0] > a[0] ? -1 : 1))
    .map(removeCssPsuedoSelector)
    .map(removeCssPsuedoElements);

  const bad = matches.filter((el) => el.includes('.'));
  bad.map((el) => {
    const splitted = el.split('.');
    matches.splice(matches.indexOf(el), 1);
    matches.push(...splitted);
  });

  matches = Array.from(new Set(matches)).sort((a, b) => b.length - a.length);
  matches.filter((el) => !new RegExp(`^(${HTMLElementsRegex})$`, 'gmi').test(el));

  return matches;
};

export const getRawClassesFromTemplate = (code: string): string[] => {
  const rawClasses: string[] = [];
  const classRegExp = /class="([A-z-_0-9 /]+)"/gim;

  let m: RegExpExecArray;
  const matches = [];

  while ((m = classRegExp.exec(code)) !== null) {
    if (m.index === classRegExp.lastIndex) {
      classRegExp.lastIndex++;
    }
    matches.push(m[1]);
  }

  matches.map((match) => {
    rawClasses.push(...match.split(' '));
  });

  return rawClasses;
};
