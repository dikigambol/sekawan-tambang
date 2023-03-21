import React, { useEffect } from 'react';
import confDTB from '../../config/confDtb';

function Agenda() {
    useEffect(() => {
        confDTB()
    })
    return (
        <table id="agenda" className="display expandable-table tableBord table-striped" style={{ width: '100%' }}>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Tanggal</th>
                    <th data-orderable="false">Keterangan Agenda</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    )
}

export default Agenda