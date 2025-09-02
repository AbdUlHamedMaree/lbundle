# Asset Type Declarations

lbundle provides comprehensive TypeScript type declarations for all supported asset imports. These types ensure you get proper IntelliSense and type safety when importing assets in your projects.

## Using Asset Types

### Method 1: Triple-Slash Reference (Recommended)

Add this reference at the top of your main type declaration file (e.g., `src/index.d.ts` or `src/types/global.d.ts`):

```typescript
/// <reference types="lbundle/modules" />
```

Or if you have lbundle installed locally:

```typescript
/// <reference types="lbundle/modules" />
```

### Method 2: Import from Package

You can also import the types directly:

```typescript
// In your tsconfig.json, add to "types" array:
{
  "compilerOptions": {
    "types": ["lbundle/modules"]
  }
}
```

### Method 3: Manual Reference

Copy the type declarations from `node_modules/lbundle/modules.d.ts` to your own type declaration file if you prefer to maintain them locally.

## Supported Asset Types

The type declarations include support for:

### Images

- `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.avif`, `.ico`, `.bmp`, `.tiff`, `.tif`

### Videos

- `.mp4`, `.webm`, `.ogg`, `.avi`, `.mov`, `.wmv`, `.flv`, `.mkv`

### Audio

- `.mp3`, `.wav`, `.aac`, `.flac`, `.m4a`

### Fonts

- `.woff`, `.woff2`, `.eot`, `.ttf`, `.otf`

### Documents

- `.pdf`, `.doc`, `.docx`, `.txt`, `.md`

### SVGs (Special Support)

- `.svg` - Dual support for React components and URLs
- `.svg?url` - URL-only imports

## Example Usage

Once you've added the type reference, you'll get full TypeScript support:

```typescript
// ✅ TypeScript knows these are strings
import logoUrl from './assets/logo.png';
import heroImage from './assets/hero.jpg';

// ✅ TypeScript knows ReactComponent is a React component
import { ReactComponent as Icon } from './assets/icon.svg';

// ✅ TypeScript provides proper props and ref support
function MyComponent() {
  return (
    <div>
      <img src={logoUrl} alt="Logo" />
      <Icon className="icon" title="My Icon" />
    </div>
  );
}
```

## SVG Component Props

SVG React components include these TypeScript types:

```typescript
interface SVGProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
  titleId?: string;
}
```

This means you get full IntelliSense for:

- All standard SVG attributes (`className`, `style`, `onClick`, etc.)
- `title` prop for accessibility
- `titleId` prop for custom title IDs
- `ref` support for accessing the SVG element

## Troubleshooting

### "Cannot find module" errors

If you see TypeScript errors like "Cannot find module '\*.png'", make sure:

1. You've added the triple-slash reference to your type declarations
2. The reference path is correct relative to your file
3. Your `tsconfig.json` includes the file with the reference
4. You've restarted your TypeScript language server

### Build-time warnings

You may see TypeScript warnings during build about missing type declarations. This is normal - the asset processing happens at build time through Rollup plugins, not through TypeScript's module resolution.

The warnings don't affect functionality and the assets will be processed correctly.
