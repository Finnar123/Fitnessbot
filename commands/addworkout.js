const Discord = require('discord.js');
const workoutModel = require('../models/workoutSchema')

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth()+1).padStart(2, '0')
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

module.exports = {
    name: 'addworkout',
    aliases: ['addw'],
    permissions: [],
    cooldown: 5,
    description: 'Adds a exercise to your workouts.',
    async execute(client, message, args, Discord, profileData,workoutData){

        if(args == "")
        {
            message.channel.send("You did not enter anything.");
            return;
        }
        let input = args.join(' ');

        // do the same thing u did with meal
        
        if(workoutData.workouts.length >= 10)
        {
            message.channel.send("You can't add any more workouts!")
            return;
        }


        const response = await workoutModel.findOneAndUpdate(
            {
                userID: message.author.id,
                date: today,
            },
            {
                $push: {
                workouts: input,
                },
            }
            );
            message.channel.send(`Successfully added to your workout plans.`);
        },
}
