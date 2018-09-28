class Socket {
    constructor(socket, users) {
        this.socket = socket;
        this.users = users;
        this.onData();
        this.onClose();
        this.printUsers();
    }

    onData() {
        this.socket.on('data', data => {
            const query = JSON.parse(data.toString());
            switch (query.type) {
                case ('getUser'):
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
        })
    }

    printUsers() {
        setInterval(() => {
            console.log(this.users);
        }, 5000);
    }
}

module.exports.socket = Socket;