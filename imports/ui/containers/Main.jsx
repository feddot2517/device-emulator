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
            <h1>Эмулятор устройства StopSleep</h1>
            <h2>Доступные устройства: </h2>
            <div style={{width: '280px'}}>
            {props.devices && props.devices.map((device, index) => (
                <h5 key={index}>
                    {device.virtualId}
                    <button onClick={()=>deleteDevice(device.virtualId)} style={{float: 'right', color: 'red'}}>x</button>
                    <button onClick={()=>props.history.push(`/manage/${device.virtualId}`)} style={{float: 'right'}}>Управление</button>
                </h5>
            ))}

                <h2 style={{width: 280}}>
                    <input style={{width: '100%'}} value={virtualId} onChange={e => setVirtualId(e.target.value)} placeholder="Virtual ID"/>
                    <button style={{width: '101.5%'}} onClick={createDevice}>Создать виртуальное устройство</button>
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