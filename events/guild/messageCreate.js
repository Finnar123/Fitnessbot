const cooldowns = new Map();
const dietModel = require('../../models/dietSchema');
const workoutModel = require('../../models/workoutSchema');
const recipeModel = require('../../models/recipeSchema');
const checksModel = require('../../models/checksSchema');
const prefixModel = require('../../models/prefixSchema');

var today = new Date();

var yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth()+1).padStart(2, '0')
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

var d2 = String(yesterday.getDate()).padStart(2, '0');
var m2 = String(yesterday.getMonth()+1).padStart(2, '0');
var yyyy2 =yesterday.getFullYear();

yesterday = m2 + '/' + d2 + '/' + yyyy2;

module.exports = async (Discord, client, message) => {

    
    let checker = await checksModel.findOne({main: 'blacklists'});
        if(checker.blacklist.includes(message.author.id))
        {
            // message.channel.send("You are blacklisted.");
            return;
        }

    let prefix;
    let customprefix;
    try{
        prefix = await prefixModel.findOne({guild: message.guild.id});
        if(!prefix)
        {
            customprefix = "?";
        }else
        {
            customprefix = prefix.prefix;
        }
    }catch(err){
        console.log(err);
    }

    if(message.mentions.users.first() == '900807761259036792')
    {
        message.channel.send(`The current prefix is ${customprefix}`);
        return;
    }
    

    if(!message.content.startsWith(customprefix) || message.author.bot) return;

    // DIETS
    let profileData;
    try {
        profileData = await dietModel.findOne({userID: message.author.id, date: today });
        if(!profileData){
            let profile = await dietModel.create({
                userID: message.author.id,
                date: today,
            })
            
            profile.save();
        }
    }catch(err){
        console.log(err);
    }

    // CHECKS
    let boostCheck;
    try {
        boostCheck = await checksModel.findOne({date: today });
        if(!boostCheck){
            let boost = await checksModel.create({
                main: 'boosts',
                date: today,
            })
            
            boost.save();
        }
    }catch(err){
        console.log(err);
    }

    await checksModel.deleteOne({date: yesterday, main: 'boosts'});

    // Recipe
    await recipeModel.deleteMany({date: yesterday});

    // Workout
    let workoutData;
    try {
        workoutData = await workoutModel.findOne({userID: message.author.id, date: today });
        if(!workoutData){
            let workoutprofile = await workoutModel.create({
                userID: message.author.id,
                date: today,
            })
            
            workoutprofile.save();
        }
    }catch(err){
        console.log(err);
    }
    
    // rest of code
    const args = message.content.slice(customprefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    // if(cmd === 'addchar' && message.author.id != '264141550525612032')
    // {
    //     message.channel.send("You can't use this command.")
    //     return;
    // }

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    const validPermissions = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
    ]
    //(!message.member.hasPermissions(perm)){

    if(command.permissions.length){
        let invalidPerms = []
        for(const perm of command.permissions){
        if(!validPermissions.includes(perm)){
            return console.log(`Invalid Permissions ${perm}`);
        }
        if(!message.member.permissions.has(perm)){
            invalidPerms.push(perm);
        }
        }
        if (invalidPerms.length){
        return message.channel.send(`Missing Permissions: \`${invalidPerms}\``);
        }
    }
    

    try
    {
        if(command.name === null)
        {
            return;
        }
    }catch(err){
        return;
    }

    if(!cooldowns.has(command.name))
    {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;
    
    if(time_stamps.has(message.author.id))
    {
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if(current_time < expiration_time){
            const time_left = (expiration_time - current_time) / 1000;

            return message.channel.send(`Please wait ${time_left.toFixed(1)} more seconds before using ${command.name}`);
        }
    }

    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    try{
        command.execute(client, message, args, Discord, profileData,workoutData);
    } catch(err){
        message.channel.send("There was an error.")
        console.log(err);
    }

}