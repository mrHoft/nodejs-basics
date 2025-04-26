import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const color = {
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
};

const spawnChildProcess = args => {
  console.log(
    `## ${color.yellow}Type your inputs to stdin.${color.reset} Type ${color.cyan}"CLOSE"${color.reset} to end. Or press ${color.cyan}Ctrl+D${color.reset} (Linux/Mac) or ${color.cyan}Ctrl+Z${color.reset} (Windows) when done.`
  );

  const child = spawn('node', [join(__dirname, 'files', 'script.js'), ...args], {
    stdio: ['inherit', 'inherit', 'inherit'],
  });

  return child;
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2', 'someArgument3']);
