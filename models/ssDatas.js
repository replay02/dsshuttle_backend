//아래와 같이 Schema를 작성, scheam는 document의 구조가 어떻게 생겼는지 알려준다.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ssDatasScheme = new Schema({
    apiUrl: String,
    date: String
});

module.exports = mongoose.model('ssDatas', ssDatasScheme);
