const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"], partials: ['MESSAGE', 'CHANNEL', 'REACTION'],});



client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client,Discord);
})

//DiscordbotDB
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ken123:PkgidVCHwwqtWwv7@cluster0.dlxep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to database!');
}).catch((err) => {
    console.log(err);
})


client.login('OTAwODA3NzYxMjU5MDM2Nzky.YXGsmg.q8Way4M2jSfOdv3frUruOyEN0gY');





// const prefix = '.';

// const fs = require('fs');

// const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

// for(const file of commandFiles){
//     const command = require('./commands/' + file);

//     client.commands.set(command.name, command);
// }



// class Stats {
//     constructor(stamina, attack, defense, speed, name){
//         this.stamina = stamina;
//         this.attack = attack;
//         this.defense = defense;
//         this.speed = speed
//         this.name = name
//     }
//     damage(theattack){
//         // the attack is 5th of the damage of the cards
//         theattack = theattack / 5;
//         // defense divided by 2 minus the attack 
//         theattack = theattack - (this.defense / 20);

//         if (theattack <= 0)
//         {
//             theattack = 1;
//         }

//         return theattack;
//     }
//     healme(){
//         return this.stamina = this.stamina + this.heal;
//     }
// }

// client.on("ready", () => {
//     console.log("Logged in as " + client.user.tag + "!");
// });


// function getRandomInt(max){
//     return Math.floor(Math.random() * max);
// }

// support = new Stats(138, 65, 130, 20, "Herald");

// client.on('messageCreate', async message => {
//     if(!message.content.startsWith(prefix) || message.author.bot) return;

//     const args = message.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase();

//     if(command === 'ping'){
//         client.commands.get('ping').execute(message, args);
//     }else if(command === 'embed'){
//         client.commands.get('embed').execute(message, args);
//     }else if(command === 'kick'){
//         client.commands.get('kick').execute(message, args);
//     }else if(command === 'stats')
//     {
//         const embed = new Discord.MessageEmbed()
//         .setTitle('Player stats: ')
//         .addFields(
//             {name: 'Name: ', value: support.name.toString()},
//             {name: 'Health: ', value: support.stamina.toString()},
//             {name: 'Attack: ', value: support.attack.toString()},
//             {name: 'Defense: ', value: support.defense.toString()},
//             {name: 'Speed: ', value: support.speed.toString()},
//     );
    
//         message.channel.send({embeds: [embed] });
//     }else if(command === 'gold')
//     {
//         client.command.get('gold').execute(message,args);
//     }else if(command === 'battle_all')
//     {
//         client.command.get('battle all').execute(message,args);
//     }else if(command === 'start')
//     {
//         client.commands.get('start').execute(message,args);
//     }
    
// });

process.on("unhandledRejection", err => {
    console.log("Send this to error tracking: " + err.stack);
    console.log("--------------------");
})







// remember to use a \ before emoji to get the copy paste 
// explain \💩 will get u 💩

// client.on("messageCreate", msg => {
//     if (msg.content === "ping") {
//         msg.reply('pong');
//     }
// });

// client.once('ready', () => {
//     console.log('Ready!');
// });


// const {Client, Intents}= require("discord.js");
// const client = new Client({ intents: [Intents.FLAGS.GUILDS]});