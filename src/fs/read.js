/** implement function that prints content of the `fileToRead.txt` into console
 * (if there's no file `fileToRead.txt` `Error` with message `FS operation failed` must be thrown)
 */

import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
  return readFile(filePath, 'utf8')
  .then(content => {
    console.log(content);
    return content;
  })
  .catch(error => {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
    throw error;
  });
};

await read();
