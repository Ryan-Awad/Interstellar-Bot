const discord = require('discord.js');

module.exports.run = async(client, message) => {

    var prefix = ".";
    
    message.channel.send({embed: {
        title: ":question: **Help Menu** :question:",
        color: 0xcc00ff,
        thumbnail: {
            url: client.user.avatarURL
        },
        fields: [{
            name: prefix + "Ping",
            value: "Returns the current ping of the bot!"
        },
        {
            name: prefix + "Iss-loc",
            value: "Displays the current longitude and latitude of the International Space Station! Pretty cool, huh?"
        },
        {
            name: prefix + "Astro",
            value: "Displays the people currently in space RIGHT NOW! Funky!"
        },
        {
            name: prefix + "MarsWeather",
            value: "Displays the current temperature, atmospheric pressure, and wind speeds on the Planet Mars! Neat, don't you think?"
        },
        {
            name: prefix + "OMarsPic",
            value: "Displays a picture taken by the Opportunity Mars Rover on the Planet Mars! Now that's crazy if you ask me!"
        },
        {
            name: prefix + "CMarsPic",
            value: "You thought I only had one commands for Mars Rovers? Think again! This command displays a picture taken by the Curiosity Mars Rover on the Planet Mars! Don't underestimate me, you!"
        },
        {
            name: prefix + "APOD",
            value: "Displays the Astronomy Picture Of The Day provided by NASA! It also comes with a title and a description of the picture! Spooky..."
        },
        {
            name: prefix + "Star",
            value: "Want to get to know more stars? This will give you the name of a random star! Awesome, right?"
        },
        {
            name: prefix + "ProbeInfo (WORK IN PROGRESS)",
            value: "Displays Live Feed of 7 different space probes! You get there distance from the Earth and from the Sun! Beep Boop..."
        }]
    }});
};

module.exports.help = {
    name: "help"
};