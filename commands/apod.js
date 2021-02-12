const discord = require('discord.js');
const APOD = require('node-apod');
const apod = new APOD('API KEY HERE');

module.exports.run = async(client, message) => {
    apod.get({
        LANG: "en_us"
    }, function(err, data) {
        let image = data.hdurl;
        let title = data.title;
        let desc = data.explanation;
        let copyright = data.copyright;
        let format = data.media_type;

        if (copyright == undefined)
        {
            copyright = "No Copyright";
        }

        if (format == "image")
        {
            message.channel.send({embed: {
                title: ":comet: ***" + title + "*** :comet:",
                color: 0x3301a8,
                image: {
                    url: image
                },
                description: desc,
                footer: {
                    text: "COPYRIGHT: " + copyright
                }
            }});
        }
        else if (format != "image")
        {
            message.channel.send({embed: {
                title: ":comet: ***" + title + "*** :comet:",
                color: 0x3301a8,
                description: desc,
                footer: {
                    text: "COPYRIGHT: " + copyright
                }
            }});
            message.channel.send(":link: " + image);
        } 
    });
};

module.exports.help = {
    name: "apod"
};
