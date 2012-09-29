

var monk = require('monk');

module.exports = monk(process.env.MONGO);