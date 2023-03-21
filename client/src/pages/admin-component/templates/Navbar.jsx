import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class Navbar extends Component {
    componentDidMount = () => {
        // toogle untuk sidebar desktop
        var body = $('body');
        $('[data-toggle="minimize"]').on("click", function () {
            if (body.hasClass('sidebar-icon-only')) {
                body.removeClass('sidebar-icon-only');
                $('.user-wrapper').delay(200).show(0)
                localStorage.setItem("sidebar", "open")
            } else {
                body.addClass('sidebar-icon-only');
                $('.user-wrapper').hide();
                localStorage.setItem("sidebar", "close")
            }
        });
        // toogle untuk sidebar mobile
        $(function () {
            $('[data-toggle="offcanvas"]').on("click", function () {
                $('.sidebar-offcanvas').toggleClass('active')
            });
        });
        // toogle untuk dark atau light mode untuk mobile
        $("#settings-triggers").on("click", function () {
            $("#theme-settings").toggleClass("open");
        });
        // konfig sidebar open atau close 
        if (localStorage.getItem("sidebar") == "open") {
            $('.user-wrapper').css("display", "flex")
            body.removeClass('sidebar-icon-only');
        } else if ((localStorage.getItem("sidebar") == "close")) {
            $('.user-wrapper').css("display", "none")
            body.addClass('sidebar-icon-only');
        }
    }

    logOut = () => {
        window.location.replace("/")
        localStorage.clear();
    }

    render() {
        return (
            <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row" id="navbar">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <Link className="navbar-brand brand-logo mr-5 sembunyi" to="/home" id="lightlogo"><img src="/adminAset/images/logo.png" className="mr-2" alt="logo" /></Link>
                    <Link className="navbar-brand brand-logo-mini" to="/home"><img src="/adminAset/images/logomini.png" alt="logo" /></Link>
                    <Link className="navbar-brand brand-logo mr-5 sembunyi" id="darklogo" to="/home"><img src="/adminAset/images/logolight.png" className="mr-2" alt="logo" id="logodark" /></Link>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                        <span className="icon-menu" />
                    </button>
                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item dropdown" style={{ marginRight: '14%' }}>
                            <span className="nav-link count-indicator dropdown-toggle d-lg-none">
                                <div id="settings-triggers"><i className="ti-settings" /></div>
                            </span>
                        </li>
                        <li className="nav-item nav-profile dropdown">
                            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                                <i className="ti-user" style={{ fontSize: '21px' }} />
                                <i className="ti-angle-down" style={{ fontSize: '12px' }} />
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                                <a className="dropdown-item" onClick={this.logOut}>
                                    <i className="ti-power-off text-primary" />
                                    Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                        <span className="icon-menu" />
                    </button>
                </div>
            </nav >
        );
    }
}

export default Navbar;