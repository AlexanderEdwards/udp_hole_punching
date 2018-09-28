const net = require('net');

const socket = net.createConnection({host: '127.0.0.1', port: 8080}, ()=>{
    //Username
    //IP address
    //Port
    socket.write('hello world');
    console.log('connected');
});