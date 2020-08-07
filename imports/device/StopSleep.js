const { randomString, newKGR, randomInteger } = require("../utils");

class StopSleep {
    constructor() {
        this.id = randomString(10);
    }

    notify(signal, value) {
        const date = new Date().getTime();
        this.socket.emit('notification', {deviceId: this.id, date ,signal, value});
    }

    connect(socket) {
        this.socket = socket;
    }

    disconnect() {
        this.socket = null;
    }
}

export default StopSleep;
