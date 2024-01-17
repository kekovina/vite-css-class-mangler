import {
  cssPseudoRegex,
  escapeClassName,
  getRawClassesFromCss,
  getRandomClassName
} from '../utils';

export default function transformStyles(
  code: string,
  classMapping: Map<string, string>,
  config: GeneratorConfig
) {
  let classesToReplace = [];

  classesToReplace = getRawClassesFromCss(code);

  const uniqueClasses = new Set(
    classesToReplace
      .map((c) => c.split(' '))
      .flat()
      .filter((c) => c.length > 0)
      .sort((a, b) => b.length - a.length)
  );

  uniqueClasses.forEach((className) => {
    if (!classMapping.has(className)) {
      let random = getRandomClassName(config);
      const classMappingList = Array.from(classMapping.values());

      while (classMappingList.includes(random)) {
        random = getRandomClassName(config);
      }

      classMapping.set(escapeClassName(className), random);
    }
  });

  classMapping.forEach((newClass, oldClass) => {
    let match: RegExpExecArray;
    const regex = new RegExp(oldClass, 'gmi');

    while ((match = regex.exec(code)) !== null) {
      if (match.index > 0 && code[match.index - 2] === ',') {
        code = code.replace(match[0], `"${newClass}"`);
      } else {
        code = code.replace(match[0], `${newClass}`);
      }
    }
  });

  return {
    code,
    map: null
  };
}
