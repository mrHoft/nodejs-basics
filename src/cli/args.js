/** implement function that parses command line arguments
 * (given in format `--propName value --prop2Name value2`, you don't need to validate it)
 * and prints them to the console in the format `propName is value, prop2Name is value2`
 */

const parseArgs = () => {
  const result = process.argv
    .slice(2)
    .reduce((acc, arg, i, arr) => {
      if (arg.startsWith('--') && arr[i + 1]) {
        acc.push(`${arg.slice(2)} is ${arr[i + 1]}`);
      }
      return acc;
    }, [])
    .join(', ');

  console.log(result);
};

parseArgs();
