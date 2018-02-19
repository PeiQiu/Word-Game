var Wordlist = require('./wordlistModel');
var fs = require('fs');

function initialWordlist(cb) {
        var ws = new Array();
        fs.readFile(__dirname + '/../file/wordlist.txt',"utf-8", (err , data) => {
            if(err) callback(err,null);
            data=data.replace(/[\r]/g,'');
            ws = data.split("\n");
            new Wordlist({wordlist : ws}).save(cb);
        } );
}
module.exports.initialWordlist = initialWordlist;

function getWord(cb) {
    Wordlist.findOne({}, cb);
}
module.exports.getWordlist = getWord;
