import React, {useState} from 'react';
import io from 'socket.io-client';
import {withTracker} from 'meteor/react-meteor-data';
import './Manage.css'
import {config} from "../../config";

const Manage = (props) => {
    const [value, setValue] = useState(0);
    const {deviceId} = props.match.params

    const socket = io(`ws://${config.ROOT_URL}`, {query: `deviceId=${deviceId}`});

    socket.on('notification', msg => console.log(msg))

    const alarm = () => {
        socket.emit('alarm', {deviceId, value})
    }

    const turnOn = () => {
        socket.emit('turnOn', {deviceId, value})
    }

    const turnOff = () => {
        socket.emit('turnOff', {deviceId, value})
    }

    const attention = () => {
        socket.emit('attention', {deviceId, value})
    }

    const kgrChange = () => {
        socket.emit('kgrChange', {deviceId, value})
    }

    const lowBattery = () => {
        socket.emit('lowBattery', {deviceId, value})
    }

    return (
        <div className="Manage">
            <div>
                <button onClick={()=>props.history.push('/')}>На главную</button>
            </div>

            <button onClick={turnOn}>Включить</button>
            <button onClick={turnOff}>Выключить</button>
            <button onClick={alarm}>Тревога</button>
            <button onClick={attention}>Внимание</button>
            <button onClick={kgrChange}>Изменение кгр</button>
            <button onClick={lowBattery}>Низкий заряд батареии</button>

            <div style={{width: '200px'}}>
                Введите значение которое будет отправлено в уведомлении. Для включения и выключения это заряд батареии(0-100)
                Для тревоги, внимания, изменения кгр - это текущее значение кгр (30 - 1000).
            </div>
            <input value={value} onChange={e=>setValue(+e.target.value)} placeholder="Значение"/>
        </div>
    )
};

export default withTracker((props) => {
    return {};
})(Manage);