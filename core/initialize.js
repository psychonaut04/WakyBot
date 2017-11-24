/**
 * Initialize discord client and mods.
 */

'use strict';

function syncDb(code) {
        if (code === 1) {
            console.log("/nWe got an uncaught exception :c/n Anyway, i'll sync the DB before the crash!"); 
        } else {
           console.log("/nI will sync the database for you before closing!"); 
        }
        process.exit();
}

module.exports = {
    initialize: function (client, con, servers, api, sync) {
        var chatmod = require('./../modules/chat');
        var wakyListeners = require('./../modules/listeners');
        
        /*  Remember in console to sync db if the terminal is closed
        *  or anything like that.
        */
        /*
        process.on('exit', function () { syncDb() });   
        process.on('uncaughtException', function () { syncDb(1) });
        process.on('SIGUSR1', function () { syncDb() });
        process.on('SIGUSR2', function () { syncDb() });
        process.on('SIGINT', function () { syncDb() });        
        */
        //Message to show us that Discord client is ready.
        client.on('ready', () => {
        console.log('All systems working in Waky HQ!');    
        client.user.setGame("testtttttt");    
        });
    
        //Modules
        chatmod.wakycommand(client, api, servers, sync);
        wakyListeners.wakyJoin(client, con);
        
  }
};


