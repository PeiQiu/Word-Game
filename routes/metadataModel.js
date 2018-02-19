var mongoose = require('mongoose');

var metadataModel = mongoose.Schema({
    levels : {

    },
    fonts : [{
        url: String,
        rule: String,
        family: String,
        category: String
    }],
    defaults : {
        font: {
            url: String,
            rule: String,
            family: String,
            category: String,
        },
        level: {
            name: String,
            minLength: Number,
            maxLength: Number,
            guesses: Number
        },
        colors: {
            guessBackground: String,
            wordBackground: String,
            textBackground: String
        }
    }
});

metadataModel.set('toJSON',{
    transform : function (doc, result, options) {
        result.id = result._id;
        delete result._id;
        delete result.__v;
    }
});

var MetaData = mongoose.model('Metadata', metadataModel);

module.exports = MetaData;