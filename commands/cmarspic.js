const discord = require('discord.js');
const mrp = require('mrp-api')('API KEY HERE');

module.exports.run = async(client, message) => {

    let year = Math.floor(Math.random() * 4) + 2015;
    let month = Math.floor(Math.random() * 11) + 1;
    let day = Math.floor(Math.random() * 28) + 1;

    let fullDate = year + '-' + month + '-' + day;
    
    let options = {
        earth_date: fullDate,
        camera: 'FHAZ',
        page: 1
    };

    mrp.curiosity(options, function (err, curiosityPhotos) {
        if (err)
        {
            message.channel.send(message.author + " - Something went wrong... :confused:");
        }

        let imagesNA = curiosityPhotos.photos.map(img => img.img_src).join("|");
        let images = imagesNA.split("|");

        if (images[0] != '')
        {
            message.channel.send({embed: {
                title: "\\📸 **Pictures From Curiosity Mars Rover** \\📸",
                color: 0xc1440e,
                url: images[0],
                description: "Date when photo was taken: " + fullDate,
                image: {
                    url: images[0]
                }
            }});
        }
        else
        {
            message.channel.send(message.author + ' - Oops! The Curiosity Rover did not take any photos on the date I picked! Try the command again to get another date! :confused:');
        }
    }); 
};

module.exports.help = {
    name: "cmarspic"
}
