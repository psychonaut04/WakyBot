const Discord = require("discord.js");
const rAthena = require('./../lib/rAthena');
var _ = require('underscore');
var waky = {};

waky.run = function(command, client, message, server, sync) {
    var searchuser;
    var type = 0;
    if (command[1] !== 'info') {
        return 0;
    }
    if (command.length > 4) return message.reply("you can only mention two members.");

    if (command.length > 2) {
        searchuser = message.mentions.users;
        console.log(searchuser);
        type = 1;
        var users = Array.from(searchuser.values()); //[0].id;
    } else {
        searchuser = message.member.id;
    }

    if (type === 1) {
        var index;
        var notfound = "Users not synced: ";
        var someonedidntsync = 0;
        for (index = 0; index < users.length; ++index) {
            var info = _.filter(sync, {
                discorduser: users[index].id
            });
            if (typeof info[0] === 'undefined') {
                notfound = notfound + ", <@" + users[index].id + ">";
                someonedidntsync = 1;
                continue;
            }
            rAthena.getInfo(info[0], message, client);
        }
        if (command.length === 3) notfound = "Member not synced with discord.";
        if (someonedidntsync === 1) message.channel.send(notfound.replace("Users not synced: ,", "Users not synced: "));
    } else {
        console.log(searchuser);
        console.log(sync);
        //if(commands.indexOf(command[1]) === -1) return;
        var info = _.filter(sync, {
            discorduser: searchuser
        });
        console.log(info);
        if (typeof info[0] === 'undefined') return message.channel.send("There's no player synced with this member.");
        rAthena.getInfo(info[0], message, client);
    }
}

module.exports = waky;