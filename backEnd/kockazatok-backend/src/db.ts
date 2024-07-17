import pgPromise from 'pg-promise';

const pgp = pgPromise();

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'kockazatok',
  user: 'attizk',
  password: '123456',
};

const db = pgp(connection);

export default db;
