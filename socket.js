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
                    const user = this.users[query.payload];
        
                    if (user) {
                        this.sendData(user.socket, 'connectRequest', {
                            host: this.socket.remoteAddress,
                            port: this.socket.port
                        })
                    }
                    break;
                case ('setUser'):
                    this.username = query.payload;
                    this.users[this.username] = {
                        ip: this.socket.remoteAddress,
                        port: this.socket.remotePort,
                        socket: this.socket
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
            console.log({
                username: this.username,
                ip: this.socket.remoteAddress,
                port: this.socket.remotePort
            });

        }, 5000);
    }

    sendData(socket, type, payload) {
        socket.write(JSON.stringify({
            type: type,
            payload: payload
        }))
    }
}



module.exports.socket = Socket;