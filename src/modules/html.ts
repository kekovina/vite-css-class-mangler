import { getRawClassesFromTemplate, getRandomClassName, unescapeClassName } from '../utils';

export default function transformHTML(
  code: string,
  classMapping: Map<string, string>,
  config: GeneratorConfig
) {
  const rawClasses = getRawClassesFromTemplate(code);
  const uniqueClasses = new Set(
    rawClasses
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

      classMapping.set(className, random);
    }
  });

  classMapping.forEach((newClass, oldClass) => {
    let match: RegExpExecArray;
    const regex = new RegExp(unescapeClassName(oldClass), 'gmi');

    while ((match = regex.exec(code)) !== null) {
      if (match.index > 0 && code[match.index - 2] === ',') {
        code = code.replace(match[0], `"${newClass}"`);
      } else {
        code = code.replace(match[0], `${newClass}`);
      }
    }
  });

  return code;
}
