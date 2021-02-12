const discord = require('discord.js');

module.exports.run = async(client, message) => {
    if (message.member.hasPermission("ADMINISTRATOR"))
    {
        message.channel.send(message.author + " - My ping is: " + Math.round(client.ping) + "ms!");
    }
    else
    {
        return;
    }
};

module.exports.help = {
    name: "ping"
};