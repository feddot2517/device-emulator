import React from 'react';
import { Route } from 'react-router-dom';
import Main from './containers/Main'
import Manage from "./containers/Manage";


const BaseRouter = () => (
    <div>
        <Route exact path='/' component={Main}/>
        <Route exact path='/manage/:deviceId' component={Manage}/>
    </div>
);

export default BaseRouter;