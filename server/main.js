import { Meteor } from 'meteor/meteor';

import { WebApp } from 'meteor/webapp';
import socketIO from 'socket.io';

import Device from "../imports/models/Device";

import '../imports/api/methods'
import {randomInteger, randomString} from "../imports/utils";

const io = socketIO(WebApp.httpServer);

function notify(deviceId, signal, value) {
    return {deviceId, date: new Date().getTime(), signal, value}
}

Meteor.startup(() => {
    WebApp.connectHandlers.use('/api/available', (req, res, next) => {
        const devices = Device.find().fetch();

        const namedDevices = devices.map(device=>{
            device.name=`Stopsleep`
            return device;
        })
        res.writeHead(200);
        res.end(JSON.stringify(namedDevices));
    })

    io.on('connection', function(socket) {
        const { deviceId } = socket.handshake.query
        socket.join(deviceId);


        socket.on('turnOn', ({value}) => {
            socket.to(deviceId).emit('notification',  notify(deviceId, 0, value))
        });

        socket.on('turnOff',  ({value}) => {
            socket.to(deviceId).emit('notification',  notify(deviceId, 5, value))
        });

        socket.on('alarm',  ({value}) => {
            socket.to(deviceId).emit('notification',  notify(deviceId, 2, value))
        });

        socket.on('attention',  ({value}) => {
            socket.to(deviceId).emit('notification',  notify(deviceId, 3, value))
        });

        socket.on('kgrChange',  ({value}) => {
            socket.to(deviceId).emit('notification',  notify(deviceId, 1, value))
        });

        socket.on('lowCharge',  ({value}) => {
            socket.to(deviceId).emit('notification',  notify(deviceId, 4, value))
        });
    });
});