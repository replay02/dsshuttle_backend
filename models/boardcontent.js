var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boardcontentSchema = new Schema({

    /**
     * writer | password | date | content
     * -------------------------------------------------
     * String    Number    String   String
     */
     writer : String,
     //password : Mixed, //혼합
     password : String,
     //date : { type: Date, default: Date.now },
     //date : Date,
     content : String

}, {collection: 'boardcontent'});

//모델 모듈화
module.exports = mongoose.model('boardcontent', boardcontentSchema);