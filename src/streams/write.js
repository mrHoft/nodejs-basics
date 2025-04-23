/** implement function that writes `process.stdin` data
 * into file `fileToWrite.txt` content using Writable Stream
 */

import { createWriteStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'files', 'fileToWrite.txt');

const color = {
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
};

const write = async () => {
  console.log(
    `## ${color.yellow}Type your text. Press ${color.cyan}Ctrl+D${color.yellow} (Linux/Mac) or ${color.cyan}Ctrl+Z${color.yellow} (Windows) when done${color.reset}`
  );

  return new Promise((resolve, reject) => {
    const writableStream = createWriteStream(filePath);

    process.stdin.on('data', chunk => {
      writableStream.write(chunk);
    });

    process.stdin.on('end', () => {
      writableStream.end('\n');
      console.log(`## ${color.yellow}✓ Typed input was written into fileToWrite.txt${color.reset}`);
    });

    writableStream.on('finish', resolve);
    writableStream.on('error', () => reject(new Error('FS operation failed')));
  });
};

await write();
