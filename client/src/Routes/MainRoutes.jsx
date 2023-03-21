import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from '../pages/admin-component/Admin';
import LoginPage from '../pages/auth/LoginPage';

class MainRoutes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    {/* login routes */}
                    <Route path="/" exact component={LoginPage} />
                    {/* admin main routes */}
                    <Admin />
                </Switch>
            </Router>
        );
    }
}

export default MainRoutes;