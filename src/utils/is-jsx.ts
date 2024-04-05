import path from 'path';

export const isJsx = (fileName: string) => path.extname(fileName).includes('sx');
