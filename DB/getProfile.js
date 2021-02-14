const { MessageEmbed } = require('discord.js');
var pg = require("pg");
var async = require("async");
const config = require('./config');

const getProfile = (message) => {
    tempMessage = message;
    var pool = new pg.Pool(config);

    let data = pool.connect(function (err, client, done) {
        var finishQuery = function () {
            done();
        };
        console.log('connected');
        if (err) {
            console.error("Error connecting to the CockroachDB", err);
            finishQuery();
        }

        async.waterfall(
            [function (next) {
                var query = `SELECT * FROM users WHERE userdiscordid=${message.author.id};`;
                client.query(query, next);
                
            },
            ],
            async function (err, results) {
                if (err) {
                    console.error("Error Inserting and Printing demo table: ", err);
                    finishQuery();
                }
                console.log(results.rows[0])
                const messageEmbed = new MessageEmbed()
                .setTitle('Your Profile')
                .addField('Name', `${results.rows[0].name}`)
                    .addField('bio', `${results.rows[0].bio}`)
                    .addField('Age', `${results.rows[0].age}`)
                    .addField('Gender', `${results.rows[0].gender}`)
                .setImage('https://cdn.discordapp.com/attachments/809889014995484712/810068490916200508/cbbe702247a3f58cc9a4dc25c6f7c2c1.jpg')
                await message.author.send(messageEmbed)
                // finishQuery();
            }
        );
    });
    return data;
}

module.exports = getProfile;
