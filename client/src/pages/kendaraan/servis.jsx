import React, { Component } from 'react'
import { sendMessage } from '../../molecules/message'
import { addServis, deleteServis, getServis } from '../../services/kendaraan'
import $ from 'jquery'
import ServisDtb from '../../config/detailDTB/servisDtb'

export default class HistoriServis extends Component {

    state = {
        form: [],
        dataServis: [],
        isLoad: false
    }

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    addServis = async () => {
        this.setState({ isLoad: true })
        let data = {
            ...this.state.form,
            id_kendaraan: this.props.id
        }
        const res = await addServis(data)
        if (res.status == 200) {
            $('input').val('');
            this.setState({ isLoad: false })
            sendMessage(200).then(() => {
                this.getServis()
            })
        }
    }

    deleteServis = async (id) => {
        const res = await deleteServis(id)
        if (res.status == 200) {
            sendMessage(200).then(() => {
                this.getServis()
            })
        }
    }

    getServis = async () => {
        $('#tabel-servis').DataTable().destroy();
        const res = await getServis(this.props.id)
        if (res) {
            this.setState({ dataServis: res.data }, () => { ServisDtb() })
        }
    }

    componentDidMount() {
        this.getServis()
    }

    render() {
        return (
            <div className="col-md-6 mt-3">
                <div className="card card-custom">
                    <div className="card-body">
                        <p
                            className="card-title mb-3"
                            style={{ fontSize: "15px", marginTop: "10px" }}
                        >
                            Riwayat Servis
                        </p>

                        <input type="date" className='form-control mt-3' placeholder='tanggal' name='tanggal' onChange={this.handleChange} />
                        <input type="text" className='form-control mt-3' placeholder='keterangan' name='keterangan' onChange={this.handleChange} />
                        <button className='btn btn-success btn-block mt-3 mb-3' onClick={this.addServis} disabled={this.state.isLoad}>
                            {this.state.isLoad ? "proses.." : "tambah"}
                        </button>

                        <div className="table-responsive">
                            <table
                                id="tabel-servis"
                                className="display expandable-table table-striped"
                                style={{ width: "100%" }}
                            >
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Tanggal</th>
                                        <th>Kerusakan</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.dataServis.map((list, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{list.tanggal}</td>
                                                    <td>{list.keterangan}</td>
                                                    <td>
                                                        <i className="fa fa-trash text-danger" style={{ cursor: 'pointer' }}
                                                            onClick={() => { this.deleteServis(list.id_service) }}
                                                        />
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
        )
    }
}
