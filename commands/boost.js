const Discord = require('discord.js');
const recipeModel = require('../models/recipeSchema');
const checksModel = require('../models/checksSchema')

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth()+1).padStart(2, '0')
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

module.exports = {
    name: 'boost',
    aliases: [],
    permissions: [],
    cooldown: 5,
    description: 'Boost a recipe onto the leaderboard.',
    async execute(client, message, args, Discord, profileData,workoutData){


        if(args == "")
        {
            message.channel.send("You did not enter anything.");
            return;
        }

        let checker = await checksModel.findOne({main: 'boosts'});

        // checks if the user has already boosted today
        if(checker.alreadyboost.includes(message.author.id))
        {
            message.channel.send("You have already boosted.");
            return;
        }

        let input = args.join(' ');

        let recipecheck = await recipeModel.find({date: today});

        // Checks if the user enter a valid code to boost the recipe
        let found = false;

        for(let x = 0; x < recipecheck.length; x++)
        {
            if(recipecheck[x].uniqueID == input)
            {
                found = true;
                break;
            }
        }

        if(found == false)
        {
            message.channel.send("That is not a valid code.");
            return;
        }

        // adds the user's boost to the database
        const response = await recipeModel.findOneAndUpdate(
            {
                date: today,
                uniqueID: input,
            },
            {
                $inc: {
                boostcount: 1,
                },
            }
            );

        message.channel.send(`Successfully boosted the post.`);
        
        // adds user to already boost database, making them unable to boost again
        const response2 = await checksModel.findOneAndUpdate(
            {
                main: 'boosts',
            },
            {
                $push: {
                alreadyboost: message.author.id,
                },
            }
            );

        },
}
