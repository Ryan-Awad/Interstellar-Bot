const discord = require('discord.js');
const cheerio = require('cheerio');
const request = require('request');

module.exports.run = async(client, message) => {
    message.channel.send(message.author + " - Work in progress...");
    return; // remove this

    var probeEarthList = [];
    var probeSunList = [];
    var GetProbeInfo = async function(probeUrl)
    {  
        request(probeUrl, (error, response, html) => {
            if (!error && response.statusCode == 200)
            {
                let $ = cheerio.load(html);
                let sDis = $('#dissun').text().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                let eDis = $('#disearth').text().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                probeEarthList.push(eDis + " Km");
                probeSunList.push(sDis + " Km");
            }
            else 
            {
                probeEarthList.push("No Response, try again");
                probeSunList.push("No Response, try again");
            }
        });
    }

    message.channel.send(message.author + " - Please wait while I am contacting the Satellites...");

    async function GetData(callback) {
        probeList = ["voyager1", "voyager2", "newhorizons", "roadster", "pioneer10", "pioneer11", "parkersolarprobe"];
        for(var i = 0; i < probeList.length; i++)
        {
            await GetProbeInfo('https://theskylive.com/' + probeList[i] + '-tracker');
            console.log("Request Made");
        }  
        await callback(); 
    }

    GetData(function() {
        message.channel.send({embed: {
            color: 0x3c77ab,
            title: ":satellite_orbital: ***Space Probe Live Feed*** :satellite:",
            fields: [{
                name: "Voyager 1",
                value: "Distance from the Earth: " + probeEarthList[0] + "\nDistance from the Sun: " + probeSunList[0]
            },
            {
                name: "Voyager 2",
                value: "Distance from the Earth: " + probeEarthList[1] + "\nDistance from the Sun: " + probeSunList[1]
            },
            {
                name: "New Horizons",
                value: "Distance from the Earth: " + probeEarthList[2] + "\nDistance from the Sun: " + probeSunList[2]
            },
            {
                name: "SpaceX Roadster (Starman)",
                value: "Distance from the Earth: " + probeEarthList[3] + "\nDistance from the Sun: " + probeSunList[3]
            },
            {
                name: "Pioneer 10",
                value: "Distance from the Earth: " + probeEarthList[4] + "\nDistance from the Sun: " + probeSunList[4]
            },
            {
                name: "Pioneer 11",
                value: "Distance from the Earth: " + probeEarthList[5] + "\nDistance from the Sun: " + probeSunList[5]
            },
            {
                name: "Parker Solar Probe",
                value: "Distance from the Earth: " + probeEarthList[6] + "\nDistance from the Sun: " + probeSunList[6]
            }]
        }});
    });
};

module.exports.help = {
    name: "probeinfo"
};