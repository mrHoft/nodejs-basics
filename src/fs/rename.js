/** implement function that renames file `wrongFilename.txt` to `properFilename` with extension `.md`
 * (if there's no file `wrongFilename.txt` or `properFilename.md` already exists `Error` with message `FS operation failed` must be thrown)
 */

import { rename as renameFile, access, constants } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const oldPath = join(__dirname, 'files', 'wrongFilename.txt');
const newPath = join(__dirname, 'files', 'properFilename.md');

const rename = async () => {
  access(oldPath, constants.F_OK)
    .then(() => access(newPath, constants.F_OK)
      .then(() => {
        throw new Error('FS operation failed');
      })
      .catch(error => {
        if (error.code !== 'ENOENT') throw error;
        return renameFile(oldPath, newPath);
      })
    )
    .catch(() => {
      throw new Error('FS operation failed');
    });
};

await rename();
