const Discord = require('discord.js');
const recipeModel = require('../models/recipeSchema');

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth()+1).padStart(2, '0')
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

function last10(arrayofBoosts)
{
    let originalArray = arrayofBoosts.map((x) => x);

    let orderedlist = arrayofBoosts.sort();
    orderedlist = orderedlist.reverse();

    let first10large = [];

    let count = 0;
    for(let x = 0; x < arrayofBoosts.length; x++)
    {
        for(let i = 0; i < arrayofBoosts.length; i++)
        {
            if(originalArray[i] == 0)
            {
                originalArray[i] = -1;
            }

            if(orderedlist[x] == originalArray[i])
            {
                first10large.push(i);
                originalArray[i] = -1;
                break;
            }
        }

    count++;
        if(count == 10){
            break;  
        }
    }
    return first10large;

}

module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    permissions: [],
    cooldown: 5,
    description: 'Displays the top recipes',
    async execute(client, message, args, Discord, profileData,workoutData){

        let responsemain = await recipeModel.find({date: today});

        let indexes = [];

        for(let j = 0; j < responsemain.length; j++)
        {
            indexes.push(responsemain[j].boostcount);
        }

        
        correctedindex = last10(indexes);
        

        let finalarray = [];
        for(let r = 0; r < correctedindex.length; r++)
        {
            finalarray.push(responsemain[correctedindex[r]]);
        }

        let x = 0;
        const generateEmbed = async start => {
        const current = finalarray;

        // title: `Showing Characters ${start + 1}-${start + current.length} out of ${
        //    char.length}`
        return new Discord.MessageEmbed({
        color: `#ff0000`,
        title: `Recipe Leaderboard`,
        description: 'The top 10 best recipes.',
        fields: await Promise.all(
        current.map(async g => ({
        name: `Recipe ${x+=1}`,
        value: `Recipe: ${g.recipe} \nAdded by: ${g.recipeauthor} \nCode: ${g.uniqueID} \nNumber of Boosts: ${g.boostcount}`
        }))
        )
        })
        }

    const embedMessage = await message.channel.send({embeds: [await generateEmbed(0)]})

    
        },
}