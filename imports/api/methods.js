import { Meteor } from 'meteor/meteor';
import Device from "../models/Device";

Meteor.methods({
    'addDevice'(virtualId) {
        const device = new Device({virtualId});
        device.save();
    },
    'deleteDevice'(virtualId) {
        Device.remove({virtualId})
    },
});