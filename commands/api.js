const Discord = require("discord.js");
const database = require('./../lib/core/database');
var waky = {};

waky.run = function(command, client, message, server, sync) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    if (command.length !== 4) return message.reply("use: api apiname(divinepride) newapivalue");
    if (command[2] === 'divinepride') {
        server.divinepride = command[3];
        console.log(server.divinepride);
        database.updateServer("divinepride", command[3], server.guildid);
        message.channel.send("Divine-pride api changed!");
        return;
    }
    return message.reply("no api with that name was found.");
}
module.exports = waky;
