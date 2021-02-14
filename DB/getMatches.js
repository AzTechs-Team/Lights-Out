const { Client, MessageEmbed } = require('discord.js');
var pg = require("pg");
var async = require("async");
const config = require('./config');
// const storeMatched = require('./storeMatched');

// lid = '547152349085302829';
let userdata;
const getMatches = (id, message) => {
    var pool = new pg.Pool(config);

    let data = pool.connect(function (err, client, done) {
        var finish = function () {
            done();
        };
        console.log('connected');
        if (err) {
            console.error("Error connecting to the CockroachDB", err);
            finish();
        }

        async.waterfall(
            [function (next) {
                var query = `SELECT * FROM users WHERE userdiscordid=${id};`;
                client.query(query, next);
            },
            function (results, next) {

                userdata = results.rows[0];
                //console.log(results.rows[0]);
                const rangeLower = userdata.age - userdata.agerange;
                const rangeUpper = userdata.age + userdata.agerange;
                var query = `SELECT * FROM users WHERE gender='${userdata.preferences}' AND age>=${rangeLower} AND age<=${rangeUpper};`;
                client.query(query, next);
            },
            ],
            async function (err, results) {
                if (err) {
                    console.error("Error Inserting and Printing demo table: ", err);
                    finish();
                }
                let count = []
                // console.log(results.rows.length);
                results.rows.forEach(person => {
                    console.log(person)
                    let x = 0;
                    if (person.relationship == userdata.relationship)
                        x += 1;
                    if (person.song == userdata.song)
                        x += 1;
                    if (person.pizza == userdata.pizza)
                        x += 1;
                    if (person.superhero == userdata.superhero)
                        x += 1;
                    if (person.food == userdata.food)
                        x += 1;
                    if (person.language == userdata.language)
                        x += 1;
                    if (person.philosophy == userdata.philosophy)
                        x += 1;
                    if (person.software == userdata.software)
                        x += 1;
                    // console.log(count)
                    count.push([person, x])
                })
                count.sort((a, b) => a[1] - b[1])
                count = count.slice(0, 3);
                count = count.reverse();
                // console.log(count)
                await message.author.send('You share similar interests with the following people.')
                for (let i = 0; i < count.length; i++) {
                    const messageEmbed = new MessageEmbed()
                        .setTitle('Matched profile')
                        .addField('Name', `${count[i][0].name}`)
                        .addField('bio', `${count[i][0].bio}`)
                        .addField('Age', `${count[i][0].age}`)
                        .addField('Gender', `${count[i][0].gender}`)
                        .setImage('https://cdn.discordapp.com/attachments/809889014995484712/810068490916200508/cbbe702247a3f58cc9a4dc25c6f7c2c1.jpg')
                        .setFooter(`Do you accept want to match?\nReact with ❤️ to accept or 💔 to see a diffrent match!`)
                    let bot_message = await message.author.send(messageEmbed)
                    // setTimeout(() => {

                    // }, timeout);
                    // let bot_message = await message.author.send()
                    bot_message.react('❤️');
                    const filter = (reaction, user) => (reaction.emoji.name === '❤️' || reaction.emoji.name === '💔') && user.id === message.author.id;
                    let collector = await bot_message.createReactionCollector(filter, { time: 30000 })
                    collector.on('collect', async (r) => {
                        console.log(`Collected ${r.emoji.name}`)
                        if (r.emoji.name == '❤️') {
                            try {
                                console.log(count[i][0].id)
                                // await storeMatched(message.author.id,count[i][0].userdiscordid)
                                client.query(`UPDATE users SET matchedid='${count[i][0].userdiscordid}' WHERE userdiscordid=${message.author.id};`)
                                    .then(data => {
                                        // console.log(data)
                                        client.query(`SELECT * FROM users WHERE matchedid=${message.author.id} AND userdiscordid=${count[i][0].userdiscordid}`)
                                            .then(data => {
                                                console.log(data)
                                                if (data.rows.length > 0) {
                                                    data.rows.forEach(element => {
                                                        if (element.matchedid) {
                                                            let user1 = message.author.id;
                                                            console.log(user1)
                                                            let user2 = count[i][0].userdiscordid;
                                                            const server_ = message.client.guilds.fetch('744874959905751091')
                                                                .then((server) => {
                                                                    server.channels.create(`Valentine Cafe!`, { reason: 'They needed a room!', type: 'text', topic: 'Date' })
                                                                        .then(res => {
                                                                            let role_;
                                                                            server.roles.create({
                                                                                data: {
                                                                                    name: `Super Cute`,
                                                                                    color: 'RANDOM',
                                                                                },
                                                                                reason: 'We need a role for this love birds',
                                                                            })
                                                                                .then(role_data => {
                                                                                    role_ = role_data;
                                                                                    try {
                                                                                        user1 = server.members.cache.get(user1);
                                                                                        user2 = server.members.cache.get(user2);
                                                                                        user1.roles.add(role_data);
                                                                                        user2.roles.add(role_data);
                                                                                        console.log('uesr11111', user1.roles)
                                                                                        res.send(`${role_data}`);
                                                                                        // let everyone = server.roles.fetch('744874959905751091');
                                                                                        console.log(everyone);
                                                                                        // res.overwritePermissions(everyone, { 'SEND_MESSAGES': false })
                                                                                    } catch (err) { console.log(err); }
                                                                                    //res.lockPermissions()
                                                                                    // res.permissionsFor(role_data)
                                                                                    //     .then(perm => {
                                                                                    //     console.log(perm.FLAGS);
                                                                                    // });
                                                                                    console.log('done');
                                                                                })
                                                                                .catch(console.error);

                                                                            //res.permissionsFor(role_);
                                                                            // number = number + 1;
                                                                        })
                                                                        .catch(console.error);
                                                                })
                                                        }
                                                    });
                                                } else {
                                                    console.log('no mathcs yet')
                                                }
                                            }).catch(err => console.log(err));
                                    }).catch(err => console.log(err));

                                // console.log(data_)
                            } catch (error) {
                                console.log(error)
                            }
                            // console.log(data_)

                        } else {
                            console.log('lol')
                        }
                    });
                    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                }
                console.log('break after')
                // await message.author.send('To get matched, react with heart emoji. If that person also likes your profile, you will get matched!!!')

            }

        );
        finish();
    });
    return data;
}

module.exports = getMatches;
