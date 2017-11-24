var wakyListeners = {};
var database = require('./../lib/core/database');

wakyListeners.wakyJoin = function(client, con) {
    client.on("guildCreate", guild => {
        database.dbjoinServer(con, guild.id)
        console.log(`Someone invited me to ${guild.name}. [members: ${guild.memberCount}]`)
        return;
    });
}

wakyListeners.wakyLeave = function(client, con) {
    client.on("guildDelete", guild => {
        // We will remove from DB, and it will be 'dead' in our table.
        console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    });
}

module.exports = wakyListeners;