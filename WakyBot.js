const Discord = require('discord.js');
const client = new Discord.Client();
var core = require('./core/core');
var database = require('./lib/core/database');
var discord = require('./core/initialize');

database.dbCheck(core.con, core.db);
database.dbgetServers(core.con);
database.discordSync(core.con);
discord.initialize(client, core.con, database.servers, [core.divinepride], database.sync);
client.login(core.token);