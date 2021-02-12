const discord = require('discord.js');
const MIW = require('mars-insight-weather-node');

module.exports.run = async(client, message) => {
    let marsWeather = new MIW();

    marsWeather.request(function(err, response) {
        try {
            let TemperatureC = Math.round(parseFloat(this.getLatestSol().AT.av * 10)) / 10;
            let TemperatureF = Math.round((TemperatureC * 9 / 5 + 32) * 10) / 10;
            let Pressure = Math.round(parseFloat(this.getLatestSol().PRE.av * 100)) / 100;
            let WindSpeedMS = Math.round(parseFloat(this.getLatestSol().HWS.av * 10)) / 10;
            let WindSpeechKMH = Math.round((WindSpeedMS * 3.6) * 10) / 10;
        
        

            message.channel.send({embed: {
                color: 0xc1440e,
                title: "\\🌌 Weather On MARS! \\🌌",
                image : {
                    url: "https://i.imgur.com/Yos7f0E.png"
                },
                fields: [{
                    name: "Temperature: " + TemperatureC + " °C",
                    value: "Converted to Fahrenheit: " + TemperatureF + " °F"
                },
                {
                    name: "Pressure: " + Pressure + " Pa",
                    value: "The average pressure on Earth is 101325 Pa !"
                },
                {
                    name: "Wind Speed: " + WindSpeedMS + " M/S",
                    value: "Converted to kilometres per hour: " + WindSpeechKMH + " Km/h"
                }]
            }});
        }
        catch (error)
        {
            message.channel.send(message.author + " - Seems like NASA didn't upload data from Mars today... Try again later! :confused:");
        }
    });

};

module.exports.help = {
    name: "marsweather"
};