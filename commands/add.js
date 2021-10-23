const Discord = require('discord.js');
const dietModel = require('../models/dietSchema')

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth()+1).padStart(2, '0')
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

module.exports = {
    name: 'add',
    aliases: [],
    permissions: [],
    cooldown: 5,
    description: 'Adds an element to your diet.',
    async execute(client, message, args, Discord, profileData,workoutData){

        if(args == "")
        {
            message.channel.send("You did not enter anything.");
            return;
        }
        //let input = args.toString();
        let input = args.join(' ');

        if(profileData.meals.length >= 10)
        {
            message.channel.send("You can't add any more food to your food diary!")
            return;
        }

        const response = await dietModel.findOneAndUpdate(
            {
                userID: message.author.id,
                date: today,
            },
            {
                $push: {
                meals: input,
                },
            }
            );
            message.channel.send(`Successfully added to your food diary.`);
        },
}
