/**
 * All important files will be loaded here, so it will be easy
 * to set a path and stuffs.
 */

'use strict';
console.log("-* Running core/core.js to create db connection and token.");
const WakyConfig = require('./../WakyConfig.js'); // WakyConfig file path.
const mysql = require('mysql');
var core = {};
var con = mysql.createConnection({
    host: WakyConfig.host,
    user: WakyConfig.user,
    password: WakyConfig.password,
    database: WakyConfig.database
});
core.con = con;
core.db = WakyConfig.database;
core.token = WakyConfig.token;
core.divinepride = WakyConfig.divinepride;
module.exports = core;