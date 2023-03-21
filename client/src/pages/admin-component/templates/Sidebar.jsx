import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { username } from '../../auth/middleware';

class Sidebar extends Component {
    render() {
        return (
            <nav className="sidebar sidebar-offcanvas" id="sidebar">

                <div className="user-wrapper mt-4">
                    <img
                        className="profil-photo"
                        src="https://i.pinimg.com/564x/66/15/da/6615da7d0d3c74c0b538cd2974e5d4ed.jpg" alt="" />

                    <p className="profile-name">
                        {JSON.parse(localStorage.getItem("jwt")).data.username.toUpperCase()}
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
                    <li className="nav-item" id="perwalianNav">
                        <a className="nav-link ikon" data-toggle="collapse" href="#perwalianOpen" aria-expanded="false" aria-controls="akademik" id="akademikLink">
                            <i className="ti-notepad menu-icon" />
                            <span className="menu-title">Perwalian</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="perwalianOpen">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <NavLink activeClassName="underline" className="nav-link" to="/dataMhs">Data Mahasiswa</NavLink></li>
                                <li className="nav-item"> <NavLink activeClassName="underline" className="nav-link" to="/pengajuanKrs">Pengajuan KRS</NavLink></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Sidebar;