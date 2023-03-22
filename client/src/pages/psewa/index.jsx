import React, { Component, createRef, Fragment } from 'react';
import ConfDtb from '../../config/confDtb';
import { sendMessage } from '../../molecules/message';
import { addPsewa, deletePsewa, editPsewa, getPsewa } from '../../services/psewa'
const $ = require("jquery");
$.Datatable = require("datatables.net");

class Psewa extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataPsewa: [],
            form: {
                nama_ps: ""
            },
            type: "add",
            isLoad: false
        }
        this.closeAddModal = createRef();
    }

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    getAllPsewa = async () => {
        const res = await getPsewa()
        if (res) {
            this.setState({
                dataPsewa: res.data
            }, () => {
                ConfDtb()
            })
        }
    }

    clearState = () => {
        this.setState({
            form: {
                nama_ps: ""
            },
            type: "add"
        })
    }

    handleEdit = (id) => {
        this.setState({ type: 'edit' })
        let val = this.state.dataPsewa.filter(
            (x) => x.id_ps === id
        );
        let res = val[0];
        this.setState({
            form: res
        })
    }

    handlePsewa = async (e, type, id) => {
        e.preventDefault()
        if (type == "add") {
            this.setState({ isLoad: true })
            const res = await addPsewa(this.state.form)
            if (res) {
                this.setState({ isLoad: false })
                this.closeAddModal.current.click()
                this.clearState()
                sendMessage(res.status).then(() => {
                    this.getAllPsewa()
                })
            }
        } else if (type == "edit") {
            this.setState({ isLoad: true })
            const res = await editPsewa(this.state.form, this.state.form.id_ps)
            if (res) {
                this.setState({ isLoad: false })
                this.closeAddModal.current.click()
                this.clearState()
                sendMessage(res.status).then(() => {
                    this.getAllPsewa()
                })
            }
        } else if (type == "delete") {
            const res = await deletePsewa(id)
            if (res) {
                sendMessage(res.status).then(() => {
                    this.getAllPsewa()
                })
            }
        }
    }

    componentDidMount() {
        this.getAllPsewa()
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
                                Kendaraan&nbsp;&nbsp;&rsaquo;&nbsp;&nbsp;Perusahaan Sewa
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
                                Data Perusahaan Sewa
                            </p>

                            <button type="button" className="btn btn-add" data-toggle="modal" data-target="#exampleModal"
                                style={{ marginBottom: '25px' }} onClick={this.clearState}
                            >
                                <i className="ti-plus"></i>&nbsp;&nbsp;tambah perusahaan sewa
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
                                            <th>Nama Perusahaan Sewa</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.dataPsewa.map((list, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{list.nama_ps}</td>
                                                        <td>
                                                            <div className="dropdown">
                                                                <button className="btn btn-primary dropdown-toggle"
                                                                    style={{ padding: '10px', borderRadius: '5px' }}
                                                                    type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    Pilih
                                                                </button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    <a className="dropdown-item" href='#' onClick={() => this.handleEdit(list.id_ps)} data-toggle="modal" data-target="#exampleModal">
                                                                        <i className="fa fa-pencil" />&nbsp;&nbsp;ubah
                                                                    </a>
                                                                    <a className="dropdown-item" href='#' onClick={(e) => { this.handlePsewa(e, "delete", list.id_ps) }}>
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
                    <form onSubmit={(e) => { this.handlePsewa(e, this.state.type) }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="exampleModalLabel">Modal Perusahaan Sewa</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" ref={this.closeAddModal}>
                                        <span aria-hidden="true" className="close-btn">×</span>
                                    </button>
                                </div>
                                <div className="modal-body" style={{ marginTop: '-3%', marginBottom: '-12%' }}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Nama Perusahaan Sewa:</label>
                                                <input type="text" name='nama_ps' className='form-control' onChange={this.handleChange} value={this.state.form.nama_ps} />
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

export default Psewa;