const RBAC = require('easy-rbac');
const opts = require('./policies');

const rbac = new RBAC(opts);

module.exports = rbac;