const discord = require('discord.js');
const starname = require('starname');

module.exports.run = async(client, message) => {
    let star = starname();

    message.channel.send({embed: {
        title: "\\🌟 **" + star + "** \\🌟",
        color: 0x0325ff,
        thumbnail: {
            url: "https://i.imgur.com/K3h83fp.jpg"
        }
    }});
};

module.exports.help = {
    name: "star"
};