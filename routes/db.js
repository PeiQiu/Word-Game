var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mongoose_games');

var db = mongoose.connection;
db.once('open', function () {

});


// var db;
// var mongoClient = require('mongodb').MongoClient;
// mongoClient.connect('mongodb://localhost/mongoose_games', function (err, dbs) {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(dbs);
//         db = dbs;
//     }
// });

module.exports = db;