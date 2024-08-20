interface Config {
  API_URL: string;
}

//Local Machine running Express JS
const development: Config = {
  API_URL: 'http://localhost:8081/api',
};
// Bluehost VPS running Express JS
const production: Config = {
  // API_URL: 'https://162.240.97.162:8081/api', 
  API_URL: 'https://api.therealglenn.com:8081/api',
};

const config: { [key: string]: Config } = {
  development,
  production,
};

const env = 'development';
//console.log(env + " TEST");
export default config[env];