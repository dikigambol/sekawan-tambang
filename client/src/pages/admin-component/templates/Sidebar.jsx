import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import user from '../../auth/infoUser';
import { isAdmin } from '../../auth/middleware';

class Sidebar extends Component {
    render() {
        return (
            <nav className="sidebar sidebar-offcanvas" id="sidebar">

                <div className="user-wrapper mt-4">
                    <img
                        className="profil-photo"
                        src="https://i.pinimg.com/564x/66/15/da/6615da7d0d3c74c0b538cd2974e5d4ed.jpg" alt="" />

                    <p className="profile-name">
                        {user.username.toUpperCase()}
                        <br />
                        <span className="status-indicator online"></span>
                        &nbsp;<span style={{ opacity: '0.7' }}>online</span>
                    </p>
                </div>

                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">
                            <i className="icon-grid menu-icon" />
                            <span className="menu-title">Home</span>
                        </Link>
                    </li>
                    {
                        isAdmin() ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/users">
                                        <i className="ti-user menu-icon" />
                                        <span className="menu-title">Users</span>
                                    </Link>
                                </li>
                                <li className="nav-item" id="cabangNav">
                                    <a className="nav-link ikon" data-toggle="collapse" href="#cabangOpen" aria-expanded="false">
                                        <i className="ti-direction-alt menu-icon" />
                                        <span className="menu-title">Cabang</span>
                                        <i className="menu-arrow" />
                                    </a>
                                    <div className="collapse" id="cabangOpen">
                                        <ul className="nav flex-column sub-menu">
                                            <li className="nav-item"> <NavLink activeClassName="underline" className="nav-link" to="/cabang">Data Cabang</NavLink></li>
                                            <li className="nav-item"> <NavLink activeClassName="underline" className="nav-link" to="/tambang">Lokasi Tambang</NavLink></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/drivers">
                                        <i className="ti-id-badge menu-icon" />
                                        <span className="menu-title">Drivers</span>
                                    </Link>
                                </li>
                                <li className="nav-item" id="kendaraanNav">
                                    <a className="nav-link ikon" data-toggle="collapse" href="#kendaraanOpen" aria-expanded="false">
                                        <i className="ti-truck menu-icon" />
                                        <span className="menu-title">Kendaraan</span>
                                        <i className="menu-arrow" />
                                    </a>
                                    <div className="collapse" id="kendaraanOpen">
                                        <ul className="nav flex-column sub-menu">
                                            <li className="nav-item"> <NavLink activeClassName="underline" className="nav-link" to="/kendaraan">Data Kendaraan</NavLink></li>
                                            <li className="nav-item"> <NavLink activeClassName="underline" className="nav-link" to="/psewa">Perusahaan Sewa</NavLink></li>
                                            <li className="nav-item"> <NavLink activeClassName="underline" className="nav-link" to="/reservasi">Reservasi</NavLink></li>
                                        </ul>
                                    </div>
                                </li>
                            </>
                            : null
                    }
                </ul>
            </nav>
        );
    }
}

export default Sidebar;