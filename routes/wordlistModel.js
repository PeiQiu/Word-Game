var mongoose = require('mongoose');

var wordSchema = new mongoose.Schema({
    wordlist : [String]
});

wordSchema.set('toJSON', {
    transform : function(doc, result, options){
        result.id = result._id;
        delete result._id;
        delete result.__v;
    }
});

var WordList = mongoose.model('Word',wordSchema);

module.exports = WordList;
