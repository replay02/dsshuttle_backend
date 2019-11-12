// [LOAD PACKAGES]
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");

//[smtp mail]
var nodemailer = require("nodemailer");
var severConfig = require("./severConfig");
var smtpPool = require("nodemailer-smtp-pool");

var logger = require("morgan");
var SsDatas = require("./models/ssDatas");
var SsNotification = require("./models/ssNotification");

//var fcm = require('fcm-node');

app.use(cors());

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




var WebSocketServer = require("ws").Server;
// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8088;

var server = app.listen(port, function () {
  //listening
})
var wss = new WebSocketServer({
  server
});
wss.on("connection", function(ws) {
  ws.send("Hello! I am a server.");
  ws.on("message", function(message) {
    console.log("Received: %s", message);
  });
});






// [ CONFIGURE mongoose ] start

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on("error", console.error);
db.once("open", function() {
  // CONNECTED TO MONGODB SERVER
  console.log("Connected to mongod server");
});

// sample ex) mongoose.connect('mongodb://username:password@host:port/database?options...');
// mongoose.connect('mongodb://localhost/mongodb_tutorial');
mongoose.connect("mongodb://localhost/karforu");
// [ CONFIGURE mongoose ] end

// CONNECT TO MONGODB SERVER after DEFINE MODEL
//var Book = require('./models/book');
// var DriveInfo = require("./models/driveInfo");
// var KarforuInfo = require("./models/karforuInfo");

var ShuttleTimes = require("./models/shuttleTimes");
var SsUser = require("./models/ssUser");
var Boardcontent = require("./models/boardcontent");
var SmtpPool = smtpPool({
  service: severConfig.mailservice,
  host: "localhost",
  port: "465",
  tls: {
    rejectUnauthorize: false
  },

  //이메일 전송을 위해 필요한 인증정보

  //gmail 계정과 암호
  auth: {
    user: severConfig.mailid,
    pass: severConfig.mailpassword
  },
  maxConnections: 5,
  maxMessages: 10
});
var pushServerKey = severConfig.pushSeverkey;

// [CONFIGURE ROUTER]
//라우터에서 사용되는 모델 또는 설정값, 메시징규격 등을 전달한다.
//var router = require('./routes')(app, DriveInfo, SmtpPool, pushServerKey, KarforuInfo);
//라우터를 유형별로 나눈다. index/push/mail
// var indexRouter = require("./routes/index")(
//   app,
//   DriveInfo,
//   SmtpPool,
//   KarforuInfo
// );
// var pushRouter = require("./routes/push")(app, pushServerKey);
// var mailRouter = require("./routes/smtp")(app, SmtpPool, KarforuInfo);
var ssRouter = require("./routes/ss")(
  app,
  SmtpPool,
  pushServerKey,
  ShuttleTimes,
  SsUser,
  Boardcontent,
  SsDatas,
  SsNotification
);

// yhkim test
function makeDateOrTimeString(tzOffset, type) {
  // 24시간제
  var now = new Date();
  var tz = now.getTime() + now.getTimezoneOffset() * 60000 + tzOffset * 3600000;
  now.setTime(tz);
  var s;

  // 0 : 년월일 "2019-10-01" 형태
  // 1: : 시간 "13:59:34" 형태
  // 2: 요일 "MON" 형태
  if (type == 0) {
    s =
      leadingZeros(now.getFullYear(), 4) +
      "-" +
      leadingZeros(now.getMonth() + 1, 2) +
      "-" +
      leadingZeros(now.getDate(), 2);
  } else if (type == 1) {
    s =
      leadingZeros(now.getHours(), 2) +
      ":" +
      leadingZeros(now.getMinutes(), 2) +
      ":" +
      leadingZeros(now.getSeconds(), 2);
  } else {
    switch (now.getDay()) {
      case 0:
        s = "SUN";
        break;
      case 1:
        s = "MON";
        break;
      case 2:
        s = "TUE";
        break;
      case 3:
        s = "WED";
        break;
      case 4:
        s = "THU";
        break;
      case 5:
        s = "FRI";
        break;
      case 6:
        s = "SAT";
        break;
      default:
        s = "";
    }
  }

  return s;
}

function leadingZeros(n, digits) {
  var zero = "";
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++) zero += "0";
  }
  return zero + n;
}

app.use(logger(":url"), function(req, res, next) {
  //   console.log("request api : " + req.originalUrl);
  if (
    req.originalUrl.startsWith("/ss/onm/") ||
    req.originalUrl.startsWith("/ss/verify") ||
    // req.originalUrl.startsWith("/ws/v1") ||
    // req.originalUrl === '/'
    !req.originalUrl.startsWith("/ss/")
  ) {
    next();
  } else {
    var ssDatas = new SsDatas();
    ssDatas.apiUrl = req.originalUrl;
    ssDatas.date = makeDateOrTimeString(+9, 0);
    ssDatas.day = makeDateOrTimeString(+9, 2);
    ssDatas.time = makeDateOrTimeString(+9, 1);
    // ssDatas.date = "2019-10-16";  // for test
    // ssDatas.day = "WED";  // for test
    // ssDatas.time = "09:43:43";

    ssDatas.save(function(err) {
      if (err) {
        console.error(err);
      } else {
        console.error("saved complete");
      }
    });
    next();
  }
});

//아래와 같이 rest api 라우터를 분리한다. 주석
// app.use("/", indexRouter);
// app.use("/push", pushRouter);
// app.use("/smtp", mailRouter);
app.use("/ss", ssRouter);



// // [RUN SERVER]
// var server = app.listen(port, function() {
//   console.log("Express server has started on port " + port);
// });
