import React, { Component, Fragment } from 'react';
import ConfigAdmin from '../../config/configAdmin';
import AdminRoutes from '../../Routes/AdminRoutes';
import { isAuthenticate } from '../auth/middleware';
import AnimationLoader from './templates/AnimationLoader';
import Footer from './templates/Footer';
import Navbar from './templates/Navbar';
import Sidebar from './templates/Sidebar';

class Admin extends Component {
    render() {
        return (
            <Fragment>
                <ConfigAdmin />
                {
                    isAuthenticate() ? (
                        <div className="container-scroller" id="main-content">
                            <Navbar />
                            <div className="container-fluid page-body-wrapper">
                                <Sidebar />
                                <div className="main-panel">
                                    
                                    <div className="content-wrapper">
                                        <AdminRoutes />
                                    </div>
                                    <Footer />
                                </div>
                            </div>
                            <AnimationLoader />
                        </div>
                    ) : (
                        window.location.replace('/')
                    )
                }
            </Fragment>
        );
    }
}

export default Admin;