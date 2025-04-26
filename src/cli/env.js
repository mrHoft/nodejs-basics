/** implement function that parses environment variables with prefix `RSS_`
 * and prints them to the console in the format `RSS_name1=value1; RSS_name2=value2`
 */

const parseEnv = () => {
  const rssVars = Object.entries(process.env)
    .filter(([key]) => key.startsWith('RSS_'))
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');

  if (!rssVars) {
    throw new Error('No RSS_ environment variables found');
  }

  console.log(rssVars);
};

parseEnv();
