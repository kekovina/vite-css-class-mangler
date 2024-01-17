import type { Plugin } from 'vite';
import transformStyles from './modules/styles';
import transformHTML from './modules/html';
import transformJs from './modules/js';
import { endsWith } from './utils';

const defaultSuffixes = ['.html'];

export default function ClassMangler(config: PluginConfig = {}): Plugin[] {
  config.suffixes = config.suffixes || defaultSuffixes;

  const classMapping = new Map();
  const idMapping = new Map();

  const plugins: Plugin[] = [
    {
      name: 'class-mangler-styles',
      apply: config.dev ? 'serve' : 'build',
      transform(code, id) {
        if (endsWith(id, ['.css', '.scss'])) {
          return transformStyles(code, classMapping, config);
        }
      },
      generateBundle() {
        const classMappingObject = {};

        classMapping.forEach((value, key) => {
          classMappingObject[key] = value;
        });

        this.emitFile({
          type: 'asset',
          name: 'class-mapping.json',
          source: JSON.stringify(classMappingObject)
        });
      }
    },
    {
      name: 'class-mangler-html',
      enforce: 'post',
      transformIndexHtml(code) {
        return transformHTML(code, classMapping, config);
      }
    },
    {
      name: 'class-mangler-js',
      enforce: 'post',
      apply: config.dev ? 'serve' : 'build',
      transform(code, id) {
        if (endsWith(id, ['.js'])) {
          return transformJs(code, classMapping, config);
        }
      }
    }
  ];

  if (config.dev) {
    plugins.forEach((plugin) => {
      delete plugin.apply;
    });
  }

  return plugins;
}
