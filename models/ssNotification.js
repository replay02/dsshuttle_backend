//아래와 같이 Schema를 작성, scheam는 document의 구조가 어떻게 생겼는지 알려준다.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ssNotificationScheme = new Schema({
    from: String,
    to: String,
    message:String
});

module.exports = mongoose.model('ssNotification', ssNotificationScheme);
