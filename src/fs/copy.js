/** implement function that copies folder `files` files with all its content into folder `files_copy` at the same level
 * (if `files` folder doesn't exist or `files_copy` has already been created `Error` with message `FS operation failed` must be thrown)
 */

import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  const sourceDir = join(__dirname, 'files');
  const targetDir = join(__dirname, 'files_copy');

  const sourceExists = await fs
    .access(sourceDir, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
  const targetExists = await fs
    .access(targetDir, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);

  if (!sourceExists || targetExists) {
    throw new Error('FS operation failed');
  }

  async function copyFolder(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = join(src, entry.name);
      const destPath = join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyFolder(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  }

  copyFolder(sourceDir, targetDir).then(() => {
    console.log('Folder copied successfully.');
  });
};

await copy();
