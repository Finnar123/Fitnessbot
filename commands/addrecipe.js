const Discord = require('discord.js');
const recipeModel = require('../models/recipeSchema');
const checksModel = require('../models/checksSchema')


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth()+1).padStart(2, '0')
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

module.exports = {
    name: 'addrecipe',
    aliases: ['addr'],
    permissions: [],
    cooldown: 5,
    description: 'Adds a recipe.',
    async execute(client, message, args, Discord, profileData,workoutData){

        let checker = await checksModel.findOne({main: 'blacklistrecipes'});

        if(checker.recipeblacklist.includes(message.author.id))
        {
            return;
        }

        const randomNumber = Math.floor(Math.random() * 10000000);

        if(args == "")
        {
            message.channel.send("You did not enter anything.");
            return;
        }
        let input = args.join(' ');

        let recipeprofile = await recipeModel.create({
            recipe: input,
            date: today,
            uniqueID: randomNumber,
            recipeauthor: message.author.id,
        })
        
        recipeprofile.save();

        message.channel.send("You have added your recipe to the recipe list!")
        },
}
