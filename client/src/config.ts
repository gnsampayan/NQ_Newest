interface Config {
  API_URL: string;
}

const development: Config = {
  API_URL: 'http://162.240.97.162:8081/api',
};

const production: Config = {
  API_URL: 'http://162.240.97.162:8081/api',
};

const config: { [key: string]: Config } = {
  development,
  production,
};

const env = 'development';
console.log(env + " TEST");
export default config[env];
