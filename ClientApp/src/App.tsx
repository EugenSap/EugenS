import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import BullsAndCows from './components/BullsAndCows/BullsAndCows';
import Companies from './components/Companies/Companies';

import './custom.css'


export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/bulls' component={BullsAndCows} />
        <Route path='/companies' component={Companies} />
    </Layout>
);
