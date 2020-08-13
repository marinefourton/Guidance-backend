var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
     useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://admin:mydatabase@cluster0.ftroh.mongodb.net/Guidance?retryWrites=true&w=majority',
    options,    
    function(err) {
     console.log(err);
    }
   );

   
   
   