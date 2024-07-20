const bcrypt = require("bcryptjs");

const hash_password = (password) => {
  return bcrypt.hashSync(password, 10);
};

const compare_password = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  hash_password,
  compare_password,
};
