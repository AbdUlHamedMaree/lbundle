// eslint-disable-next-line import/no-unresolved
import { expect, it, describe } from 'bun:test';
import { getLibraryCleanerAndBuilder, getLibraryBuildFileContentGetter } from './utils';

// NOTE: describe.each isn't functioning well
// https://github.com/oven-sh/bun/issues/5752
const tests = [
  {
    title: 'React Library',
    libDir: 'react-library',
    files: [
      'index.css',

      'index.js',
      'index.js.map',
      'index.mjs',
      'index.mjs.map',
      'index.d.ts',

      'components/index.js',
      'components/index.js.map',
      'components/index.d.ts',

      'components/button/index.js',
      'components/button/index.js.map',
      'components/button/index.mjs',
      'components/button/index.mjs.map',
      'components/button/index.d.ts',
    ],
  },
  {
    title: 'Utils Library',
    libDir: 'utils-library',
    files: [
      'cli.js',
      'cli.js.map',

      'index.js',
      'index.js.map',
      'index.mjs',
      'index.mjs.map',
      'index.d.ts',
    ],
  },
];

for await (const test of tests) {
  describe(test.title, () => {
    const cleanAndBuild = getLibraryCleanerAndBuilder(test.libDir);
    const getFileContent = getLibraryBuildFileContentGetter(test.libDir);

    it('Build with no options', async () => {
      await cleanAndBuild();

      for await (const file of test.files) {
        expect(await getFileContent(file)).toMatchSnapshot(file);
      }
    });
  });
}
