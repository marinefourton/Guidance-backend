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
    calendar : [calendarSchema],
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
    guide:[{
        type: String,
        urlcouv: String,
        urlPlan: String,
        point: [{
            coordx: Number,
            coordy: Number,
            audio: [{
                lang: String,
                urlaudio: String
            }]
        }]
    }],
    quizz: [quizzSchema]
   });

var tourModel = mongoose.model('tours', tourSchema);

module.exports = tourModel;
