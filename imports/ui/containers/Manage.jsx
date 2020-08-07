import React, {useState} from 'react';
import io from 'socket.io-client';
import {withTracker} from 'meteor/react-meteor-data';
import './Manage.css'

const Manage = (props) => {
    const {deviceId} = props.match.params

    const socket = io('ws://localhost:3000', {query: `deviceId=${deviceId}`});

    socket.on('notification', msg => console.log(msg))

    const alarm = () => {
        socket.emit('alarm', deviceId)
    }

    const turnOn = () => {
        socket.emit('turnOn', deviceId)
    }

    const turnOff = () => {
        socket.emit('turnOff', deviceId)
    }

    const attention = () => {
        socket.emit('attention', deviceId)
    }

    const kgrChange = () => {
        socket.emit('kgrChange', deviceId)
    }

    return (
        <div className="Manage">
            <h2>
                <button onClick={()=>props.history.push('/')}>На главную</button>
            </h2>

            <button onClick={turnOn}>Включить</button>
            <button onClick={turnOff}>Выключить</button>
            <button onClick={alarm}>Тревога</button>
            <button onClick={attention}>Внимание</button>
            <button onClick={kgrChange}>Изменение кгр</button>
        </div>
    )
};

export default withTracker((props) => {
    return {};
})(Manage);