/** implement function that deletes file `fileToRemove.txt`
 * (if there's no file `fileToRemove.txt` `Error` with message `FS operation failed` must be thrown)
 */

import { unlink } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'files', 'fileToRemove.txt');

const remove = async () => {
  unlink(filePath)
    .catch(error => {
      if (error.code === 'ENOENT') {
        throw new Error('FS operation failed');
      }
      throw error;
    });
};

await remove();
