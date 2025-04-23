/** implement function that reads data from `process.stdin`,
 * reverses text using Transform Stream and then writes it into `process.stdout`
 */
import { Transform } from 'node:stream';

const color = {
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
};

const transform = async () => {
  console.log(
    `## ${color.yellow}Type your text. Press ${color.cyan}Ctrl+D${color.yellow} (Linux/Mac) or ${color.cyan}Ctrl+Z${color.yellow} (Windows) when done${color.reset}`
  );

  return new Promise((resolve, reject) => {
    const reverseTransform = new Transform({
      transform(chunk, _, callback) {
        const reversed = chunk.toString().split('').reverse().join('');
        this.push(reversed);
        callback();
      },
    });

    // Forward errors from transform to promise rejection
    reverseTransform.on('error', err => {
      reject(new Error(`Transform failed: ${err.message}`));
    });

    // Manual stream piping
    process.stdin.on('data', chunk => {
      const canContinue = reverseTransform.write(chunk);
      if (!canContinue) {
        process.stdin.pause();
      }
    });

    process.stdin
      .on('end', () => {
        reverseTransform.end();
      })
      .on('error', err => {
        reject(new Error(`Input error: ${err.message}`));
      });

    reverseTransform
      .on('drain', () => {
        process.stdin.resume();
      })
      .on('data', chunk => {
        const canContinue = process.stdout.write(chunk);
        if (!canContinue) {
          reverseTransform.pause();
        } else {
          process.stdout.write('\n');
        }
      })
      .on('end', resolve);

    process.stdout
      .on('drain', () => {
        reverseTransform.resume();
      })
      .on('error', err => {
        reject(new Error(`Output error: ${err.message}`));
      });
  });
};

await transform();
