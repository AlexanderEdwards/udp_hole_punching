class Socket {
    constructor(socket, users){
        this.socket = socket;
        this.users = users;
        this.onData();
        this.onClose();
        this.printUsers();
    }

    onData(){
        this.socket.on('data', data => {
            this.username = data.toString();
            this.users[this.username] = {
                ip: this.socket.remoteAddress,
                port: this.socket.remotePort
            }
        })
    }

    onClose() {
        this.socket.on('end', close => { 
            delete this.users[this.username];
        })
    }

    printUsers() {
        setInterval(() =>{
            console.log(this.users);
        }, 5000);
    }
}

module.exports.socket = Socket;