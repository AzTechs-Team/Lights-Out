const { MessageEmbed } = require('discord.js');

module.exports = (message) => {
    const helpEmbed = new MessageEmbed()
        .addField('Name', 'Nimit')
    message.channel.send(helpEmbed);
};
