import { Meteor } from 'meteor/meteor';
import Device from "../models/Device";

Meteor.methods({
    'addDevice'(virtualId) {
        const device = new Device({virtualId});
        device.save();
        console.log('qwe');
    },
    'deleteDevice'(virtualId) {
        Device.remove({virtualId})
    },
});