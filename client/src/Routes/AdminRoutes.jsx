import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { isAdmin } from '../pages/auth/middleware';
import Cabang from '../pages/cabang';
import Driver from '../pages/drivers';
import Dashboard from '../pages/home/Dashboard';
import Kendaraan from '../pages/kendaraan';
import DetailKendaraan from '../pages/kendaraan/detail';
import Psewa from '../pages/psewa';
import Tambang from '../pages/tambang';
import Users from '../pages/users';

class AdminRoutes extends Component {
  render() {
    return (
      <Fragment>
        <Route path="/home" component={Dashboard} />
        {
          isAdmin() ?
            <>
              <Route path="/users" component={Users} />
              <Route path="/cabang" component={Cabang} />
              <Route path="/tambang" component={Tambang} />
              <Route path="/drivers" component={Driver} />
              <Route path="/kendaraan" component={Kendaraan} />
              <Route path="/psewa" component={Psewa} />
              <Route path="/detail-kendaraan/:id" component={DetailKendaraan} />
            </>
            : null
        }
      </Fragment >
    );
  }
}

export default AdminRoutes;