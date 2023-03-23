import React, { Component, createRef, Fragment } from 'react';
import ConfDtb from '../../config/confDtb';
import { sendMessage } from '../../molecules/message';
import { getDriver } from '../../services/driver';
import { getKendaraan, getKendaraanAktif } from '../../services/kendaraan';
import { addReservasi, deleteReservasi, editReservasi, getReservasi } from '../../services/reservasi';
import { getUsersByTambang } from '../../services/users';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const $ = require("jquery");
$.Datatable = require("datatables.net");

class ReservasiAdmin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataReservasi: [],
            dataKendaraan: [],
            dataKendaraanAktif: [],
            dataDriver: [],
            dataUser: [],
            form: {
                id_kendaraan: "",
                id_driver: "",
                keperluan: "",
                tanggal_pinjam: "",
                tanggal_kembali: "",
                acc1: "",
                acc2: "",
                status: 1
            },
            type: "add",
            isLoad: false
        }
        this.closeAddModal = createRef();
    }

    getAllData = async () => {
        $('#tabel').DataTable().destroy();
        const data = await Promise.all([
            getReservasi(),
            getKendaraan(),
            getDriver(),
            getKendaraanAktif(),
        ])
        this.setState({
            dataReservasi: data[0].data,
            dataKendaraan: data[1].data,
            dataDriver: data[2].data,
            dataKendaraanAktif: data[3].data,
        }, () => { ConfDtb() })
    }

    handleChange = (e) => {
        if (e.target.name == "id_driver") {
            getUsersByTambang(e.target.value).then((res) => {
                this.setState({ dataUser: res.data })
            })
        }
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    clearState = () => {
        this.setState({
            form: {
                id_kendaraan: "",
                id_driver: "",
                keperluan: "",
                tanggal_pinjam: "",
                tanggal_kembali: "",
                acc1: "",
                acc2: "",
                status: 1
            },
            type: "add"
        })
    }

    handleEdit = (id) => {
        this.setState({ type: 'edit' })
        let val = this.state.dataReservasi.filter(
            (x) => x.id_rsv === id
        );
        let res = val[0];
        getUsersByTambang(res.id_driver).then((res) => {
            this.setState({ dataUser: res.data })
        })
        this.setState({
            form: {
                id_rsv: res.id_rsv,
                id_kendaraan: res.id_kendaraan,
                id_driver: res.id_driver,
                keperluan: res.keperluan,
                tanggal_pinjam: res.tanggal_pinjam,
                tanggal_kembali: res.tanggal_kembali,
                acc1: res.acc1,
                acc2: res.acc2,
                status: res.status
            }
        })
    }

    handleReservasi = async (e, type, id) => {
        e.preventDefault()
        if (type == "add") {
            this.setState({ isLoad: true })
            const res = await addReservasi(this.state.form)
            if (res) {
                this.setState({ isLoad: false })
                this.closeAddModal.current.click()
                this.clearState()
                sendMessage(res.status).then(() => {
                    this.getAllData()
                })
            }
        } else if (type == "edit") {
            this.setState({ isLoad: true })
            const res = await editReservasi(this.state.form, this.state.form.id_rsv)
            if (res) {
                this.setState({ isLoad: false })
                this.closeAddModal.current.click()
                this.clearState()
                sendMessage(res.status).then(() => {
                    this.getAllData()
                })
            }
        } else if (type == "delete") {
            const res = await deleteReservasi(id)
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
                                Kendaraan&nbsp;&nbsp;&rsaquo;&nbsp;&nbsp;Reservasi
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

                            <button type="button" className="btn btn-add" data-toggle="modal" data-target="#exampleModal"
                                style={{ marginBottom: '25px' }} onClick={this.clearState}
                            >
                                <i className="ti-plus"></i>&nbsp;&nbsp;tambah reservasi
                            </button>

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
                                            <th>Yang Menyetujui</th>
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
                                                        <td>
                                                            <ul>
                                                                <li>{list.atasan_1_nama}&nbsp;&nbsp;{
                                                                    list.status == 2
                                                                        || list.status == 3
                                                                        || list.status == 4 ? <>&#10003;</> : null}</li>
                                                                <li>{list.atasan_2_nama}&nbsp;&nbsp;{
                                                                    list.status == 3
                                                                        || list.status == 4 ? <>&#10003;</> : null}</li>
                                                            </ul>
                                                        </td>
                                                        <td>
                                                            {list.status == 1 ||
                                                                list.status == 2 ? <span className='badge badge-info'>diproses</span> :
                                                                list.status == 3 ? <span className='badge badge-success'>aktif</span> :
                                                                    list.status == 4 ? <span className='badge badge-dark'>selesai</span> :
                                                                        <span className='badge badge-danger'>non-aktif</span>}
                                                        </td>
                                                        <td>
                                                            <div className="dropdown">
                                                                <button className="btn btn-primary dropdown-toggle"
                                                                    style={{ padding: '10px', borderRadius: '5px' }}
                                                                    type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    Pilih
                                                                </button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    <a className="dropdown-item" href='#' onClick={() => this.handleEdit(list.id_rsv)} data-toggle="modal" data-target="#exampleModal">
                                                                        <i className="fa fa-pencil" />&nbsp;&nbsp;ubah
                                                                    </a>
                                                                    <a className="dropdown-item" href='#' onClick={(e) => { this.handleReservasi(e, "delete", list.id_rsv) }}>
                                                                        <i className="fa fa-trash" />&nbsp;&nbsp;hapus
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
                            <p align="right" className='mt-4'>
                                <ReactHTMLTableToExcel
                                    id="cetakKrs"
                                    className="btn btn-success"
                                    table="table-to-xls"
                                    filename={`rekap-reservasi`}
                                    sheet="tablexls"
                                    buttonText="cetak to .xls" />
                            </p>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <form onSubmit={(e) => { this.handleReservasi(e, this.state.type) }}>
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="exampleModalLabel">Modal Reservasi</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" ref={this.closeAddModal}>
                                        <span aria-hidden="true" className="close-btn">×</span>
                                    </button>
                                </div>
                                <div className="modal-body" style={{ marginTop: '-3%', marginBottom: '-12%' }}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Kendaraan :</label>
                                                <select name="id_kendaraan" className='form-control' onChange={this.handleChange} required
                                                    value={this.state.form.id_kendaraan}>
                                                    <option value="">- pilih -</option>
                                                    {this.state.dataKendaraan.map((list, i) => {
                                                        return (
                                                            <option key={i} value={list.id_kendaraan}
                                                                disabled={list.ketersediaan == 0 ? true : false}
                                                            >{list.nama_kendaraan}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Driver :</label>
                                                <select name="id_driver" className='form-control' onChange={this.handleChange} required
                                                    value={this.state.form.id_driver}>
                                                    <option value="">- pilih -</option>
                                                    {this.state.dataDriver.map((list, i) => {
                                                        return (
                                                            <option key={i} value={list.id_driver}>{list.nama}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Keperluan :</label>
                                                <input type="text" name='keperluan' className='form-control' onChange={this.handleChange} required
                                                    value={this.state.form.keperluan} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Tanggal Pinjam :</label>
                                                <input type="date" name='tanggal_pinjam' className='form-control' onChange={this.handleChange} required
                                                    value={this.state.form.tanggal_pinjam} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Tanggal Kembali (Opsional) :</label>
                                                <input type="date" name='tanggal_kembali' className='form-control' onChange={this.handleChange}
                                                    value={this.state.form.tanggal_kembali} />
                                            </div>
                                        </div>
                                        {
                                            this.state.type == "edit" ?
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label>Status Reservasi :</label>
                                                        <select name="status" className='form-control' onChange={this.handleChange} disabled={this.state.form.status == 4 ? true : false}>
                                                            <option value={this.state.form.status}>- pilih -</option>
                                                            <option value="4" selected={this.state.form.status == 4 ? true : false}>selesai</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                : null
                                        }
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Atasan 1 :</label>
                                                <select name="acc1" className='form-control' onChange={this.handleChange} required
                                                    value={this.state.form.acc1}>
                                                    <option value="">- pilih -</option>
                                                    {this.state.dataUser.map((list, i) => {
                                                        return (
                                                            <option key={i} value={list.id_user}>{list.nama}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Atasan 2 :</label>
                                                <select name="acc2" className='form-control' onChange={this.handleChange} required
                                                    value={this.state.form.acc2}>
                                                    <option value="">- pilih -</option>
                                                    {this.state.dataUser.map((list, i) => {
                                                        return (
                                                            <option key={i} value={list.id_user}>{list.nama}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <button style={{ zIndex: '999' }} type="submit" className="btn btn-add-modal">
                                    {this.state.isLoad ? "Proses..." : this.state.type == "add" ? "Tambah Data" : "Simpan Data"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {/* end modal  */}

                {/* excel print  */}
                <table id="table-to-xls" style={{ display: 'none' }}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Driver</th>
                            <th>Kendaraan</th>
                            <th>Keperluan</th>
                            <th>Tanggal Pinjam</th>
                            <th>Tanggal Kembali</th>
                            <th>Status</th>
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
                                        <td>
                                            {list.status == 1 ||
                                                list.status == 2 ? "diproses" :
                                                list.status == 3 ? "aktif" :
                                                    list.status == 4 ? "selesai" :
                                                        "non-aktif"}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

export default ReservasiAdmin;