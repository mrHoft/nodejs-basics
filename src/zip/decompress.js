/** implement function that decompresses `archive.gz`
 * back to the `fileToCompress.txt`
 * with same content as before compression using `zlib` and Streams
 */

import { access, constants } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const compressedPath = join(__dirname, 'files', 'archive.gz');
const outputPath = join(__dirname, 'files', 'fileToCompress.txt');

const decompress = async () => {
  return access(outputPath, constants.F_OK)
    .then(() => {
      throw new Error('FS operation failed: file fileToCompress.txt already exists');
    })
    .catch(error => {
      if (error.code === 'ENOENT') {
        const readStream = createReadStream(compressedPath);
        const writeStream = createWriteStream(outputPath);
        const gunzip = createGunzip();

        return pipeline(readStream, gunzip, writeStream).catch(error => {
          if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
          }
          throw error;
        });
      }
      throw error;
    });
};

await decompress();
