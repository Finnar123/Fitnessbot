const Discord = require('discord.js');
const checksModel = require('../models/checksSchema');


module.exports = {
    name: 'blacklist',
    aliases: [],
    permissions: [],
    cooldown: 5,
    description: 'Blacklists a user.',
    async execute(client, message, args, Discord, profileData,workoutData){

        if(message.author.id != '264141550525612032')
        {
            return;
        }

        let input = args.join(' ');

        

        const response = await checksModel.findOneAndUpdate(
            {
                main: 'blacklistrecipes',
            },
            {
                $push: {
                recipeblacklist: input,
                },
            }
            );
            message.channel.send(`The user has been added to the recipe blacklist.`);
        },
}