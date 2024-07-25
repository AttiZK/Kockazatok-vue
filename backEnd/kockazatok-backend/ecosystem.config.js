module.exports = {
  apps: [
    {
      name: 'kockazatok',
      script: './index.js',
      env: {
        DB_HOST: 'postgresql.r3.websupport.hu',
        DB_USER: 'Kockazatsql',
        DB_PASS: 'Kocka1234',
        DB_NAME: 'Kockazatok',
        DB_PORT: 5432,
        JWT_SECRET_KEY: 'your_jwt_key',
        PORT: 3000,
      },
    },
  ],
};
