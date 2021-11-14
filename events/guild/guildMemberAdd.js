const dietModel = require('../../models/dietSchema');
const workoutModel = require('../../models/workoutSchema');
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth()+1).padStart(2, '0')
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

module.exports = async(client, discord, member) => {
    
    // Checks if there is already data there
    let check = await dietModel.findOne({userID: message.author.id, date: today });;

    // Creates a database when a user joins a server with the bot
    if(!check){
    let profile = await dietModel.create({
        userID: member.id,
        date: today,
    })
    profile.save();
    }

    let check2 = await workoutModel.findOne({userID: message.author.id, date: today});

    if(!check2){
    let profile2 = await workoutModel.create({
        userID: member.id,
        date: today,
    })
    profile2.save();
    }
};
