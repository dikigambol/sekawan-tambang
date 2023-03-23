import React, { Component } from 'react'
import { sendMessage } from '../../molecules/message'
import { addBBM, deleteBBM, getBBM } from '../../services/kendaraan'
import BbmDtb from '../../config/detailDTB/bbmDtb'
const $ = require("jquery")
$.Datatable = require("datatables.net")

export default class HistoriBBM extends Component {

    state = {
        form: [],
        dataBBM: [],
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

    addBBM = async () => {
        this.setState({ isLoad: true })
        let data = {
            ...this.state.form,
            id_kendaraan: this.props.id
        }
        const res = await addBBM(data)
        if (res.status == 200) {
            $('input').val('');
            this.setState({ isLoad: false })
            sendMessage(200).then(() => {
                this.getBBM()
            })
        }
    }

    deleteBBM = async (id) => {
        const res = await deleteBBM(id)
        if (res.status == 200) {
            sendMessage(200).then(() => {
                this.getBBM()
            })
        }
    }

    getBBM = async () => {
        $('#tabel-bbm').DataTable().destroy();
        const res = await getBBM(this.props.id)
        if (res) {
            this.setState({ dataBBM: res.data }, () => { BbmDtb() })
        }
    }

    componentDidMount() {
        this.getBBM()
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
                            Riwayat BBM
                        </p>

                        <input type="date" className='form-control mt-3' placeholder='tanggal' name='tanggal' onChange={this.handleChange} />
                        <input type="number" className='form-control mt-3' placeholder='nominal' name='nominal' onChange={this.handleChange} />
                        <button className='btn btn-success btn-block mt-3 mb-3' onClick={this.addBBM} disabled={this.state.isLoad}>
                            {this.state.isLoad ? "proses.." : "tambah"}
                        </button>

                        <div className="table-responsive">
                            <table
                                id="tabel-bbm"
                                className="display expandable-table table-striped"
                                style={{ width: "100%" }}
                            >
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Tanggal</th>
                                        <th>Nominal</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.dataBBM.map((list, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{list.tanggal}</td>
                                                    <td>{list.nominal}</td>
                                                    <td>
                                                        <i className="fa fa-trash text-danger" style={{ cursor: 'pointer' }}
                                                            onClick={() => { this.deleteBBM(list.id_bbm) }}
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
