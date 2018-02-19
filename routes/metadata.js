var MetaData = require('./metadataModel');

function intialmetadata(cb) {
    var metadata = new MetaData({
           levels : {"easy":{"name":"easy","minLength":3,"maxLength":5,"guesses":8},
                     "medium":{"name":"medium","minLength":4,"maxLength":10,"guesses":7},
                     "hard":{"name":"hard","minLength":9,"maxLength":300,"guesses":6}
           },
           fonts : [{"url":"https://fonts.googleapis.com/css?family=Acme","rule":"'Acme', Sans Serif","family":"Acme","category":"Sans Serif"}, {"url":"https://fonts.googleapis.com/css?family=Alef","rule":"'Alef', Sans Serif","family":"Alef","category":"Sans Serif"}, {"url":"https://fonts.googleapis.com/css?family=Almendra","rule":"'Almendra', Serif","family":"Almendra","category":"Serif"},
               {"url":"https://fonts.googleapis.com/css?family=Amiko","rule":"'Amiko', Sans Serif","family":"Amiko","category":"Sans Serif"}, {"url":"https://fonts.googleapis.com/css?family=Armata","rule":"'Armata', Sans Serif","family":"Armata","category":"Sans Serif"},
               {"url":"https://fonts.googleapis.com/css?family=Artifika","rule":"'Artifika', Serif","family":"Artifika","category":"Serif"}, {"url":"https://fonts.googleapis.com/css?family=Bentham","rule":"'Bentham', Serif","family":"Bentham","category":"Serif"},
               {"url":"https://fonts.googleapis.com/css?family=Cabin%20Sketch","rule":"'Cabin Sketch', Display","family":"Cabin Sketch","category":"Display"},{"url":"https://fonts.googleapis.com/css?family=Capriola","rule":"'Capriola', Sans Serif","family":"Capriola","category":"Sans Serif"}, {"url":"https://fonts.googleapis.com/css?family=Content","rule":"'Content', Display","family":"Content","category":"Display"},{"url":"https://fonts.googleapis.com/css?family=Contrail%20One","rule":"'Contrail One', Display","family":"Contrail One","category":"Display"},{"url":"https://fonts.googleapis.com/css?family=Convergence","rule":"'Convergence', Sans Serif","family":"Convergence","category":"Sans Serif"},{"url":"https://fonts.googleapis.com/css?family=Delius%20Unicase","rule":"'Delius Unicase', Handwriting","family":"Delius Unicase","category":"Handwriting"},{"url":"https://fonts.googleapis.com/css?family=Didact%20Gothic","rule":"'Didact Gothic', Sans Serif","family":"Didact Gothic","category":"Sans Serif"},{"url":"https://fonts.googleapis.com/css?family=Dorsa","rule":"'Dorsa', Sans Serif","family":"Dorsa","category":"Sans Serif"},{"url":"https://fonts.googleapis.com/css?family=Dynalight","rule":"'Dynalight', Display","family":"Dynalight","category":"Display"},{"url":"https://fonts.googleapis.com/css?family=El%20Messiri","rule":"'El Messiri', Sans Serif","family":"El Messiri","category":"Sans Serif"},{"url":"https://fonts.googleapis.com/css?family=Flamenco","rule":"'Flamenco', Display","family":"Flamenco","category":"Display"},{"url":"https://fonts.googleapis.com/css?family=Fugaz%20One","rule":"'Fugaz One', Display","family":"Fugaz One","category":"Display"},{"url":"https://fonts.googleapis.com/css?family=Galada","rule":"'Galada', Display","family":"Galada","category":"Display"},{"url":"https://fonts.googleapis.com/css?family=Geostar%20Fill","rule":"'Geostar Fill', Display","family":"Geostar Fill","category":"Display"},{"url":"https://fonts.googleapis.com/css?family=Gravitas%20One","rule":"'Gravitas One', Display","family":"Gravitas One","category":"Display"},{"url":"https://fonts.googleapis.com/css?family=Gudea","rule":"'Gudea', Sans Serif","family":"Gudea","category":"Sans Serif"},{"url":"https://fonts.googleapis.com/css?family=IM%20Fell%20English","rule":"'IM Fell English', Serif","family":"IM Fell English","category":"Serif"},{"url":"https://fonts.googleapis.com/css?family=Kranky","rule":"'Kranky', Display","family":"Kranky","category":"Display"},{"url":"https://fonts.googleapis.com/css?family=Kreon","rule":"'Kreon', Serif","family":"Kreon","category":"Serif"},{"url":"https://fonts.googleapis.com/css?family=Lobster","rule":"'Lobster', Display","family":"Lobster","category":"Display"},{"url":"https://fonts.googleapis.com/css?family=Lora","rule":"'Lora', Serif","family":"Lora","category":"Serif"},{"url":"https://fonts.googleapis.com/css?family=Medula%20One","rule":"'Medula One', Display","family":"Medula One","category":"Display"},{"url":"https://fonts.googleapis.com/css?family=Miss%20Fajardose","rule":"'Miss Fajardose', Handwriting","family":"Miss Fajardose","category":"Handwriting"},{"url":"https://fonts.googleapis.com/css?family=Molle","rule":"'Molle', Handwriting","family":"Molle","category":"Handwriting"},{"url":"https://fonts.googleapis.com/css?family=Moulpali","rule":"'Moulpali', Display","family":"Moulpali","category":"Display"},{"url":"https://fonts.googleapis.com/css?family=Open%20Sans%20Condensed","rule":"'Open Sans Condensed', Sans Serif","family":"Open Sans Condensed","category":"Sans Serif"},{"url":"https://fonts.googleapis.com/css?family=Over%20the%20Rainbow","rule":"'Over the Rainbow', Handwriting","family":"Over the Rainbow","category":"Handwriting"},{"url":"https://fonts.googleapis.com/css?family=Padauk","rule":"'Padauk', Sans Serif","family":"Padauk","category":"Sans Serif"},{"url":"https://fonts.googleapis.com/css?family=Podkova","rule":"'Podkova', Serif","family":"Podkova","category":"Serif"},{"url":"https://fonts.googleapis.com/css?family=Risque","rule":"'Risque', Display","family":"Risque","category":"Display"},{"url":"https://fonts.googleapis.com/css?family=Sahitya","rule":"'Sahitya', Serif","family":"Sahitya","category":"Serif"},{"url":"https://fonts.googleapis.com/css?family=Sarala","rule":"'Sarala', Sans Serif","family":"Sarala","category":"Sans Serif"},{"url":"https://fonts.googleapis.com/css?family=Shadows%20Into%20Light","rule":"'Shadows Into Light', Handwriting","family":"Shadows Into Light","category":"Handwriting"},{"url":"https://fonts.googleapis.com/css?family=Source%20Serif%20Pro","rule":"'Source Serif Pro', Serif","family":"Source Serif Pro","category":"Serif"},{"url":"https://fonts.googleapis.com/css?family=Squada%20One","rule":"'Squada One', Display","family":"Squada One","category":"Display"},{"url":"https://fonts.googleapis.com/css?family=Yesteryear","rule":"'Yesteryear', Handwriting","family":"Yesteryear","category":"Handwriting"}],
            defaults : {"colors":{"guessBackground":"#ffffff","wordBackground":"#aaaaaa","textColor":"#000000"},"level":{"name":"medium","minLength":4,"maxLength":10,"guesses":7},"font":{"url":"https://fonts.googleapis.com/css?family=Acme","rule":"'Acme', Sans Serif","family":"Acme","category":"Sans Serif"}}
    });
    metadata.save(cb);
}
module.exports.initialmetadata = intialmetadata;

function findmetadata(cb){
    MetaData.find({}, cb);
}
module.exports.findmetadata = findmetadata;

function creatlevels(newlevel, cb) {
    MetaData.findOne({}, function (err, metadata) {
        var id = metadata.id;
        delete metadata.id;
        var levelname = newlevel.name;
        metadata.levels[levelname]= newlevel;
        MetaData.update({_id : id}, metadata, cb);
    })
}
module.exports.createlevels = creatlevels;

function changelevels(name, newlevel, cb){
    MetaData.findOne({}, function(err, metadata){
        if(err) {
            cb(err, null);
        } else{
            var id = metadata.id;
            delete metadata.id;
            delete metadata.levels[name];
            var levelname = newlevel.name;
            metadata.levels[levelname]= newlevel;
            MetaData.update({_id : id}, metadata, cb);
        }
    });
}
module.exports.changelevels = changelevels;

function deletelevels(name, cb){
    MetaData.findOne({}, function(err, metadata){
        if(err) {cb(err, null)}
        else{
            var id = metadata.id;
            delete metadata.levels[name];
            MetaData.update({_id : id}, metadata, cb);
        }
    });
}
module.exports.deletelevels = deletelevels;

function createfonts(newfont, cb) {
    MetaData.findOne({}, function (err, metadata) {
        var id = metadata.id;
        metadata.fonts.push(newfont);
        metadata.save(cb);
    })
}
module.exports.createfonts = createfonts;

function  changefonts(family , newfont, cb) {
    MetaData.findOne({}, function(err , metadata){
       if(err) {
           cb(err, null);
       }
       else{
           var have = false;
           for(var i =0; i < metadata.fonts.length; i++){
              if(metadata.fonts[i].family == family){
                  metadata.fonts[i] = newfont;
                  have = true;
                  break;
              }
           }

           if(have == false){
               fonts.push(newfont);
           }
           metadata.save(cb);
       }
    });
}
module.exports.changefonts = changefonts;

function deletefonts(family, cb){
    MetaData.findOne({}, function(err , metadata){
        if(err) {
            cb(err, null);
        } else{
            for(var i =0; i < metadata.fonts.length; i++){
                if(metadata.fonts[i].family == family){
                   var s = metadata.fonts.splice(i,1);
                   break;
                }
            }
            metadata.save(cb);
        }
    });
}
module.exports.deletefonts = deletefonts;

function changedefaults(defaults, cb) {
        MetaData.findOne({}, function(err , metadata){
            if(err) {cb(err, null)}
            else{
                metadata.defaults = defaults;
                metadata.save(cb);
            }
        });
}
module.exports.changedefaults = changedefaults;