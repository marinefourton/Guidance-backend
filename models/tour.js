var mongoose = require('mongoose');

var quizzSchema = mongoose.Schema({
    question: String,
    reponses: [String],
    win: String
})

var calendarSchema = mongoose.Schema({
        Day : Number,
        open: Boolean,
        hours: String,
    });

var tourSchema = mongoose.Schema({
    availablelang: [String],
    title: String,
    picture: String,
    calendar : [calendarSchema],//sous-doc
    openingSynthesis: String,
    duration: String,
    simpleprice: Number,
    groupprice: Number,
    minfordiscount: Number,
    category: String,
    location: {
        longitude: Number,
        latitude: Number
    },
    guide:[], 
    quizz: [quizzSchema]
   });

var tourModel = mongoose.model('tours', tourSchema);

module.exports = tourModel;