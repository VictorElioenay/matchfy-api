var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

var io = sailsIOClient(socketIOClient)

io.sails.url = 'http://localhost:1337'

io.socket.on('connect',() => {
    console.log('connected!')

    io.socket.post('/v1/chat',{user_id:1,target_id:2},(body)=>{
        console.log(body)
        
        io.socket.put('/v1/chat',{user_id:1,target_id:2,text:'Testando'})

    })
})
