/** implement function that creates new file `fresh.txt` with content `I am fresh and young`
 * inside of the `files` folder
 * if file already exists `Error` with message `FS operation failed` must be thrown
*/

import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const filePath = join(__dirname, 'files', 'fresh.txt')
  const fileExists = await fs.access(filePath, fs.constants.F_OK).then(() => true).catch(() => false);

  if (fileExists) {
    throw new Error('FS operation failed');
  }

  fs.writeFile(filePath, 'I am fresh and young', 'utf8').then(()=>{
    console.log('File created successfully.');})
};

await create();
