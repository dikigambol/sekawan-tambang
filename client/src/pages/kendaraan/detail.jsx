import React, { Component, Fragment } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import ConfDtb from '../../config/confDtb';
import { getBBM, getKendaraanById, getPemakaian, getServis } from '../../services/kendaraan';
import HistoriBBM from './bbm';
import HistoriServis from './servis';

class DetailKendaraan extends Component {

    state = {
        detail: [],
        dataBBM: [],
        dataServis: [],
        dataPemakaian: []
    }

    getAllData = async () => {
        const data = await Promise.all([
            getKendaraanById(this.props.match.params.id),
            getBBM(this.props.match.params.id),
            getServis(this.props.match.params.id),
            getPemakaian(this.props.match.params.id)
        ])
        this.setState({
            detail: data[0].data,
            dataBBM: data[1].data,
            dataServis: data[2].data,
            dataPemakaian: data[3].data,
        }, () => { ConfDtb() })
    }
    componentDidMount() {
        this.getAllData()
    }

    render() {
        const data = [
            { name: "19-10-2022", total_pemakaian: 10 },
            { name: "19-12-2022", total_pemakaian: 3 },
        ];
        return (
            <Fragment>
                <div className="smooth mb-2">
                    <div className="col-md-12 mb-3">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-xl-0">
                                <p className="abu" style={{ fontSize: "15px", fontWeight: "bold", color: "#999999", textTransform: "capitalize" }}>
                                    Detail&nbsp;&nbsp;&rsaquo;&nbsp;&nbsp;Detail Kendaraan
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="card card-custom">
                        <div className="card-body">
                            <div className="table-responsive pl-2 pr-2">
                                <table className="display expandable-table tableBord table-striped" style={{ width: "100%" }}>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td width="150px">Nama Kendaraan</td>
                                            <td width="5px"> : </td>
                                            <td width="600px">{this.state.detail.nama_kendaraan}</td>
                                        </tr>
                                        <tr>
                                            <td>Jenis</td>
                                            <td> : </td>
                                            <td>{this.state.detail.jenis}</td>
                                        </tr>
                                        <tr>
                                            <td>Tipe</td>
                                            <td> : </td>
                                            <td>{this.state.detail.tipe}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-12">
                            <p
                                className="card-title mb-3"
                                style={{ fontSize: "15px", marginTop: "10px" }}
                            >
                                Riwayat Pemakaian Bulan Ini
                            </p>
                            <ResponsiveContainer width="100%" height="85%">
                                <BarChart data={this.state.dataPemakaian} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="tanggal" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="total_pemakaian" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <HistoriBBM
                            id={this.props.match.params.id}
                            data={this.state.dataBBM}
                            reload={this.getAllData} />
                        <HistoriServis
                            id={this.props.match.params.id}
                            data={this.state.dataServis}
                            reload={this.getAllData}
                        />
                    </div>
                </div>
            </Fragment >
        );
    }
}

export default DetailKendaraan;