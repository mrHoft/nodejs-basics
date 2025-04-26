/** implement function that calculates SHA256 hash for file `fileToCalculateHashFor.txt`
 * and logs it into console as `hex` using Streams API
 */

import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
  const hash = createHash('sha256');
  const stream = createReadStream(filePath);

  return new Promise((resolve, reject) => {
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => {
      const hexHash = hash.digest('hex');
      console.log(hexHash);
      resolve(hexHash);
    });
    stream.on('error', error => {
      if (error.code === 'ENOENT') {
        reject(new Error('FS operation failed'));
      } else {
        reject(error);
      }
    });
  });
};

await calculateHash();
