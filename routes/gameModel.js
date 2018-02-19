
var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    owner : mongoose.Schema.ObjectId,
    colors : {
        textBackground : String,
        wordBackground : String,
        guessBackground : String
    },
    font : mongoose.Schema.Types.Mixed,
    guesses : String,
    level : mongoose.Schema.Types.Mixed,
    remaining : Number,
    status : String,
    target : String,
    timestamp : Number,
    timeToComplete : Number,
    view : String
});

gameSchema.set('toJSON', {
   transform : function(doc, result, options){
       result.id = result._id;
       delete result._id;
       delete result.__v;
   }
});

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;