const discord = require('discord.js');
const request = require('request');
const wc = require('which-country');
const CountryCodes = require('country-code-info');

module.exports.run = async(client, message) => {
    request('http://api.open-notify.org/iss-now.json', (error, response, html) => {
        if (!error && response.statusCode == 200)
        {
            let IssJSON = JSON.parse(html.toString());

            let Longitude = parseFloat(IssJSON.iss_position.longitude);
            let Latitude = parseFloat(IssJSON.iss_position.latitude);

            var posUrl = 'https://www.findlatitudeandlongitude.com/?lat=' + Latitude + '&lon=' + Longitude + '&zoom=&map_type=ROADMAP';

            let locationF;

            if (wc([Longitude, Latitude]) == null)
            {
                locationF = "OVER THE OCEANS";
            }
            else
            {
                let location = CountryCodes.findCountry({a3: wc([Longitude, Latitude])});
                locationF = location.name;
            }
            
            message.channel.send({embed: {
                title: ":satellite_orbital: Current Location of The ISS :satellite_orbital:\n\n**CURRENT LOCATION: __" + locationF.toUpperCase() + "__**",
                color: 0x6f08ff,
                url: posUrl,
                image: {
                    url: "https://i.imgur.com/9vc9CFy.png"
                },
                fields: [{
                    name: "Longitude: " + Longitude + "\nLatitude: " + Latitude,
                    value: "Did you know that the Internation Space Station moves 7.66 km/s!"
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
    name: "iss-loc"
};