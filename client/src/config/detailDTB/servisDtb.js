import '../../config/cssDTB/buttonsDTB.css';
import DataTable from 'datatables.net-bs4';
import 'datatables.net-buttons-bs4';

function BbmDtb() {
    new DataTable('#tabel-servis', {
        "order": [[0, 'asc']],
        "paging": true,
        "ordering": true,
        "info": true,
        "filter": true,
        "pageLength": 10,
        "retrieve": true,
        language: {
            sEmptyTable: "Tidak Ada Data",
            sProcessing: "Sedang memproses...",
            sLengthMenu: "tampil : _MENU_",
            sZeroRecords: "Tidak ditemukan data yang sesuai",
            sInfo: "_END_ dari total _TOTAL_ data",
            sInfoEmpty: "0 data",
            sInfoFiltered: "(disaring dari _MAX_ data)",
            sInfoPostFix: "",
            sSearch: "Cari : ",
            sUrl: "",
            oPaginate: {
                sFirst: "Pertama",
                sPrevious: "&laquo;",
                sNext: "&raquo;",
                sLast: "Terakhir",
            },
        }
    });

    return (
        null
    );
}

export default BbmDtb;
