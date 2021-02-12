const discord = require('discord.js');
//const MIW = require('mars-insight-weather-node');
//const cheerio = require('cheerio');
//const request = require('request');
const fs = require('fs');
const client = new discord.Client();
const token = "Insert Token Here";
const cooldown = new Set();

client.on('ready', function(ready) {
    console.log('\n\n[INTERSTELLAR BOT INITIATED]');
    console.log('--------------------------------');
    client.user.setPresence({
        game: {
            type: "WATCHING",
            name: "the galaxies in the Cosmos..."
        }
    });
});

//load commands
client.commands = new discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err)
    {
        console.log(err);
    }

    let commandFiles = files.filter(f => f.split(".").pop() === "js");

    if (commandFiles.length <= 0)
    {
        console.log('There are no commands to load...');
    }

    console.log(`[Loading ${commandFiles.length} commands!]`);
    commandFiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`[${i + 1} : ${f} loaded!]`);
        client.commands.set(props.help.name, props);
    });
});


client.on('message', function(message) {
    var prefix = '.'; 
    msg = message.content.toLowerCase();

    if (message.author.id === client.user.id)
    {
        return;
    }

    if (message.author.bot)
    {
        return;
    }

    if (message.channel.type === "dm")
    {
        return;
    }

    if (!msg.startsWith(prefix))
    {
        return;
    }
    
    let cmd = client.commands.get(msg.slice(prefix.length));
    if (cmd)
    {
        cmd.run(client, message);
    }
});

client.login(token); // Login using the token
