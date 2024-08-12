const { connect, connection } = require('mongoose');
require('dotenv').config();

const cString = process.env.MONGOURI

connect(cString);

module.exports = connection;