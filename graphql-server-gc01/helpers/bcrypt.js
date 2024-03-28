const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return bcrypt.hash(password, bcrypt.genSaltSync(10));
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
