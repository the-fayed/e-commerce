const roles = require('../enum/roles');
const adminPolicy = require('./admin-policy');
const userPolicy = require('./user-policy');

const opts = {
  [roles.ADMIN]: {can: adminPolicy},
  [roles.USER]: {can: userPolicy}
};

module.exports = opts;