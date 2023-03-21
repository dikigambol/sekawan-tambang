import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../pages/home/Dashboard';

class AdminRoutes extends Component {
  render() {
    return (
      <Fragment>
        <Route path="/home" component={Dashboard}/>
      </Fragment >
    );
  }
}

export default AdminRoutes;