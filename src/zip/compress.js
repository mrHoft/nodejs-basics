/** implement function that compresses file `fileToCompress.txt`
 * to `archive.gz` using `zlib` and Streams API
 */

import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(__dirname, 'files', 'fileToCompress.txt');
const destPath = join(__dirname, 'files', 'archive.gz');

const compress = async () => {
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destPath);
  const gzip = createGzip();

  return pipeline(readStream, gzip, writeStream).catch(error => {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
    throw error;
  });
};

await compress();
