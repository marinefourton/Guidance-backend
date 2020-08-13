var mongoose = require('mongoose');

var bookedSchema = mongoose.Schema({
    bookedplace: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'tours'
                },
    bookedhour: String,
    bookedperson: Number,
})

var userSchema = mongoose.Schema({
    userpseudo: String,
    usermail: String,
    userpwd: String,
    userlang: String,
    userfriends:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
                }],
    userfavs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'tours'
            }],
    bookedtours: [bookedSchema],
    points: Number,
    salt: String,
    token: String
   });

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;



