/*
*   Functions related to ro/rAthena
*/
'use strict';
const mysql = require('mysql');
const core = require('./../core/core');
const Discord = require("discord.js");
/** Get job name using the id */ 
function getJob (jobid) {
    var jobs;
    if (jobid < 4000) {
        jobs = ["novice", "swordman", "magician", "archer", "acolyte", "merchant", "thief", "knight", "priest", "wizard", "blacksmith", "hunter", "assassin", "knight"
              , "crusader", "monk", "sage", "rogue", "alchemist", "bard", "dancer", "crusader", "wedding", "super novice", "gunslinger", "ninja"];
        return jobs[jobid];
        } else {
        jobs = ["novice high", "magician high", "archer high", "archer high", "acolyte high", "merchant high", "thief high", "lord knight", "high priest", "high wizard", "whitesmith", "sniper", "assassin cross", "lord knight", "paladin", "champion", "professor", "stalker", "creator", "clown", "gypsy", "paladin", "baby novice", "baby swordman", "baby magician", "baby archer", "baby acolyte", "baby merchant", "baby thief", "baby knight", "baby priest", "baby wizard", "baby blacksmith", "baby hunter", "baby assassin", "baby knight", "baby crusader", "baby monk", "baby sage", "baby rogue", "baby alchemist", "baby bard", "baby dancer", "baby crusader", "baby super novice", "taekwon", "star gladiator", "star gladiator(union)", "soul linker", "gangsi", "death knight", "dark collector", "rune knight", "warlock", "ranger", "arch bishop", "mechanic", "guillotine cross", "rune knight", "warlock", "ranger", "arch bishop", "mechanic", "guillotine cross", "royal guard", "sorcerer", "minstrel", "wanderer", "sura", "genetic", "shadow chaser", "royal guard", "sorcerer", "minstrel", "wanderer", "sura", "genetic", "shadow chaser", "rune knight", "rune knight", "rune knight", "rune knight", "ranger", "ranger", "mechanic", "mechanic",  "baby rune knight", "baby warlock", "baby ranger", "baby arch bishop", "baby mechanic", "baby guillotine cross", "baby royal guard", "baby sorcerer", "baby minstrel", "baby wanderer", "baby sura", "baby genetic", "baby shadow chaser", "baby rune knight", "baby rune knight", "expanded super novice", "baby expanded super novice", "kagerou", "oboro", "rebellion", "summoner", "baby summoner", "baby ninja", "baby kagerou", "baby oboro", "baby taekwon", "baby star gladiator", "baby soul linker", "baby gunslinger", "baby rebellion", "baby star gladiator(union)"]
        return jobs[(jobid - 4000)];
    }
}

/** Get info from a character */ 
exports.getInfo = function (user, message, client) {
    var conn = core.con;
    console.log(user);
    console.log(user.account_id);
    var acid = user.account_id;
    var charsql = 'SELECT * FROM rathena.char WHERE account_id = ? AND char_num = ?;';
    conn.query(charsql, [acid, user.mainchar], function (err, char) {
    if (err) {
        console.log(err);
        return new Error(err);
    }
    console.log(char);
    if (char.length === 0) return message.channel.send("<@" + user.discorduser + "> have a wrong main char set.");
    console.log(char[0].name);
    var married = "Single";
    var status = "This player is offline :red_circle:";
    var sex = ":grey_question:";
    if (char[0].sex === "M") sex = ":man:";
    if (char[0].sex === "F") sex = ":woman:";
    if (char[0].online > 0) status = "This player is online right now :eight_spoked_asterisk:";
    if (char[0].partner_id > 0) married = "Married with someone :ring:";
    const embed = new Discord.RichEmbed()
        .setTitle("Main Character: " + char[0].name)
        .setDescription("\n:first_place: **Level:** " + char[0].base_level + "/" + char[0].job_level
                       + "\n:black_joker: **Job:** " + getJob(char[0].class)
                       + "\n:money_with_wings: **Zeny:** " + char[0].zeny
                       + "\n:heartpulse: **Relationship:** " + married
                       + "\n:map: **Last map:** " + char[0].last_map
                       + "\n:black_small_square: **Sex:** " + sex)
        .setColor(14695039)
        .setAuthor(client.user.tag, client.user.avatarURL)                
        //.setImage("job picture")
        //.setThumbnail("chracter head preview(hat+hair)")         
        .addField("Status", status, true)
    return message.channel.send(embed);

    });    
}
