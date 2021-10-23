
module.exports = {
    name: 'suggest',
    aliases: [],
    permissions: [],
    cooldown: 21600,
    description: 'Suggests something to be added to the bot.',
    async execute(client, message, args, Discord, profileData,workoutData){

        if(args == "")
        {
            message.channel.send("You did not enter anything.");
            return;
        }
        let input = args.join(' ');

        const embed = new Discord.MessageEmbed().setTitle(`${input}`);

        client.channels.cache.get('901317766164910091').send({embeds: [embed] });
        //channel.send({embeds: [embed] });

        
        }
}
