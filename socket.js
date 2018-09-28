class Socket {
    constructor(socket, users) {
        this.socket = socket;
        this.users = users;
        this.onData();
        this.onClose();
        this.intervalId = null;
        this.printUsers();
        
    }

    onData() {
        this.socket.on('data', data => {
            const query = JSON.parse(data.toString());
            switch (query.type) {
                case ('getUser'):
                    if(this.users[query.payload])
                        this.socket.write(JSON.stringify(this.users[query.payload]))
                    break;
                case ('setUser'):
                    this.username = query.payload;
                    this.users[this.username] = {
                        ip: this.socket.remoteAddress,
                        port: this.socket.remotePort
                    }
                    break;
            }
        })
    }

    onClose() {
        this.socket.on('end', close => {
            delete this.users[this.username];
            clearInterval(this.intervalId);
        })
    }

    printUsers() {
        this.intervalId = setInterval(() => {
            console.log(this.users);
        }, 5000);
    }
}

module.exports.socket = Socket;