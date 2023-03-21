import React, { Component } from 'react';

class Footer extends Component {
    onKlik = () => {
        document.getElementById("darkLoader").classList.remove("sembunyi")
        setTimeout(function () {
            document.getElementById("darkLoader").classList.add("sembunyi")
        }, 2100)
    }
    render() {
        return (
            <footer className="footer">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © UPT-SI Institut Asia Malang</span>
                    <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Sistem Informasi Akademi Asia.</span>
                </div>
                <div id="theme-settings" className="settings-panel">
                    <i className="settings-close ti-close" />
                    <p className="settings-heading">MODE TEMA</p>
                    <div className="sidebar-bg-options selected" id="lightmode"
                        style={{ cursor: 'pointer' }}
                    ><div className="img-ss rounded-circle bg-light border mr-3" />Light</div>
                    <div className="sidebar-bg-options" id="darkmode" onClick={this.onKlik}
                        style={{ cursor: 'pointer' }}
                    ><div className="img-ss rounded-circle bg-dark border mr-3" />Dark</div>
                    <div className="sm-none">
                        <p className="settings-heading mt-2">SKIN HEADER</p>
                        <div className="color-tiles mx-0 px-4">
                            <div className="tiles success" style={{ cursor: 'pointer' }} />
                            <div className="tiles warning" style={{ cursor: 'pointer' }} />
                            <div className="tiles danger" style={{ cursor: 'pointer' }} />
                            <div className="tiles info" style={{ cursor: 'pointer' }} />
                            <div className="tiles dark" style={{ cursor: 'pointer' }} />
                            <div className="tiles default" style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;