'use strict';
var mysql = require('mysql');
exports.servers = [];
exports.sync = [];
/** Create the database if the bot doesn't have one. */
exports.dbCheck = function(con, database) {
    var failure = 0;
    var sql = `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${database}';`;
    con.query(sql, function(err, result) {
        if (err) {
            console.log("No database found.");
            return new Error(err);
        }
    });

    console.log('WakyBot database found.');
    return true;
}

exports.dbCreate = function(con, database) {
    var sql = `CREATE DATABASE ${database}; CREATE TABLE servers (id int NOT NULL AUTO_INCREMENT, prefix VARCHAR(15), language VARCHAR(6), guildid VARCHAR(17) NOT NULL);`;
    con.query(sql, function(err, result) {
        if (err) {
            console.log("WakyBot can't create the database.");
            return new Error(err);
        }
        console.log('WakyBot database was not found but we created it.');
        return true;
    });
}

/** Load all servers when bot starts */
exports.dbgetServers = function(con) {
    console.log("Loading servers...");
    var sql = `SELECT * FROM servers`;
    con.query(sql, function(err, allguilds) {
        if (err) {
            return new Error(err);
        }
        let length = allguilds.length,
            seen = new Set();

        outer:
            for (let index = 0; index < length; index++) {
                let value = allguilds[index];

                if (seen.has(value)) continue outer;
                seen.add(value);
                exports.servers.push(value);
            }
    });
}

/** Load all characters with discord sync from db */
exports.discordSync = function(con) {
    console.log("Sync Discord with players...");
    var sql = `SELECT * FROM sync;`;
    con.query(sql, function(err, sync) {
        if (err) {
            return new Error(err);
        }
        let length = sync.length,
            seen = new Set();

        outer:
            for (let index = 0; index < length; index++) {
                let value = sync[index];

                if (seen.has(value)) continue outer;
                seen.add(value);
                exports.sync.push(value);
                console.log(value);
            }

        console.log(exports.sync);
        console.log(exports.sync[0].account_id);

    });
}

/** Database commands called when the bot join a server. The less the better. */
exports.dbjoinServer = function(con, guildId) {
    var sql = `INSERT INTO servers (prefix, language, guildid) VALUES ('!k', 'en', '${guildId}');`;
    con.query(sql, function(err, result) {

        if (err) {
            console.log(err);
            return new Error(err);
        }
        //We will put it in our table, so we can already use it.
        var newguild = JSON.parse(`{"ID":${result.insertId},"prefix":"!k","language":"en","guildid":"${guildId}"};`);
        exports.servers.push(newguild);
        console.log(exports.servers);
        console.log(exports.servers[1].prefix);
        console.log(`Joined the guild ${guildId}, and it's on database now.`);
    });

}


/*con.connect(function(err) {
        if (err) throw err;
        con.query(`SELECT * FROM servers WHERE guildid = '${guildId}'`, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            callback('Added : ' + post.keyword);
        });
    });*/