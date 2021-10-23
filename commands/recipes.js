const Discord = require('discord.js');
const recipeModel = require('../models/recipeSchema');

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth()+1).padStart(2, '0')
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;


module.exports = {
    name: 'recipes',
    aliases: ['recipelist'],
    permissions: [],
    cooldown: 5,
    description: 'Displays the recipe list.',
    async execute(client, message, args, Discord, profileData,workoutData){
        const randomNumber = Math.floor(Math.random() * 10000000);

        let responsemain = await recipeModel.find({date: today});


        const backId = 'back'
        const forwardId = 'forward'
        const backButton = new Discord.MessageButton({
        style: 'SECONDARY',
//        label: 'Back',
        emoji: '⬅️',
        customId: backId
        })
        const forwardButton = new Discord.MessageButton({
        style: 'SECONDARY',
//        label: 'Forward',
        emoji: '➡️',
        customId: forwardId
        })

        const {author, channel} = message;
        const char = responsemain;

        let x = 0;
        const generateEmbed = async start => {
        const current = char.slice(start, start + 10) 

        return new Discord.MessageEmbed({
        color: `#ff0000`,
        title: `Recipe List`,
        description: 'Boost your favorite recipe!',
        fields: await Promise.all(
        current.map(async g => ({
        name: `Recipe ${x+=1}`,
        value: `Recipe: ${g.recipe} \nAdded by: ${g.recipeauthor} \nCode: ${g.uniqueID}`
        }))
        )
        })
        }

    const canFitOnOnePage = char.length <= 10
    const embedMessage = await channel.send({
    embeds: [await generateEmbed(0)],
    components: canFitOnOnePage
    ? []
    : [new Discord.MessageActionRow({components: [forwardButton]})]
    })

    if (canFitOnOnePage) return

    const collector = embedMessage.createMessageComponentCollector({
    filter: ({user}) => user.id === author.id
    })

    let currentIndex = 0
    collector.on('collect', async interaction => {

    interaction.customId === backId ? (currentIndex -= 10) : (currentIndex += 10)

    await interaction.update({
    embeds: [await generateEmbed(currentIndex)],
    components: [
    new Discord.MessageActionRow({
        components: [

            ...(currentIndex ? [backButton] : []),

            ...(currentIndex + 10 < char.length ? [forwardButton] : [])
        ]
        })
    ]
    })
})  
        },
}
