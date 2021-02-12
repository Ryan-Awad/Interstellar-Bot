const discord = require('discord.js');
const request = require('request');

module.exports.run = async(client, message) => {
    request('http://api.open-notify.org/astros.json', (error, response, html) => {
        
        if (!error && response.statusCode == 200)
        {
            let astroJSON = JSON.parse(html);

            let astroNum = astroJSON.number;
            let astroNames = astroJSON.people.map(person => person.name).join("\n");

            message.channel.send({embed: {
                title: ":rocket: Current Astronauts In Space :rocket:",
                color: 0x6f08ff,
                image: {
                    url: "https://i.imgur.com/9vc9CFy.png"
                },
                fields: [{
                    name: "Number of people in space: " + astroNum + "\n\n" + "Names of the astronauts:\n",
                    value: astroNames
                }]
            }});
        }
        else
        {
            message.channel.send(message.author + " - Something went wrong... :confused:");
        }
    });
};

module.exports.help = {
    name: "astro"
};