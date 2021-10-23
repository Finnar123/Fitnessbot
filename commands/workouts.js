const Discord = require('discord.js');
const workoutModel = require('../models/workoutSchema')

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth()+1).padStart(2, '0')
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

module.exports = {
    name: 'workouts',
    aliases: ['w'],
    permissions: [],
    cooldown: 5,
    description: 'Displays your workouts.',
    async execute(client, message, args, Discord, profileData,workoutData){

    

        let responsemain = await workoutModel.find({userID: message.author.id});
        

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


        const generateEmbed = async start => {
        const current = responsemain[start].workouts;

        let x = 0;
        return new Discord.MessageEmbed({
        color: `#0099ff`,
        title: `${message.author.username}'s Workout`,
        description: `Showing workouts on ${responsemain[start].date}`,
        footer: {
            text: 'Consistency is key!',
            iconURL: `https://image.freepik.com/free-vector/fitness-gym-sport-body-building-logo-icon-template_227744-214.jpg`,
        },
        fields: await Promise.all(
        current.map(async g => ({
        name: `Exercise ${x+=1}`,
        value: `${g}`
        }))
        )
        }
        )
        }

    const canFitOnOnePage = responsemain.length == 1
    const embedMessage = await channel.send({
    embeds: [await generateEmbed(responsemain.length-1)], // was 0
    components: canFitOnOnePage
    ? []
    : [new Discord.MessageActionRow({components: [forwardButton]})]
    })

    if (canFitOnOnePage) return

    const collector = embedMessage.createMessageComponentCollector({
    filter: ({user}) => user.id === author.id
    })

    let currentIndex = 0
    let currentDay = responsemain.length-1;
    collector.on('collect', async interaction => {

    //interaction.customId === backId ? (currentIndex -= 10) : (currentIndex += 10)
    interaction.customId === backId ? (currentDay += 1) : (currentDay -= 1)

    await interaction.update({
    embeds: [await generateEmbed(currentDay)],
    components: [
    new Discord.MessageActionRow({
        components: [

            ...(currentDay != responsemain.length-1 ? [backButton] : []),

            ...(currentDay != 0 ? [forwardButton] : [])
        ]
        })
    ]
    })
}) 

    }
}
