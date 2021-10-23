const Discord = require('discord.js');

module.exports = {
    name: 'help',
    aliases: [],
    permissions: [],
    cooldown: 10,
    description: 'Help command',
    async execute(client, message, args, Discord, profileData,workoutData){

        if(args == "")
        {
            const embed = new Discord.MessageEmbed()
            .setColor('#2acaea')
            .setTitle(`Fitness Bot`)
            .setDescription("Hello, Welcome to Fitness Bot")
            .addFields(
            {name: 'The Commands: \n\nadd:',value: 'This command adds a meal to your diet.'},
            {name: "remove",value: "This command removes meals from your diet."},
            {name: "diet",value: "This command shows you the meals in your diet."},

            {name: "\naddrecipe (addr):",value: "This command adds a recipe to the recipe list."},
            {name: "recipes (recipelist): ",value: "This command shows you the current recipes for the day."},
            {name: "leaderboard (lb):",value: "This command displays the top 10 recipes."},
            {name: "boost",value: "This command boosts recipes in the leaderboard."},

            {name: "\naddworkout (addw):",value: "This command adds a exercise to your workouts."},
            {name: "removeworkout (removew): ",value: "This command removes a exercise from your workout."},
            {name: "workouts",value: "This command shows your workouts."},

            
            {name: "\nchangeprefix",value: "This command changes the prefixes of the bot for the server."},
            {name: "invite",value: "This command gives you a link to invite the bot to your server."},
            {name: "suggest",value: "This command sends a suggest to the dev."},
            {name: "\n\nBlacklist",value: "Blacklists will be given to players who add in-appriopate recipes, meals, or workouts. It is okay to have a little fun with the bot but please do not take it too far."}
            );
            message.author.send({embeds: [embed] });
            return;

        }
        

        }
}
