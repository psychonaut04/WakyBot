const chat = {};
const commands = ["item","api","info"]; //List with all commands, any order
var fs = require('fs');
var _ = require('underscore');
chat.send = [];
chat.receive = [];
chat.test = "test";

chat.wakycommand = function (client, api, servers, sync) {    
    client.on('message', message => {
    if(message.author.bot) return;        
    //Check if it's a message or a command(look for prefix)
    if (chat.receive.includes(message.content)) {
        message.reply(chat.send[chat.receive.indexOf(message.content)]);
    } else {
        var command = message.content.toLowerCase().split(" "); 
        // It returns something like [ 'prefix', 'command' ]
        
        if(typeof command[1] === "undefined") return;   //  We'll return if it's not a know
        if(commands.indexOf(command[1]) === -1) return; //  command for security and performance
        
        var thisserver = _.filter(servers, {guildid: message.channel.guild.id});
        if (typeof thisserver[0] === 'undefined') {
            thisserver[0] = {prefix: '!k'};
        }
        console.log(thisserver[0]);
        if (message.content.startsWith(thisserver[0].prefix)) {
            console.log(command);
            var cmdpath = __dirname + "/../commands/" + command[1] + ".js";
            console.log(cmdpath);
            if (fs.existsSync(cmdpath)) {
                var waky = require(cmdpath);                
                waky.run(command, client, message, thisserver[0], sync);
            } else {
                console.log(`Warning: The listed command ${command[1]} on 'modules/chat.js' doesn't exists!`);
                return;
            }
        }
    }
    return;
    } );   
}

module.exports = chat;