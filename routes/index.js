var express = require("express");
var router = express.Router();
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var mongoose = require("mongoose");
var uid2 = require("uid2");

var userModel = require("../models/users");
var tourModel = require("../models/tour");

var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dvx36h3ub",
  api_key: "125794775985349",
  api_secret: "ozn8F-OjOcFuMD415z_FY95li2Y",
});

router.get("/points-counter", async function (req, res, next) {
  var searchUser = await userModel.findOne({ token: req.query.token });
  res.json(searchUser);
});

router.get("/save-monument", async function (req, res, next) {
  var newTour = new tourModel({
    availablelang: ["fr"],
    title: "jardin du luxembourg",
    picture: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/musee-arts-et-metiers_rrnvib.jpg",
    calendar: [
      { Day: 1, open: false, hours: "fermé" },
      { Day: 2, open: true, hours: "10h - 18h" },
      { Day: 3, open: true, hours: "10h - 18h" },
      { Day: 4, open: true, hours: "10h - 18h" },
      { Day: 5, open: true, hours: "10h - 18h" },
      { Day: 6, open: true, hours: "10h - 18h" },
      { Day: 0, open: true, hours: "10h - 18h" },
    ],
    openingSynthesis: "Mar-Dim / 10h-18h",
    duration: "45min",
    simpleprice: 8,
    groupprice: 5,
    minfordiscount: 10,
    category: "musée",
    location: {
      longitude: 48.866642,
      latitude: 2.355440,
    },
    guide:[{
        type: 'exterieur',
        urlcouv: 'test',
        urlPlan: 'https://res.cloudinary.com/dvx36h3ub/image/upload/v1597326064/SaintEustacheExterieur_bogze9.jpg',
        point: [{
            coordx: 10,
            coordy: 10,
            audio: [{
                lang: 'fr',
                urlaudio: 'test'
            }]
        }]
    },
    {
      type: 'interieur',
      urlcouv: 'test',
      urlPlan: 'https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/eglise-saint-eustache-plan_qaaqxd.png',
      point: [{
          coordx: 130,
          coordy: 160,
          illustration: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597655228/Vouet-Martyre_Saint_Eustache_mxhv0i.jpg",
          title: 'Martyr de Saint-Eustache',
          audio: [{
              lang: 'fr',
              urlaudio: 'https://res.cloudinary.com/dvx36h3ub/video/upload/v1597652463/Audio_Martyr_St_Eustache_hsax1h.mp3'
          }]
      },{

          coordx: 220,
          coordy: 200,
          illustration: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597655228/banc_d_oeuvre_nj3gw8.jpg",
          title: "Banc d'oeuvre",
          audio: [{
              lang: 'fr',
              urlaudio: 'https://res.cloudinary.com/dvx36h3ub/video/upload/v1597652463/Audio_Martyr_St_Eustache_hsax1h.mp3'
      }]}, {

          coordx: 390,
          coordy: 140,
          illustration: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597655228/retable_KH_tz4g8t.jpg",
          title: 'Keth Haring',
          audio: [{
              lang: 'fr',
              urlaudio: 'https://res.cloudinary.com/dvx36h3ub/video/upload/v1597652463/Audio_Martyr_St_Eustache_hsax1h.mp3'
    }]}, {

          coordx: 480,
          coordy: 220,
          illustration: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597655227/Chapelle_Marie_oe8nmi.jpg",
          title: 'Chapelle de la Vierge',
          audio: [{
              lang: 'fr',
              urlaudio: 'https://res.cloudinary.com/dvx36h3ub/video/upload/v1597652463/Audio_Martyr_St_Eustache_hsax1h.mp3'
  }]}, {

          coordx: 420,
          coordy: 290,
          illustration: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597655228/charcutiers-armleder_reu3bm.jpg",
          title: 'Chapelle des Charcutiers',
          audio: [{
              lang: 'fr',
              urlaudio: 'https://res.cloudinary.com/dvx36h3ub/video/upload/v1597652463/Audio_Martyr_St_Eustache_hsax1h.mp3'
}]}, {

          coordx: 130,
          coordy: 280,
          illustration: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597655228/st_agnes_gxsew3.jpg",
          title: 'Martyr Saint-Agnès',
          audio: [{
              lang: 'fr',
              urlaudio: 'https://res.cloudinary.com/dvx36h3ub/video/upload/v1597652463/Audio_Martyr_St_Eustache_hsax1h.mp3'
        }]}, {

          coordx: 120,
          coordy: 280,
          illustration: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597655228/orgues_cvoghl.jpg",
          title: 'Les Grandes Orgues',
          audio: [{
              lang: 'fr',
              urlaudio: 'https://res.cloudinary.com/dvx36h3ub/video/upload/v1597652463/Audio_Martyr_St_Eustache_hsax1h.mp3'
        }]}, 
    ]
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
    }],
    guide: [
      {
        type: "exterieur",
        urlcouv: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597666383/musee-arts-et-metiers-exterieur_bs6bgr.jpg",
        urlPlan: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597666547/musee-arts-et-metiers-plan-ext_rgg5er.jpg",
        point: [
          {
            title:"illu 0",
            illustration: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/tour-saint-jacques_figtq8.jpg",
            coordx: 200,
            coordy: 280,
            audio: [
              {
                lang: "fr",
                urlaudio: "https://res.cloudinary.com/dvx36h3ub/video/upload/v1597652463/Audio_Martyr_St_Eustache_hsax1h.3gp",
              },
            ],
          },
        ],
      },
      {
        type: "interieur",
        urlcouv: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597666342/musee-arts-et-metiers-interieur_ce0hmf.jpg",
        urlPlan: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597666721/musee-arts-et-metiers-plan-int_q5obyq.jpg",
        point: [
          {
            title:"illu 1",
            illustration: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/tour-saint-jacques_figtq8.jpg",
            coordx: 390,
            coordy: 140,
            audio: [
              {
                lang: "fr",
                urlaudio: "https://res.cloudinary.com/dvx36h3ub/video/upload/v1597652463/Audio_Martyr_St_Eustache_hsax1h.3gp",
              }
            ]
          },
          {
            title:"illu 2",
            illustration: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/tour-saint-jacques_figtq8.jpg",
            coordx: 220,
            coordy: 200,
            audio: [
              {
                lang: "fr",
                urlaudio: "https://res.cloudinary.com/dvx36h3ub/video/upload/v1597652463/Audio_Martyr_St_Eustache_hsax1h.3gp",
              }
            ]
          },
          {
            title:"illu 3",
            illustration: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/tour-saint-jacques_figtq8.jpg",
            coordx: 130,
            coordy: 160,
            audio: [
              {
                lang: "fr",
                urlaudio: "https://res.cloudinary.com/dvx36h3ub/video/upload/v1597652463/Audio_Martyr_St_Eustache_hsax1h.3gp",
              }
            ]
          },
          {
            title:"illu 4",
            illustration: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/tour-saint-jacques_figtq8.jpg",
            coordx: 120,
            coordy: 220,
            audio: [
              {
                lang: "fr",
                urlaudio: "https://res.cloudinary.com/dvx36h3ub/video/upload/v1597652463/Audio_Martyr_St_Eustache_hsax1h.3gp",
              }
            ]
          },
          {
            title:"illu 5",
            illustration: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/tour-saint-jacques_figtq8.jpg",
            coordx: 130,
            coordy: 280,
            audio: [
              {
                lang: "fr",
                urlaudio: "https://res.cloudinary.com/dvx36h3ub/video/upload/v1597652463/Audio_Martyr_St_Eustache_hsax1h.3gp",
              }
            ]
          },
          {
            title:"illu 6",
            illustration: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/tour-saint-jacques_figtq8.jpg",
            coordx: 420,
            coordy: 290,
            audio: [
              {
                lang: "fr",
                urlaudio: "https://res.cloudinary.com/dvx36h3ub/video/upload/v1597652463/Audio_Martyr_St_Eustache_hsax1h.3gp",
              }
            ]
          },
          {
            title:"illu 7",
            illustration: "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/tour-saint-jacques_figtq8.jpg",
            coordx: 480,
            coordy: 220,
            audio: [
              {
                lang: "fr",
                urlaudio: "https://res.cloudinary.com/dvx36h3ub/video/upload/v1597652463/Audio_Martyr_St_Eustache_hsax1h.3gp",
              }
            ]
          }
        ]
      }
    ],
    quizz: [
      {
        question: "question 1",
        reponses: ["reponse A", "reponse B", "reponse C", "reponse D"],
        win: "reponse B"
      },
      {
        question: "question 2",
        reponses: ["reponse A", "reponse B", "reponse C", "reponse D"],
        win: "reponse A"
      },
      {
        question: "question 3",
        reponses: ["reponse A", "reponse B", "reponse C", "reponse D"],
        win: "reponse C"
      },
      {
        question: "question 4",
        reponses: ["reponse A", "reponse B", "reponse C", "reponse D"],
        win: "reponse B"
      },
      {
        question: "question 5",
        reponses: ["reponse A", "reponse B", "reponse C", "reponse D"],
        win: "reponse B"
      },
      {
        question: "question 6",
        reponses: ["reponse A", "reponse B", "reponse C", "reponse D"],
        win: "reponse A"
      }
    ]
  });
  saveTour = await newTour.save();
});

router.get("/search-favorites", async function (req, res, next) {
  var searchUser = await userModel.findOne({ token: req.query.token });
  var idFavs = searchUser.userfavs;
  var myFavs = [];
  for (var i = 0; i < idFavs.length; i++) {
    // console.log("id cherché", idFavs[i])
    var searchMonument = await tourModel.findOne({ _id: idFavs[i] });
    // console.log("lieu trouvé", searchMonument)
    await myFavs.push(searchMonument);
  }
  // console.log("mes favoris", myFavs)
  res.json(myFavs);
});

router.get("/search-infos-monument", async function (req, res, next) {
  var searchMonument = await tourModel.findOne({ _id: req.query.idMonument });
  res.json(searchMonument);
});

router.post("/sign-up", async function (req, res, next) {
  var error = [];
  var result = false;
  var saveUser = null;
  var token = null;

  const data = await userModel.findOne({
    usermail: req.body.usermailFromFront,
  });

  if (data != null) {
    error.push("utilisateur déjà présent");
  }

  if (req.body.userpseudoFromFront == "" || req.body.usermailFromFront == "" || req.body.userpwdFromFront == "") {
    error.push("Champs vides");
  }

  if (error.length == 0) {
    var salt = uid2(32);
    var newUser = new userModel({
      userpseudo: req.body.userpseudoFromFront,
      usermail: req.body.usermailFromFront,
      userpwd: SHA256(req.body.userpwdFromFront + salt).toString(encBase64),
      token: uid2(32),
      salt: salt,
      points: 0,
    });

    saveUser = await newUser.save();
    // console.log(saveUser, "SAVEUSERBDD")

    if (saveUser) {
      result = true;
      token = saveUser.token;
    }
  }

  res.json({ result, saveUser, error, token });
});

router.post("/sign-in", async function (req, res, next) {
  var result = false;
  var user = null;
  var error = [];
  var token = null;

  if (req.body.usermailFromFront == "" || req.body.userpwdFromFront == "") {
    error.push("champs vides");
  }

  if (error.length == 0) {
    const user = await userModel.findOne({
      usermail: req.body.usermailFromFront,
    });
    // console.log(user, 'USERFIND')
    // console.log(req.body.usermailFromFront, "USERFINDMAIL")
    // console.log(req.body.userpwdFromFront, 'USERFINDPWD')

    if (user) {
      const passwordEncrypt = SHA256(req.body.userpwdFromFront + user.salt).toString(encBase64);
      // console.log(passwordEncrypt,"PASSWORDENCRYPT")
      // console.log(user.userpwd, 'USER.USERPWD')
      // console.log(req.body.userpwdFromFront, "FRONTUSERPWD")
      if (passwordEncrypt == user.userpwd) {
        result = true;
        token = user.token;
      } else {
        result = false;
        error.push("mot de passe incorrect");
      }
    } else {
      error.push("email incorrect");
    }
  }

  res.json({ result, user, error, token });
});

router.post("/display-filtered-tours", async function (req, res, next) {
  let categoriesfromFront = JSON.parse(req.body.categories);
  let pricefromFront = JSON.parse(req.body.price);
  let showClosedfromFront = JSON.parse(req.body.showClosed);

  let checkedCat = [];
  categoriesfromFront.forEach((obj) => {
    if (obj.state) {
      checkedCat.push(obj.signification);
    }
  });

  var d = new Date();
  var today = d.getDay();

  let tours;
  var stringToGoIntoTheRegex = req.body.title;
  var regex = new RegExp(stringToGoIntoTheRegex);

  if (req.body.title == "") {
    if (showClosedfromFront) {
      tours = await tourModel.find({ category: { $in: checkedCat }, simpleprice: { $lt: pricefromFront }, calendar: { $elemMatch: { Day: today, open: true }}});
    } else {
      tours = await tourModel.find({ category: { $in: checkedCat }, simpleprice: { $lt: pricefromFront } });
    }
  } else {
    if (showClosedfromFront) {
      tours = await tourModel.find({ category: { $in: checkedCat }, title: { $regex: regex, $options: "si" }, simpleprice: { $lt: pricefromFront }, calendar: { day: today, open: true } });
    } else {
      tours = await tourModel.find({ category: { $in: checkedCat }, title: { $regex: regex, $options: "si" }, simpleprice: { $lt: pricefromFront } });
    }
  }
  res.json({ result: tours });
});

router.get('/info-tour',async(req,res,next)=>{
    var tour =  await tourModel.find();
    // console.log(tour)
    res.json(tour)
})

router.get('/points-tour', async function(req, res, next) {
  var searchTour = await tourModel.findOne({_id:"5f3a62416cb25f06c0e53b1e"});
  
  // for(var i=0; searchTour.guide.length > 1; i++) {
  //   if (searchTour.guide[i].type == "exterieur") {
  //   res.json(searchTour.guide[i].type)
  // } else if(searchTour.guide[i].type == "interieur") {
  //   res.json(searchTour.guide[i].type)
  // }
  // console.log(searchTour.guide[i], 'bordel')
  // }

  res.json(searchTour);

});


router.get("/info-tour", async (req, res, next) => {
  var tour = await tourModel.find();
  // console.log(tour)
  res.json(tour);
});

// router.put(`/update-visit-history/:token/:tourID`, async function(req, res, next) {
//   const user = await userModel.findOne({token: req.params.token})
//                               .populate("bookedtours.bookedplace")
//                               .exec()
// let dejaExistant=false;

// user.bookedtours.forEach(tour => {
//   if (tour.bookedplace.equals(req.params.tourID)) {
//     dejaExistant=true;
//   }
// })

// if (dejaExistant==false){
//   user.bookedtours.push(
//     {bookedplace: req.params.tourID,
//      bookedhour: Date.now(),
//     }
//   )
//   user.save();
//   }

// });

router.put(`/update-point/:token/:score`, async function (req, res, next) {
  const user = await userModel.updateOne({ token: req.params.token }, { $inc: { points: Number(req.params.score) } });
  const updatedUser = await userModel.findOne({ token: req.params.token });

  res.json({ userpoints: updatedUser.points });
});

router.put(`/update-visit-history`, async function (req, res, next) {
  const user = await userModel.findOne({ token: req.body.token }).populate("bookedtours.bookedplace").exec();
  let dejaExistant=false;

  user.bookedtours.forEach(tour => {
    if (tour.bookedplace.equals(req.body.tourID)) {
      dejaExistant=true;
    }
  })

  if (dejaExistant==false){
    user.bookedtours.push(
      {bookedplace: req.body.tourID,
      bookedhour: Date.now(),
      })
    user.save();
    }

    console.log(dejaExistant)

  res.json()
});

router.post("/get-quizz", async function (req, res, next) {
  const tour = await tourModel.findById(req.body.tourID);

  res.json(tour.quizz);
});

router.post("/get-past-visit", async function (req, res, next) {
  const user = await userModel.findOne({ token: req.body.token }).populate("bookedtours.bookedplace").exec();

  let bookedToursOfUser = user.bookedtours;
  var now = Date.now();
  let pastBookedTours = [];

  bookedToursOfUser.forEach(tour => {
    if (Number(tour.bookedhour) < Number(now)){
      pastBookedTours.push(tour)
    }
  });

  res.json(pastBookedTours);
});

router.post('/get-futur-visit', async function(req, res, next) {

  const user = await userModel.findOne({token: req.body.token})
                              .populate("bookedtours.bookedplace")
                              .exec()

  let bookedToursOfUser = user.bookedtours
  var now = Date.now();
  let futurBookedTours = []

  bookedToursOfUser.forEach(tour => {
    if (Number(tour.bookedhour) > Number(now)){
      futurBookedTours.push(tour)
    }
  })

  res.json(futurBookedTours);
});



router.get("/send-favorites", async (req, res, next) => {
  var idMonument = req.query.id;

  var mec = await userModel.findOne({ token: req.query.token });
  var tabId = await mec.userfavs;
 if(tabId.indexOf(idMonument) == -1){
   tabId.push(idMonument)
 } else {
  tabId.splice(tabId.indexOf(idMonument),1)
 }
    
  await userModel.updateOne({ token: req.query.token }, { userfavs: tabId });
  var userUpdated = await userModel.findOne({ token: req.query.token });
  console.log(userUpdated)

  res.json({ idMonument: idMonument, listFavId: tabId });
});

module.exports = router;
