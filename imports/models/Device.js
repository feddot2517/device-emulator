import { Class } from 'meteor/jagi:astronomy';

const Device = Class.create({
    name: 'Device',
    collection: new Mongo.Collection('device'),
    fields: {
        virtualId: String,
    }
});

export default Device;