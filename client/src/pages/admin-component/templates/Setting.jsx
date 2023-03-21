import React, { Component } from 'react';

class Setting extends Component {
    render() {
        return (
            <div className="theme-setting-wrapper" id="settingsBtn" style={{ cursor: 'pointer' }} title="setting tampilan">
                <div id="settings-trigger"><i className="ti-settings" /></div>
            </div>
        );
    }
}

export default Setting;