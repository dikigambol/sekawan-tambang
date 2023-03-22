import React, { Component, createRef, Fragment } from 'react';
import ConfDtb from '../../config/confDtb';
import { sendMessage } from '../../molecules/message';
import { addKendaraan, deleteKendaraan, editKendaraan, getKendaraan } from '../../services/kendaraan';
import { getPsewa } from '../../services/psewa';
import { Link } from 'react-router-dom'
const $ = require("jquery");
$.Datatable = require("datatables.net");

class Kendaraan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataKendaraan: [],
            dataPsewa: [],
            form: {
                nama_kendaraan: "",
                jenis: "",
                tipe: "",
                id_ps: ""
            },
            type: "add",
            isLoad: false
        }
        this.closeAddModal = createRef();
    }

    handleJenis = (e) => {
        let val = e.target.value == "pribadi" ? "" : this.state.form.id_ps
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
                id_ps: val
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        })
    }

    getPsewa = async () => {
        const res = await getPsewa()
        if (res) {
            this.setState({
                dataPsewa: res.data
            })
        }
    }

    getAllKendaraan = async () => {
        const res = await getKendaraan()
        if (res) {
            this.setState({
                dataKendaraan: res.data
            }, () => {
                ConfDtb()
            })
        }
    }

    clearState = () => {
        this.setState({
            form: {
                nama_kendaraan: "",
                jenis: "",
                tipe: "",
                id_ps: ""
            },
            type: "add"
        })
    }

    handleEdit = (id) => {
        this.setState({ type: 'edit' })
        let val = this.state.dataKendaraan.filter(
            (x) => x.id_kendaraan === id
        );
        let res = val[0];
        this.setState({
            form: res
        })
    }

    handleKendaraan = async (e, type, id) => {
        e.preventDefault()
        if (type == "add") {
            let data = {
                ...this.state.form,
                ketersediaan: 1
            }
            this.setState({ isLoad: true })
            const res = await addKendaraan(data)
            if (res) {
                this.setState({ isLoad: false })
                this.closeAddModal.current.click()
                this.clearState()
                sendMessage(res.status).then(() => {
                    this.getAllKendaraan()
                })
            }
        } else if (type == "edit") {
            this.setState({ isLoad: true })
            const res = await editKendaraan(this.state.form, this.state.form.id_kendaraan)
            if (res) {
                this.setState({ isLoad: false })
                this.closeAddModal.current.click()
                this.clearState()
                sendMessage(res.status).then(() => {
                    this.getAllKendaraan()
                })
            }
        } else if (type == "delete") {
            const res = await deleteKendaraan(id)
            if (res) {
                sendMessage(res.status).then(() => {
                    this.getAllKendaraan()
                })
            }
        }
    }

    componentDidMount() {
        this.getPsewa()
        this.getAllKendaraan()
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
                                Kendaraan&nbsp;&nbsp;&rsaquo;&nbsp;&nbsp;Data Kendaraan
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
                                Data Kendaraan
                            </p>

                            <button type="button" className="btn btn-add" data-toggle="modal" data-target="#exampleModal"
                                style={{ marginBottom: '25px' }} onClick={this.clearState}
                            >
                                <i className="ti-plus"></i>&nbsp;&nbsp;tambah kendaraan
                            </button>

                            <div className="table-responsive" id="mhsTabel">
                                <table
                                    id="tabel"
                                    className="display expandable-table table-striped"
                                    style={{ width: "100%" }}
                                >
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama Kendaraan</th>
                                            <th>Jenis</th>
                                            <th>Tipe</th>
                                            <th>Perusahaan Sewa</th>
                                            <th>Ketersediaan</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.dataKendaraan.map((list, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{list.nama_kendaraan}</td>
                                                        <td>{list.jenis}</td>
                                                        <td>{list.tipe}</td>
                                                        <td>{list.nama_ps ?? "-"}</td>
                                                        <td>{list.ketersediaan == 1 ? <span className="badge badge-success">tersedia</span> : <span className="badge badge-danger">tidak</span>}</td>
                                                        <td>
                                                            <div className="dropdown">
                                                                <button className="btn btn-primary dropdown-toggle"
                                                                    style={{ padding: '10px', borderRadius: '5px' }}
                                                                    type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    Pilih
                                                                </button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    <Link className="dropdown-item" to={"/detail-kendaraan/" + list.id_kendaraan}>
                                                                        <i className="fa fa-eye" />&nbsp;&nbsp;detail
                                                                    </Link>
                                                                    <a className="dropdown-item" href='#' onClick={() => this.handleEdit(list.id_kendaraan)} data-toggle="modal" data-target="#exampleModal">
                                                                        <i className="fa fa-pencil" />&nbsp;&nbsp;ubah
                                                                    </a>
                                                                    <a className="dropdown-item" href='#' onClick={(e) => { this.handleKendaraan(e, "delete", list.id_kendaraan) }}>
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
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <form onSubmit={(e) => { this.handleKendaraan(e, this.state.type) }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="exampleModalLabel">Modal Kendaraan</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" ref={this.closeAddModal}>
                                        <span aria-hidden="true" className="close-btn">×</span>
                                    </button>
                                </div>
                                <div className="modal-body" style={{ marginTop: '-3%', marginBottom: '-12%' }}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Nama Kendaraan:</label>
                                                <input type="text" name='nama_kendaraan' className='form-control' onChange={this.handleChange} value={this.state.form.nama_kendaraan} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Jenis :</label>
                                                <select name="jenis" className='form-control' onChange={this.handleJenis} value={this.state.form.jenis}>
                                                    <option value="">- pilih -</option>
                                                    <option value="pribadi">pribadi</option>
                                                    <option value="sewa">sewa</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Tipe :</label>
                                                <select name="tipe" className='form-control' onChange={this.handleChange} value={this.state.form.tipe}>
                                                    <option value="">- pilih -</option>
                                                    <option value="angkutan orang">angkutan orang</option>
                                                    <option value="angkutan barang">angkutan barang</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Perusahaan Sewa :</label>
                                                <select name="id_ps" className='form-control' onChange={this.handleChange} value={this.state.form.id_ps}>
                                                    <option value="">- pilih -</option>
                                                    {
                                                        this.state.dataPsewa.map((list, i) => {
                                                            return (
                                                                <option value={list.id_ps} key={i}>{list.nama_ps}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button style={{ zIndex: '999' }} type="submit" className="btn btn-add-modal" disabled={this.state.isLoad}>
                                    {this.state.isLoad ? "Proses..." : this.state.type == "add" ? "Tambah Data" : "Simpan Data"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {/* end modal  */}
            </Fragment>
        );
    }
}

export default Kendaraan;