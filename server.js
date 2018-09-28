const net = require('net');
const Socket = require('./socket').socket;
//Dictionary of connected users and their IP address and ports.
const users = {};

const server = net.createServer(s => {
    const socket = new Socket(s, users);
   
})


server.listen('138.68.12.66', 8080);