/** implement function that prints array of all filenames from `files` folder into console
 * (if `files` folder doesn't exists `Error` with message `FS operation failed` must be thrown)
 */
import { readdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const folderPath = join(__dirname, 'files');

const list = async () => {
  return readdir(folderPath)
    .then(files => {
      files.forEach(file => console.log(file));
      return files;
    })
    .catch(error => {
      if (error.code === 'ENOENT') {
        throw new Error('FS operation failed');
      }
      throw error;
    });
};

await list();
