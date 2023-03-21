import { Fragment } from "react";
import AktifMenu from "./aktifMenu";
import SettingsMode from "./settingsMode";
import TriggerMode from "./triggerMode";
import 'datatables.net-bs4'
import './cssDTB/styleBootstrapDtb.css';
import './cssAdmin/style.css';
import './cssAdmin/darkMode.css'
import './cssAdmin/sidebarRight.css';
import './cssAdmin/loaderMini.css';
import './cssAdmin/customStyles.css';
import './cssAdmin/akordionDetail.css';

function ConfigAdmin() {
    window.scrollTo(0, 0);
    return (
        <Fragment>
            <TriggerMode />
            <SettingsMode />
            <AktifMenu />
        </Fragment>
    );
}

export default ConfigAdmin;