import path from 'path';

export const isTs = (fileName: string) => path.extname(fileName).includes('ts');
