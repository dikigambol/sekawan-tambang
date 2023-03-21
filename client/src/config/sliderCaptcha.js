import React, { Fragment, useEffect } from 'react';

function SliderCaptcha() {

    // area close untuk captcha, jangan dihapus oke :) ! 
    const areaCloseCaptcha = (event) => {
        let cekDisplayCaptcha = document.getElementById('captchaqq');
        if (document.getElementById('one').contains(event.target)) {
            return false
        } else {
            if (cekDisplayCaptcha.style.display != "none") {
                if (document.getElementById('captchaqq').contains(event.target)) {
                    return false
                } else {
                    if (cekDisplayCaptcha.style.display != "none") {
                        cekDisplayCaptcha.style.display = "none"
                        document.getElementById("check").style.display = "block";
                        document.getElementById("checkLoad").style.display = "none";
                    }
                }
            } else {
                return false
            }
        }
    }

    // captcha 
    const popupCaptcha = () => {
        var x = document.getElementById("captchaqq");
        if (x.style.display != "block") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        document.getElementById("check").style.display = "none";
        document.getElementById("checkLoad").style.display = "block";
    };

    useEffect(() => {
        var perintah = document.createElement("script");
        perintah.src = "/captcha/longbow.slidercaptcha.js";
        document.getElementsByTagName("head")[0].appendChild(perintah);
    }, []);

    return (
        <Fragment>
            {/* button captcha  */}
            <div style={{ marginTop: "30px" }}>
                <div className="box">

                    <input
                        id="one"
                        type="checkbox"
                        onClick={popupCaptcha} style={{ cursor: 'pointer' }}
                    />

                    <span className="check" id="check" />
                    <span className="checkLoad" id="checkLoad" style={{ display: 'none' }} />
                    <span className="checkDone hidden" id="checkDone" />
                    <label htmlFor="one">Verifikasi Keamanan</label>
                </div>
            </div>
            {/* end button captcha  */}

            {/* popup captcha  */}
            <div className="container-fluid" id="captchaqq" style={{ display: 'none' }}>
                <div className="form-row">
                    <div className="col-12">
                        <div className="slidercaptcha card" style={{ border: '1px solid #d9d9d9', backgroundColor: 'white' }}>
                            <div className="card-header" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                                <span>Selesaikan langkah keamanan.</span>
                            </div>
                            <div className="card-body">
                                <div id="captcha" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end popup captcha  */}

        </Fragment>
    );
}

export default SliderCaptcha;