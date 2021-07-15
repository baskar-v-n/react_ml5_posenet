import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PoseEstimation from '../components/pose-estimation/pose-estimation';



const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path={'/'} component={PoseEstimation} />
            </Switch>
        </Router>
    );
}

export default Routes;