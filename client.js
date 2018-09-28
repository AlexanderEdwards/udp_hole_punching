const net = require('net');

const socket = net.createConnection({host: '138.68.12.66', port: 8080}, ()=>{
    //Username
    //IP address
    //Port
    socket.write('hello world');
    console.log('connected');
});