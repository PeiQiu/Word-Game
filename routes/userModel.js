var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    role : String,
    name : {
       first : String, last : String
    },
    email : String,
    password : String,
    defaults: mongoose.Schema.Types.Mixed,
    enabled : Boolean
});

userSchema.set('toJSON', {
   transform : function(doc, result, options){
        result.id = result._id;
        delete result._id;
        delete result.__v;
   }
});

var User = mongoose.model('User',userSchema);
module.exports = User;