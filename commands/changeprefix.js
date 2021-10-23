const Discord = require('discord.js');
const prefixModel = require('../models/prefixSchema');

module.exports = {
    name: 'changeprefix',
    aliases: [],
    permissions: ["MANAGE_CHANNELS"],
    cooldown: 5,
    description: 'Changes the prefix of the bot.',
    async execute(client, message, args, Discord, profileData,workoutData){

        if(args == "")
        {
            message.channel.send("Reverting prefix to default: ?");
            await prefixModel.deleteOne({guild: message.guild.id});
            return;
        }
        let input = args.join(' ');

        alreadycreated = await prefixModel.findOne({guild: message.guild.id});
        if(!alreadycreated)
        {
            let profile = await prefixModel.create({
                guild: message.guild.id,
                prefix: input,
            })
            profile.save();
        }else
        {
            const res = await prefixModel.findOneAndUpdate({
                guild: message.guild.id,
            },{
                $set:{
                    prefix: input,
                }
            })
        }
        

        message.channel.send("You have successfully updated the prefix to " + input);
        },
}
