import React, { Component, Fragment } from 'react';
import Setting from '../admin-component/templates/Setting';
import Agenda from './Agenda';
import $ from 'jquery';

class Dashboard extends Component {
    componentDidMount = () => {
        // jam 
        function time() {
            var d = new Date();
            var s = d.getSeconds();
            var m = d.getMinutes();
            var h = d.getHours();
            if (document.getElementById("jam") != null) {
                document.getElementById("jam").innerHTML = ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2)
                document.getElementById("s").innerHTML = " " + ("0" + s).substr(-2)
                if (h >= 6 && h <= 17) {
                    document.getElementById("ikon").classList.add("icon-sun")
                } else {
                    document.getElementById("ikon").classList.add("icon-moon")
                }
            }
        }
        setInterval(time, 1000);

        // toogle dark light mode 
        $("#settings-trigger").on("click", function () {
            $("#theme-settings").toggleClass("open");
        });
    }

    render() {
        // tanggalan 
        let arrbulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        let date = new Date();
        let tanggal = date.getDate();
        let bulan = date.getMonth();
        let tahun = date.getFullYear();
        return (
            <Fragment>
                <div id="smoothMain">
                    <div className="row">
                        <div className="col-md-12 grid-margin">
                            <div className="row" id="captionDash">
                                <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                    <h3 className="font-weight-bold">
                                        Hi ! {JSON.parse(localStorage.getItem("jwt")).data.username.toUpperCase()}
                                    </h3>
                                    <h6 className="font-weight-normal mb-0 mt-1" style={{ lineHeight: '1.3' }}>Selamat datang di aplikasi<span className="text-primary"> SIMAKA Dosen Institut Asia Malang</span></h6>
                                </div>
                                <div className="col-12 col-xl-4">
                                    <div className="justify-content-end d-flex">
                                        <Setting />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 grid-margin stretch-card">
                            <div className="card tale-bg">
                                <div className="weather-info">
                                    <div className="jamQQQ">
                                        <h1 className="mb-0 font-weight-normal fontjam hitam" id="clock"><i className='mr-2' id="ikon" /><a id="jam">00:00</a><sup id="s">00</sup></h1>
                                    </div>
                                    <div className="ml-2 mt-3 mar">
                                        <h4 className="location font-weight-normal fonttgl hitam">{tanggal + " " + arrbulan[bulan] + " " + tahun}</h4>
                                        <h4 className="font-weight-normal mt-2 fonttgl hitam">Simaka Dosen.</h4>
                                    </div>
                                </div>
                                <div className="card-people mt-auto">
                                    <img src="adminAset/images/dashboard/bg.svg" alt="people" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 grid-margin transparent rincian">
                            <div className="row">
                                <div className="col-md-6 mb-4 stretch-card transparent">
                                    <div className="card card-tale">
                                        <div className="card-body">
                                            <p className="mb-4 putih">Jumlah Mahasiswa</p>
                                            <p className="fs-30 mb-2 putih">-</p>
                                            <p className="putih">total jumlah</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4 stretch-card transparent">
                                    <div className="card card-dark-blue">
                                        <div className="card-body">
                                            <p className="mb-4 putih">Jumlah Prodi</p>
                                            <p className="fs-30 mb-2 putih">-</p>
                                            <p className="putih">total jumlah</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-4 mb-xl-0 stretch-card transparent">
                                    <div className="card card-light-green">
                                        <div className="card-body">
                                            <p className="mb-4 putih">Jumlah Dosen Tetap</p>
                                            <p className="fs-30 mb-2 putih">-</p>
                                            <p className="putih">total jumlah</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 stretch-card transparent">
                                    <div className="card card-light-danger">
                                        <div className="card-body">
                                            <p className="mb-4 putih">Jumlah Dosen Semi</p>
                                            <p className="fs-30 mb-2 putih">-</p>
                                            <p className="putih">total jumlah</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card card-custom">
                        <div className="card-body">
                            <p className="card-title text-center" style={{ fontSize: '24px', marginTop: '10px', marginBottom: '30px' }}>Daftar Agenda</p>
                            {/* agendaBox */}
                            <div className="table-responsive">
                                <Agenda />
                            </div>
                        </div>
                    </div>

                </div>
            </Fragment>
        );
    }
}

export default Dashboard;
