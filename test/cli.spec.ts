// eslint-disable-next-line import/no-unresolved
import { expect, it, describe } from 'bun:test';
import { getLibraryCleanerAndBuilder, getLibraryBuildFileContentGetter } from './utils';

describe('React Library', () => {
  const libDir = 'react-library';
  const cleanAndBuild = getLibraryCleanerAndBuilder(libDir);
  const getFileContent = getLibraryBuildFileContentGetter(libDir);

  it('Build with no options', async () => {
    await cleanAndBuild();

    expect(await getFileContent('index.css')).toMatchSnapshot('index.css');

    expect(await getFileContent('index.js')).toMatchSnapshot('index.js');
    expect(await getFileContent('index.mjs')).toMatchSnapshot('index.mjs');

    expect(await getFileContent('components', 'button', 'index.js')).toMatchSnapshot(
      'components/button/index.js'
    );
    expect(await getFileContent('components', 'button', 'index.mjs')).toMatchSnapshot(
      'components/button/index.mjs'
    );
  });
});
