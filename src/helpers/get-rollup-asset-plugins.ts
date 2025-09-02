import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import type { Plugin } from 'rollup';
import { assetExtensions, svgExtensions } from '../constants/asset-extensions';

export const getRollupAssetPlugins = (): Plugin[] => {
  return [
    // Custom plugin to handle ?url suffix
    {
      name: 'url-suffix-handler',
      resolveId(id) {
        if (id.endsWith('?url')) {
          // Remove the ?url suffix and resolve the actual file
          const actualId = id.slice(0, -4);

          return actualId;
        }

        return null;
      },
    } as Plugin,

    // Handle SVG files with dual support: React components and URL imports
    svgr({
      exportType: 'named',
      ref: true,
      svgo: true,
      titleProp: true,
      include: '**/*.svg',
    }) as Plugin,

    // Handle all asset files including SVGs
    url({
      include: [...assetExtensions, ...svgExtensions].map(ext => `**/*${ext}`),
      limit: 8192, // 8KB limit - smaller files will be inlined as base64
      fileName: 'public/[name]-[hash][extname]',
      publicPath: './',
    }),
  ];
};

export const getRollupAssetPluginsForBin = (): Plugin[] => {
  // For binary builds, we typically don't want to inline assets
  // and we don't need React component support for SVGs
  return [
    url({
      include: [...assetExtensions, ...svgExtensions].map(ext => `**/*${ext}`),
      limit: 0, // Always emit files for binary builds
      fileName: 'assets/[name]-[hash][extname]',
      publicPath: './',
    }),
  ];
};
