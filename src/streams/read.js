/** implement function that reads file `fileToRead.txt` content
 * using Readable Stream and prints it's content into `process.stdout`
 */

import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'files', 'fileToRead.txt');

const read = () =>
  new Promise((resolve, reject) => {
    const stream = createReadStream(filePath, 'utf8');
    let content = '';

    stream.on('data', chunk => {
      content += chunk;
      process.stdout.write(chunk);
    });

    stream.on('end', () => {
      process.stdout.write('\n');
      resolve(content);
    });

    stream.on('error', error => {
      if (error.code === 'ENOENT') {
        reject(new Error('FS operation failed'));
      } else {
        reject(error);
      }
    });
  });

await read();
