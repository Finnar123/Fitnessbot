const dietModel = require('../../models/dietSchema');
const workoutModel = require('../../models/workoutSchema');
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth()+1).padStart(2, '0')
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

module.exports = async(client, discord, member) => {
    let profile = await dietModel.create({
        userID: member.id,
        date: today,
    })
    profile.save();

    let profile2 = await workoutModel.create({
        userID: member.id,
        date: today,
    })
    profile2.save();
};
