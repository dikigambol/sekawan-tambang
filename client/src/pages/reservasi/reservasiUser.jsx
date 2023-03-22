import React, { Component, Fragment } from 'react';
import ConfDtb from '../../config/confDtb';
import { sendMessage } from '../../molecules/message';
import { getReservasiById, setujuReservasi, tolakReservasi } from '../../services/reservasi';
import user from '../auth/infoUser';

class ReservasiUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataReservasi: [],
            isLoad: false
        }
    }

    getAllData = async () => {
        const data = await Promise.all([
            getReservasiById(user.id_user)
        ])
        this.setState({
            dataReservasi: data[0].data
        }, () => { ConfDtb() })
    }

    handleKonfirmasi = async (type, id, status, id_kendaraan, id_driver, tanggal) => {
        let data = { id, status, id_kendaraan, id_driver, tanggal}
        if (type == "setuju") {
            const res = await setujuReservasi(data)
            if (res) {
                sendMessage(res.status).then(() => {
                    this.getAllData()
                })
            }
        } else if (type == "tolak") {
            const res = await tolakReservasi(data)
            if (res) {
                sendMessage(res.status).then(() => {
                    this.getAllData()
                })
            }
        }
    }

    componentDidMount() {
        this.getAllData()
    }

    render() {
        return (
            <Fragment>
                <div className="col-md-12 mb-3">
                    <div className="row">
                        <div className="col-12 col-xl-8 mb-xl-0">
                            <p className="abu" style={{
                                fontSize: '15px', fontWeight: 'bold', color: '#999999',
                                textTransform: 'capitalize'
                            }}>
                                General&nbsp;&nbsp;&rsaquo;&nbsp;&nbsp;Reservasi
                            </p>
                        </div>
                    </div>
                </div>

                <div id="smoothMain">
                    <div className="card card-custom">
                        <div className="card-body">
                            <p
                                className="card-title text-center mb-3"
                                style={{ fontSize: "25px", marginTop: "10px" }}
                            >
                                Reservasi
                            </p>

                            <div className="table-responsive">
                                <table
                                    id="tabel"
                                    className="display expandable-table table-striped"
                                    style={{ width: "100%" }}
                                >
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama Driver</th>
                                            <th>Kendaraan</th>
                                            <th>Keperluan</th>
                                            <th>Tanggal Pinjam</th>
                                            <th>Tanggal Kembali</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.dataReservasi.map((list, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{list.nama_driver}</td>
                                                        <td>{list.nama_kendaraan}</td>
                                                        <td>{list.keperluan}</td>
                                                        <td>{list.tanggal_pinjam}</td>
                                                        <td>{list.tanggal_kembali ?? "-"}</td>
                                                        <td><span className='badge badge-warning'>perlu konfirmasi</span></td>
                                                        <td>
                                                            <div className="dropdown">
                                                                <button className="btn btn-primary dropdown-toggle"
                                                                    style={{ padding: '10px', borderRadius: '5px' }}
                                                                    type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    Pilih
                                                                </button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    <a className="dropdown-item" href='#' onClick={() => this.handleKonfirmasi("setuju", list.id_rsv, list.status, list.id_kendaraan, list.id_driver, list.tanggal_pinjam)} data-toggle="modal" data-target="#exampleModal">
                                                                        <i className="fa fa-check" />&nbsp;&nbsp;setujui
                                                                    </a>
                                                                    <a className="dropdown-item" href='#' onClick={() => { this.handleKonfirmasi("tolak", list.id_rsv, list.status, list.id_kendaraan, list.id_driver, list.tanggal_pinjam) }}>
                                                                        <i className="fa fa-times" />&nbsp;&nbsp;&nbsp;tolak
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ReservasiUser;