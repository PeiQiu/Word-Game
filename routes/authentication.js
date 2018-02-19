var express = require('express');
var router = express.Router();
var users = require('./users.js');
var bcrypt = require('bcrypt-nodejs');

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

router.post('/wordgame/api/v3/login' , function(req, res, next) {
    var csrf = guid();
    req.session.regenerate( function (err) {
        users.findByEmail(req.body.username, function (err, user) {
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                req.session.csrf = csrf;
                req.session.user = user;
                user.password = "";
                res.header('x-csrf',csrf).json(user);
            } else {
                res.status(403).send('Error with username/password!');
            }
        });
    });
});

router.get('/user' , function(req, res, next){
   var user = req.session.user;
   if(user){
       res.json( user );
   }else{
       res.status( 403 ).send( 'Forbidden' );
   }
});

router.post('/wordgame/api/v3/logout', function(req, res, next){
   req.session.regenerate( function(err){
       res.json({msg : 'Ok'});
   });
});

router.put('/wordgame/api/v3/:userid/defaults', function (req, res, next) {
    var userId = req.params.userid;
    var defaults = req.body;
    users.updateDefault(userId, defaults, function (err, user) {
            if(err) {
                res.status(403).send("update false!!")
            }else{
                req.session.user = user;
                user.password = "";
                res.send(user);
            }
    });
});
module.exports = router;