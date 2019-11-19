var express = require('express'); 
var router = express.Router(); 
router.ws("/realtime",function(ws,req){ 
    console.log("socket from client") 
    ws.on('message',function(msg){ 
    ws.send('back from node'); 
    }) 
}); 
module.exports=router; 