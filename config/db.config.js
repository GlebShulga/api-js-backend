module.exports = {
  USER: 'postgres',
  PASSWORD: 'Parliament1!', // write password of your postgres user here
  HOST: 'localhost',
  PORT: 5432,
  DB: 'node_postgres',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
