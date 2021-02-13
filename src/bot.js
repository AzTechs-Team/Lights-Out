'use strict'
require('dotenv').config();
const colors = require('colors');
const axios = require('axios');
const { Client, ReactionCollector } = require('discord.js');

const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});

const PREFIX = "##";

// Includes
const hello = require('./commands/hello');
const help = require('./commands/help');
const LightsOn = require('./commands/lightsOn');

client.on('ready', () => {
    console.log(`${client.user.username} has logged in!`);
    const servers = client.guilds.cache.size;
    const users = client.users.cache.size;
    
    console.log(`Bot is now online and serving in ${servers} Server and ${users} users`);
    client.user.setActivity(`Cringe Valley`, {
        type: 'PLAYING'
    });
})

client.on('message', (message) => {
    if(message.author.bot === true) return;
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        .trim().
        substring(PREFIX.length)
        .split(/\s+/);
    switch(CMD_NAME){
        case "hello" : {
            hello(message, client);
        }
        break;
        case "lightson": {
            console.log('here')
            message.author.send("Do you want to get matched up?\nLet's start by setting up your profile!!");
            var lightsOnClass = new LightsOn(client,message.author,message.author.id);
            
            // LightsOn(message, client);
            
            lightsOnClass.questions()
        }
        break;
        case "help" : {
            help(message);
        }
        break;
    }
}})

client.login(process.env.DJSTOKEN); 