const Discord = require('discord.js');
const dietModel = require('../models/dietSchema')

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth()+1).padStart(2, '0')
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

module.exports = {
    name: 'remove',
    aliases: [],
    permissions: [],
    cooldown: 5,
    description: 'Removes an element to your diet.',
    async execute(client, message, args, Discord, profileData,workoutData){

        if(args == "")
        {
            message.channel.send("You did not enter anything.");
            return;
        }
        let input = args.join(' ');

        if(!(profileData.meals.includes(input)))
        {
            message.channel.send("That is not in your diet.");
            return;
        }

        const response = await dietModel.findOneAndUpdate(
            {
                userID: message.author.id,
                date: today,
            },
            {
                $pull: {
                meals: input,
                },
            }
            ).then(message.channel.send(`Successfully removed from your food diary.`));
        },
}
