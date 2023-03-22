import React, { Component, createRef, Fragment } from 'react';
import ConfDtb from '../../config/confDtb';
import { sendMessage } from '../../molecules/message';
import { getTambang } from '../../services/tambang';
import { addUser, deleteUser, editUser, getUsers } from '../../services/users';
import user from '../auth/infoUser';
const $ = require("jquery");
$.Datatable = require("datatables.net");

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataUser: [],
            dataTambang: [],
            form: {
                role: "",
                id_lok_tbg: "",
                nama: "",
                username: ""
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

    getTambang = async () => {
        const res = await getTambang()
        if (res) {
            this.setState({
                dataTambang: res.data
            })
        }
    }

    getAllUser = async () => {
        const res = await getUsers()
        if (res) {
            this.setState({
                dataUser: res.data
            }, () => {
                ConfDtb()
            })
        }
    }

    clearState = () => {
        this.setState({
            form: {
                role: "",
                id_lok_tbg: "",
                nama: "",
                username: ""
            },
            type: "add"
        })
    }

    handleEdit = (id) => {
        this.setState({ type: 'edit' })
        let val = this.state.dataUser.filter(
            (x) => x.id_user === id
        );
        let res = val[0];
        this.setState({
            form: {
                ...res,
                password: ""
            }
        })
    }

    handleUser = async (e, type, id) => {
        e.preventDefault()
        if (type == "add") {
            this.setState({ isLoad: true })
            const res = await addUser(this.state.form)
            if (res) {
                this.setState({ isLoad: false })
                this.closeAddModal.current.click()
                this.clearState()
                sendMessage(res.status).then(() => {
                    this.getAllUser()
                })
            }
        } else if (type == "edit") {
            let data = {
                role: this.state.form.role,
                id_lok_tbg: this.state.form.id_lok_tbg,
                nama: this.state.form.nama,
                username: this.state.form.username,
                password: this.state.form.password
            }
            this.setState({ isLoad: true })
            const res = await editUser(data, this.state.form.id_user)
            if (res) {
                this.setState({ isLoad: false })
                this.closeAddModal.current.click()
                this.clearState()
                sendMessage(res.status).then(() => {
                    this.getAllUser()
                })
            }
        } else if (type == "delete") {
            const res = await deleteUser(id)
            if (res) {
                sendMessage(res.status).then(() => {
                    this.getAllUser()
                })
            }
        }
    }

    componentDidMount() {
        this.getTambang()
        this.getAllUser()
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
                                Users&nbsp;&nbsp;&rsaquo;&nbsp;&nbsp;Data User
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
                                Data User
                            </p>

                            <button type="button" className="btn btn-add" data-toggle="modal" data-target="#exampleModal"
                                style={{ marginBottom: '25px' }} onClick={this.clearState}
                            >
                                <i className="ti-plus"></i>&nbsp;&nbsp;tambah user
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
                                            <th>Nama</th>
                                            <th>Username</th>
                                            <th>Role</th>
                                            <th>Lokasi Tambang</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.dataUser.map((list, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{list.nama}</td>
                                                        <td>{list.username}</td>
                                                        <td>{list.role == 1 ? <span className="badge badge-primary">admin</span> :
                                                            <span className="badge badge-dark">anggota</span>}</td>
                                                        <td>{list.nama_lok_tbg ?? "-"}</td>
                                                        <td>
                                                            {list.id_user == user.id_user ? "-" :
                                                                <div className="dropdown">
                                                                    <button className="btn btn-primary dropdown-toggle"
                                                                        style={{ padding: '10px', borderRadius: '5px' }}
                                                                        type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        Pilih
                                                                    </button>
                                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                        <a className="dropdown-item" href='#' onClick={() => this.handleEdit(list.id_user)} data-toggle="modal" data-target="#exampleModal">
                                                                            <i className="fa fa-pencil" />&nbsp;&nbsp;ubah
                                                                        </a>
                                                                        <a className="dropdown-item" href='#' onClick={(e) => { this.handleUser(e, "delete", list.id_user) }}>
                                                                            <i className="fa fa-trash" />&nbsp;&nbsp;hapus
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            }
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
                    <form onSubmit={(e) => { this.handleUser(e, this.state.type) }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="exampleModalLabel">Modal User</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" ref={this.closeAddModal}>
                                        <span aria-hidden="true" className="close-btn">×</span>
                                    </button>
                                </div>
                                <div className="modal-body" style={{ marginTop: '-3%', marginBottom: '-12%' }}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Role :</label>
                                                <select name="role" className='form-control' onChange={this.handleChange} value={this.state.form.role}>
                                                    <option value="">- pilih -</option>
                                                    <option value="1">admin</option>
                                                    <option value="2">anggota</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Nama :</label>
                                                <input type="text" name='nama' className='form-control' onChange={this.handleChange} value={this.state.form.nama} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Lokasi Tambang :</label>
                                                <select name="id_lok_tbg" className='form-control' onChange={this.handleChange} value={this.state.form.id_lok_tbg}>
                                                    <option value="">- pilih -</option>
                                                    {
                                                        this.state.dataTambang.map((list, i) => {
                                                            return (
                                                                <option value={list.id_lok_tbg} key={i}>{list.nama_lok_tbg}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Username :</label>
                                                <input type="text" name='username' className='form-control' onChange={this.handleChange} value={this.state.form.username} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Password :</label>
                                                <input type="text" name='password' className='form-control' onChange={this.handleChange} value={this.state.form.password} />
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

export default Users;