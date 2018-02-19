var User = require('./userModel');
var bcrypt = require('bcrypt-nodejs');

function initial(cb){
    var result = [];
    const userDb = [['Bilbo', 'Baggins', 'a@b.com', '123', 'admin'],
                    ['bilbo', 'baggins', 'bilbo@mordor.org','123123123', 'user',{ colors :{guessBackground : "#ffffff" , wordBackground : "#aaaaaa" , textColor : "#000000" }, level :{ name : "medium" , minLength :4, maxLength :10, guesses :7}, font :{ url : "https://fonts.googleapis.com/css?family=Acme" , rule : "Acme, Sans Serif" , family : "Acme" , category : "Sans Serif" }}],
                    ['frodo', 'baggins', 'frodo@mordor.org','234234234','user'],
                    ['samwise', 'gamgee','samwise@mordor.org','345345345', 'user',{ colors :{guessBackground : "#ffff00" , wordBackground : "#00aaaa" , textColor : "#000000" }, level :{ name : "medium" , minLength :4, maxLength :10, guesses :7}, font :{ url : "https://fonts.googleapis.com/css?family=Acme" , rule : "Acme, Sans Serif" , family : "Acme" , category : "Sans Serif" }}]];
    userDb.forEach(
        (names) => {
            var user = new User({
                name : {first : names[0], last : names[1]},
                email : names[2],
                password : bcrypt.hashSync(names[3]),
                role : names[4],
                defaults: names[5],
                enabled: true
            });
            save(user, (err , data) => {
               result.push(data);
               if(result.length == 4){
                   cb(null , result);
               }
            });
        }
    );
}
module.exports.initial = initial;

function save(newuser, cb) {
    User.findOne({'email' : newuser.email}, function(err, user){
        var info = {};
        if(user){
            info.msg = "already have one!!"
            cb(info, null);
        }else{
            new User(newuser).save(cb);
        }
    });
}
module.exports.save = save;

function findAll(userid, q, flag, cb){
    var query = {};//{'_id':{$ne : userid}};
    if(flag != "null"){
        query.enabled = flag;
    }
    if(q){
        var containsReg = ".*" + q + ".*";
        query.$or = [
            { 'email' : q},
            { 'name.first' : {$regex : containsReg} },
            { 'name.last' : {$regex: containsReg} }
        ]
    }

    User.find(query, cb);
}
module.exports.findAll = findAll;

function findById(id , cb) {
    User.findOne({'_id' : id}, cb);
}
module.exports.findById = findById;

function findByEmail(email , cb){
    User.findOne({'email' : email, enabled : true}, cb);
}
module.exports.findByEmail = findByEmail;

function updateDefault(userId, defaults , cb){
    User.findOne({'_id' : userId}, function(err, user){
        if(err){ cb(err, null);}
        else{
            user.defaults = defaults;
            user.save( cb );
        }
    });
}
module.exports.updateDefault = updateDefault;

function updateUser(userId, newuser, cb){
    User.findOne({'_id':userId}, function(err, user){
       if(err){ cb(err, null) }
       else{
           user.name.first = newuser.name.first;
           user.name.last = newuser.name.last;
           user.role = newuser.role;
           user.enabled = newuser.enabled;
           if(user.email != newuser.email){
               User.findOne({'email' : newuser.email}, function (err, datauser) {
                   if(datauser){
                       var info = {msg : "the email have been used!!"};
                       cb(info, null);
                   }else{
                       user.email = newuser.email;
                       user.save(cb);
                   }
               })
           }else{
               user.save(cb);
           }
       }
    });
}
module.exports.updateUser = updateUser;