const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"], partials: ['MESSAGE', 'CHANNEL', 'REACTION'],});



client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client,Discord);
})

//DiscordbotDB
const mongoose = require('mongoose');

mongoose.connect("", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to database!');
}).catch((err) => {
    console.log(err);
})


client.login('');

process.on("unhandledRejection", err => {
    console.log("Send this to error tracking: " + err.stack);
    console.log("--------------------");
})
