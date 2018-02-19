var Game = require('./gameModel');
var mongo = require('mongodb');
function create(game , cb) {
    new Game(game).save(cb);
}
module.exports.create = create;


function findgame(userId, gid, cb){
    Game.findOne({ owner : userId,'_id' : gid}, cb);
}
module.exports.findgame = findgame;

function findByUser(userId, cb){
    Game.find({owner : userId}, cb);
}
module.exports.findByUser = findByUser;

function updategame( userId, gid, newgame , cb) {
    newgame.save(cb);
    // console.log("::::::",newgame);
    // delete newgame._id;
    // console.log("-----",newgame);
    // Game.update({owner : userId, '_id' : gid}, newgame, cb);
}
module.exports.updategame = updategame;