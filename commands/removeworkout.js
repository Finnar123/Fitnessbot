const Discord = require('discord.js');
const workoutModel = require('../models/workoutSchema')

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth()+1).padStart(2, '0')
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

module.exports = {
    name: 'removeworkout',
    aliases: ['removew'],
    permissions: [],
    cooldown: 5,
    description: 'Removes an element from your workout.',
    async execute(client, message, args, Discord, profileData,workoutData){

        if(args == "")
        {
            message.channel.send("You did not enter anything.");
            return;
        }
        let input = args.join(' ');

        if(!(workoutData.workouts.includes(input)))
        {
            message.channel.send("That is not in your workout.");
            return;
        }

        const response = await workoutModel.findOneAndUpdate(
            {
                userID: message.author.id,
                date: today,
            },
            {
                $pull: {
                workouts: input,
                },
            }
            ).then(message.channel.send(`Successfully removed from your workout.`));
        },
}
