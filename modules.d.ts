/* eslint-disable @typescript-eslint/consistent-type-imports */
// Styles modules

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.styl' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.stylus' {
  const classes: { [key: string]: string };
  export default classes;
}

// Asset modules

// Image files
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.ico' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.tiff' {
  const src: string;
  export default src;
}

declare module '*.tif' {
  const src: string;
  export default src;
}

// Video files
declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.webm' {
  const src: string;
  export default src;
}

declare module '*.ogg' {
  const src: string;
  export default src;
}

declare module '*.avi' {
  const src: string;
  export default src;
}

declare module '*.mov' {
  const src: string;
  export default src;
}

declare module '*.wmv' {
  const src: string;
  export default src;
}

declare module '*.flv' {
  const src: string;
  export default src;
}

declare module '*.mkv' {
  const src: string;
  export default src;
}

// Audio files
declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module '*.wav' {
  const src: string;
  export default src;
}

declare module '*.aac' {
  const src: string;
  export default src;
}

declare module '*.flac' {
  const src: string;
  export default src;
}

declare module '*.m4a' {
  const src: string;
  export default src;
}

// Font files
declare module '*.woff' {
  const src: string;
  export default src;
}

declare module '*.woff2' {
  const src: string;
  export default src;
}

declare module '*.eot' {
  const src: string;
  export default src;
}

declare module '*.ttf' {
  const src: string;
  export default src;
}

declare module '*.otf' {
  const src: string;
  export default src;
}

// Document files
declare module '*.pdf' {
  const src: string;
  export default src;
}

declare module '*.doc' {
  const src: string;
  export default src;
}

declare module '*.docx' {
  const src: string;
  export default src;
}

declare module '*.txt' {
  const src: string;
  export default src;
}

declare module '*.md' {
  const src: string;
  export default src;
}

// SVG files - dual support for React components and URL imports
declare module '*.svg' {
  const ReactComponent: import('react').FunctionComponent<
    import('react').SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export { ReactComponent };
  export default src;
}

// SVG URL imports (when using ?url suffix)
declare module '*.svg?url' {
  const src: string;
  export default src;
}

// React SVG component type
// eslint-disable-next-line import/no-unresolved
interface SVGProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
  titleId?: string;
}
