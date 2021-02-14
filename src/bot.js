'use strict'
require('dotenv').config();
const colors = require('colors');
const axios = require('axios');
const { Client, MessageEmbed, ReactionCollector } = require('discord.js');

const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});

const PREFIX = "#";

// Includes
const hello = require('./commands/hello');
const help = require('./commands/help');
const LightsOn = require('./commands/lightsOn');
const getMatches = require('../DB/getMatches');
const getProfile = require('../DB/getProfile');
const thirdWheeling = require('./commands/thirdWheeling');
//const getMatches = require('./')    

client.on('ready', () => {
    console.log(`${client.user.username} has logged in!`);
    const servers = client.guilds.cache.size;
    const users = client.users.cache.size;

    console.log(`Bot is now online and serving in ${servers} Server and ${users} users`);
    client.user.setActivity(`Cringe Valley`, {
        type: 'PLAYING'
    });
})

client.on('message', async (message) => {
    let number = 1;
    if (message.author.bot === true) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim().
            substring(PREFIX.length)
            .split(/\s+/);
        switch (CMD_NAME) {
            case "hello": {
                hello(message, client);
            }
                break;
            case "lightson": {
                message.author.send("Do you want to get matched up?\nWant to start setting up your profile?(Yes/No)");
                var lightsOnClass = new LightsOn(client, message.author, message.author.id);

                lightsOnClass.questions();

            }
                break;
            case "help": {
                help(message);
            }
                break;
            case "matches": {
                message.author.send('Give us a second to look for similar profiles!')
                getMatches(message.author.id, message)


            }
                break;
            case "profile": {
                getProfile(message)
            }
                // break;
                break;
            case "dele": {
                message.channel.delete();
            }
                break;
            case "embeds": {
                let info = {
                    name: 'Nimit',
                    userdiscordid: 'Nimit#4979',
                    age: 19,
                    gender: 'MALE',
                    preferences: 'FEMALE',
                    agerange: '19',
                    bio: 'I\'m alone on valentines',
                    relationship: '',
                    song: 0,
                    pizza: 0,
                    superhero: 0,
                    food: 0,
                    language: 0,
                    philosophy: 0,
                    software: 0
                };
                const messageEmbed = new MessageEmbed()
                    .setTitle('Profiles')
                    .addField('Name', `${info.name}`)
                    .addField('bio', `${info.bio}`)
                    .addField('Age', `${info.age}`)
                    .addField('Gender', `${info.gender}`)
                    .setImage('https://cdn.discordapp.com/attachments/809889014995484712/810068490916200508/cbbe702247a3f58cc9a4dc25c6f7c2c1.jpg')
                message.channel.send(messageEmbed)
                    .then(message_ => {
                        console.log(message_.id);
                        client.on('messageReactionAdd', function reacto(reaction, user) {
                            const { name } = reaction.emoji;
                            const member = reaction.message.guild.members.cache.get(user.id);
                            console.log(reaction.users);
                            if ('❤️')
                                if ('❤️' || message_.reactions) {
                                    client.removeListener('messageReactionAdd', reacto);
                                    console.log('Event Listener for Message Reaction Deleted')
                                    message.channel.send('your like was saved');
                                }
                        })
                    })
            }
                break;
        }
    }
})

client.on('channelCreate', x => {
    console.log('hekfksajdflk;asdjjlkfjldsakjflk')
    thirdWheeling(client)
})

client.login(process.env.DJSTOKEN); 