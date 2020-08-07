import React, {useState} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import Device from "../../models/Device";

const Main = (props) => {
    const [virtualId, setVirtualId] = useState('');

    const createDevice = () => {
        if (virtualId) {
            Meteor.call("addDevice", virtualId);
            setVirtualId('')
        }
    }

    const deleteDevice = (virtualId) => {
        Meteor.call('deleteDevice', virtualId);
    }

    return (
        <div>
            <h1>StopSleep device emulation</h1>
            <h2>Available device: </h2>
            <div style={{width: '280px'}}>
            {props.devices && props.devices.map((device, index) => (
                <h5 key={index}>
                    {device.virtualId}
                    <button onClick={()=>deleteDevice(device.virtualId)} style={{float: 'right', color: 'red'}}>x</button>
                    <button onClick={()=>props.history.push(`/manage/${device.virtualId}`)} style={{float: 'right'}}>manage</button>
                </h5>
            ))}

                <h2>
                    <input value={virtualId} onChange={e => setVirtualId(e.target.value)} placeholder="Virtual ID"/>
                    <button onClick={createDevice}>Create device</button>
                </h2>
            </div>

        </div>
    )
};

export default withTracker(() => {
    return {
        devices: Device.find().fetch(),
    };
})(Main);