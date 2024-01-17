import { HTMLElementsRegex, getRandomClassName, escapeClassName } from '../utils';

export default function transformJs(
  code: string,
  classMapping: Map<string, string>,
  config: GeneratorConfig
) {
  config.unwatchedClasses?.map((cl) => {
    if (HTMLElementsRegex.test(cl)) {
      return;
    }

    if (!classMapping.has(cl)) {
      let random = getRandomClassName(config);
      const classMappingList = Array.from(classMapping.values());

      while (classMappingList.includes(random)) {
        random = getRandomClassName(config);
      }

      classMapping.set(escapeClassName(cl), random);
    }
  });

  classMapping.forEach((newClass, oldClass) => {
    let match: RegExpExecArray;
    // TODO: доделать регулярку, чтобы не срабатывало на случаи с ().someClass(), на название методов js
    const r = new RegExp(`[\`"']([^#)][.]?(${oldClass}))[^(]?[\`'"]`, 'gmi');
    // const r = new RegExp(`(\(["'\`].*[.]?[^#](${oldClass}).*["'\`]\))|(["'\`].*[.]?[^#](${oldClass}).*["'\`])`, 'gmi');

    while ((match = r.exec(code)) !== null) {
      code = code.replace(match[1], newClass);
    }
  });

  return {
    code,
    map: null
  };
}
