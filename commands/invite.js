const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    aliases: [],
    permissions: [],
    cooldown: 10,
    description: 'A link to invite the bot to their server.',
    async execute(client, message, args, Discord, profileData,workoutData){

        message.channel.send("https://discord.com/api/oauth2/authorize?client_id=900807761259036792&permissions=0&scope=bot");

        
        }
}
