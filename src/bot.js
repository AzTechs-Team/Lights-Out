'use strict'
require('dotenv').config();
const colors = require('colors');
const axios = require('axios');
const { Client, ReactionCollector, MessageEmbed } = require('discord.js');

const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});

const PREFIX = "#";

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
        const [CMD_NAME, ...args] = message.content // = hp!spells sectumsempra @nimit
        .trim().
        substring(PREFIX.length)
        .split(/\s+/);
    switch(CMD_NAME){
        case "hello" : {
            message.channel.send('Hello there!');
        }
        break;
    }
}})

client.login(process.env.DJSTOKEN); 