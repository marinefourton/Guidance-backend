var express = require('express');
var router = express.Router();
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var mongoose = require('mongoose');
var uid2 = require('uid2');

var userModel = require("../models/users"); 
var tourModel = require("../models/tour"); 

var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name:"dvx36h3ub",
  api_key:"125794775985349",
  api_secret:"ozn8F-OjOcFuMD415z_FY95li2Y"
});


router.get('/points-counter', async function(req, res, next) {
  // console.log(req.query.token)
  var searchUser = await userModel.findOne({token:req.query.token});
  res.json(searchUser);
});

router.get('/save-monument', async function(req,res,next){
  var newTour = new tourModel({
    availablelang: ['test','test','test'],
    title: 'test',
    picture: 'test',
    calendar: [{
      Day: 10,
      open: true,
      hours: 'test'},
      {
        Day: 10,
        open: true,
        hours: 'test'},
        {
          Day: 10,
          open: true,
          hours: 'test'}
        ],
    openingSynthesis: 'test',
    duration: 'test',
    simpleprice: 10,
    groupprice: 10,
    minfordiscount: 10,
    category: 'test',
    location: {
        longitude: 10,
        latitude: 10
    },
    guide:[{
        type: 'test',
        urlcouv: 'test',
        urlPlan: 'test',
        point: [{
            coordx: 10,
            coordy: 10,
            audio: [{
                lang: 'test',
                urlaudio: 'test'
            }]
        }]
    },
    {
      type: 'test',
      urlcouv: 'test',
      urlPlan: 'test',
      point: [{
          coordx: 10,
          coordy: 10,
          audio: [{
              lang: 'test',
              urlaudio: 'test'
          }]
      }]
  }],
    quizz: [{
      question: 'test',
      reponses: ['test','test','test'],
      win: 'test'
    },
    {
      question: 'test',
      reponses: ['test','test','test'],
      win: 'test'
    },
    {
      question: 'test',
      reponses: ['test','test','test'],
      win: 'test'
    }]
  })
  saveTour = await newTour.save()
})


// router.get('/search-favorites', async function(req, res, next) {
//   var searchUser = await userModel.findOne({token:req.query.token});
//   res.json(searchUser.userfavs);
// });


router.post('/sign-up', async function(req,res,next){

  var error = []
  var result = false
  var saveUser = null
  var token = null

  const data = await userModel.findOne({
    usermail: req.body.usermailFromFront
  })

  if(data != null){
    error.push('utilisateur déjà présent')
  }

  if(req.body.userpseudoFromFront == ''
  || req.body.usermailFromFront == ''
  || req.body.userpwdFromFront == ''
  ){
    error.push('Champs vides')
  }


  if(error.length == 0){

    var salt = uid2(32)
    var newUser = new userModel({
      userpseudo: req.body.userpseudoFromFront,
      usermail: req.body.usermailFromFront,
      userpwd: SHA256(req.body.userpwdFromFront+salt).toString(encBase64),
      token: uid2(32),
      salt: salt,
      points: 0
    })
  
    saveUser = await newUser.save()
    // console.log(saveUser, "SAVEUSERBDD")
  
    
    if(saveUser){
      result = true
      token = saveUser.token
    }
  }
  

  res.json({result, saveUser, error, token})
})

router.post('/sign-in', async function(req,res,next){
 

  var result = false
  var user = null
  var error = []
  var token = null

  
  if(req.body.usermailFromFront == ''
  || req.body.userpwdFromFront == ''
  ){
    error.push('champs vides')
  }

  if(error.length == 0){
    const user = await userModel.findOne({
      usermail: req.body.usermailFromFront,
      
    })
    // console.log(user, 'USERFIND')
    // console.log(req.body.usermailFromFront, "USERFINDMAIL")
    // console.log(req.body.userpwdFromFront, 'USERFINDPWD')
    
    if(user){
      const passwordEncrypt = SHA256(req.body.userpwdFromFront + user.salt).toString(encBase64)
      // console.log(passwordEncrypt,"PASSWORDENCRYPT")
      // console.log(user.userpwd, 'USER.USERPWD')
      // console.log(req.body.userpwdFromFront, "FRONTUSERPWD")
      if(passwordEncrypt == user.userpwd){
        result = true
        token = user.token
      } else {
        result = false
        error.push('mot de passe incorrect')
      }
      
      
    } else {
      error.push('email incorrect')
    }
  }
  

  res.json({result, user, error, token})

})

  router.post('/display-filtered-tours', async function(req, res, next) {

    let categoriesfromFront = JSON.parse(req.body.categories);
    let pricefromFront = JSON.parse(req.body.price);
    let showClosedfromFront = JSON.parse(req.body.showClosed);
  
    let checkedCat = []
    categoriesfromFront.forEach(obj=>{
      if (obj.state) {
        checkedCat.push(obj.signification);
      }
    })

    var d = new Date();
    var today = d.getDay();
    let tours
    var stringToGoIntoTheRegex = req.body.title;
    var regex = new RegExp(stringToGoIntoTheRegex);
    // console.log("what i get from front", req.body);
    // console.log("les categories selectionnées sont", checkedCat)
    // console.log("aujourd'hui on est le", today)
    // console.log(regex)

if (req.body.title==''){
    if(showClosedfromFront) {
      tours = await tourModel.find(
      { category: { $in: checkedCat },
        simpleprice: {"$lt" : pricefromFront},
        calendar: {day: today, 
                  open: true}
      })
    } else {
      tours = await tourModel.find(
        { category: { $in: checkedCat },
          simpleprice: {"$lt" : pricefromFront}
        })
      }
    } else {
      if(showClosedfromFront) {
        tours = await tourModel.find(
        { category: { $in: checkedCat },
          title: { $regex: regex, $options: "si" },
          simpleprice: {"$lt" : pricefromFront},
          calendar: {day: today, 
                    open: true}
        })
      } else {
        tours = await tourModel.find(
          { category: { $in: checkedCat },
            title: { $regex: regex, $options: "si" },
            simpleprice: {"$lt" : pricefromFront}
          })
        }
    }
    res.json({result: tours}) 
  })

//   router.post('/display-input-tours', async function(req, res, next) {

//       let lieu = req.body.title.toLowerCase()

//       tours = await tourModel.find({ 
//         title: lieu
//         })

//     res.json({result: tours}) 
    
// })

router.get('/info-tour',async(req,res,next)=>{
    var tour =  await tourModel.find();
    // console.log(tour)
    res.json(tour)
})

router.get("/send-favorites",async (req,res,next)=>{
var idMonument = req.query.id
var mec = await userModel.findOne({token:req.query.token})
var tabId = await mec.userfavs
tabId.push(req.query.id)
await userModel.updateOne(
  {token:req.query.token},
  {userfavs:tabId}
  )
var  userUpdated = await userModel.findOne({token:req.query.token})
console.log(userUpdated)


res.json({mec:mec,idMonument:idMonument})

})


module.exports = router;