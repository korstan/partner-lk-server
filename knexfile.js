const path = require('path');
const config = require('./src/config');

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');

module.exports = {
  development: {
    client: 'pg',
    connection: config.PG_CONNECTION,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }
};
