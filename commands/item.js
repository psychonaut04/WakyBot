const Discord = require("discord.js");
const request = require('request');
var waky = {};
var lan = 'en-US';

function fixDescr(description) {
    //I guess that divinepride put color codes or something in the json, so we need to remove them.
    var description = description.replace('^FFFFFF_^000000', "").replace("^008000", '').replace("^000088", '').replace("^000000", '').replace("^808080", '').replace("^FFFFFF_", '').replace("^0000", '').replace("^008000", '').replace("00", '').replace("^000000", '').replace("^777777", '').replace("^000000", '');
    description.match(/.{2}/g).join("\n");
    return description;
}

waky.run = function(command, client, message, server, language) {
    if (command[1] !== 'item') {
        return 0;
    }
    if (command.length !== 3) {
        return message.reply("please tell me the item id!");
    }
    var api = server.divinepride;
    if (api === "none") {
        return message.reply("this server doesn't have a divine-pride api.");
    }

    var dropped = "Can be dropped by player:";
    var store = "Can be placed in storage:";
    var cart = "Can be placed in Cart:";

    if (language === 'br') lan = 'pt-Br';
    var options = {
        url: 'https://www.divine-pride.net/api/database/Item/' + command[2] + '?apiKey=' + api,
        headers: {
            'Accept-Language': lan
        }
    };
    console.log(options);

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);
            const embed = new Discord.RichEmbed()
                .setTitle(body.name)
                .setDescription("\n" + fixDescr(body.description))
                .setFooter("For more info click on the picture or title")
                .setURL("https://www.divine-pride.net/img/items/item/iRO/" + body.id)
                .setColor(14695039)
                .setAuthor(client.user.tag, client.user.avatarURL)
                .setTimestamp()
                .setImage("https://www.divine-pride.net/img/items/collection/iRO/" + body.id)
                .setThumbnail("https://www.divine-pride.net/img/items/item/iRO/" + body.id)
                .addField("Info", "Price: " + body.price + "z,  can trade: " + (body.itemMoveInfo).trade +
                    ", drop: " + body.itemMoveInfo.drop +
                    ", store: " + body.itemMoveInfo.store +
                    ", place in cart: " + body.itemMoveInfo.cart +
                    ", sell: " + body.itemMoveInfo.sell +
                    ", mail: " + body.itemMoveInfo.mail +
                    ", auction: " + body.itemMoveInfo.auction +
                    ", put in gstorage: " + body.itemMoveInfo.guildStore, true)
            message.channel.send({
                embed
            });
        } else {
            return message.reply("it doesn't looks like a valid item or this server got a invalid api!");
        }
    }
    request(options, callback);
}


module.exports = waky;