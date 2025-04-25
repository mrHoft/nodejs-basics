import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const performCalculations = async () => {
  const cpuCount = cpus().length;
  const workers = [];

  for (let i = 0; i < cpuCount; i++) {
    workers.push(
      new Promise(resolve => {
        const worker = new Worker(join(__dirname, 'worker.js'));

        worker.on('message', message => {
          resolve(message);
          worker.terminate();
        });

        worker.on('error', () => {
          resolve({ status: 'error', data: null });
          worker.terminate();
        });

        worker.postMessage(10 + i);
      })
    );
  }

  const results = await Promise.all(workers);
  console.log(results);
};

await performCalculations();
