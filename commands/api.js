const Discord = require("discord.js");
var waky = {};

waky.run = function(command, client, message, server, language) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    if (command.length !== 4) return message.reply("use: api apiname(divinepride) newapivalue");
    if (command[2] === 'divinepride') {
        server.divinepride = command[3];
        console.log(server.divinepride);
        message.channel.send("Divine-pride api changed!");
        return;
    }
    return message.reply("no api with that name was found.");
}
module.exports = waky;