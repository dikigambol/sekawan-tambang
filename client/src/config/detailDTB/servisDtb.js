import '../../config/cssDTB/buttonsDTB.css';
const $ = require("jquery");
$.Datatable = require("datatables.net");
require('datatables.net-buttons')(window, $);
require('datatables.net-buttons/js/buttons.html5.js')();

function ServisDtb() {
    $('#tabel-servis').DataTable({
        "order": [[0, 'asc']],
        "paging": true,
        "ordering": true,
        "info": false,
        "filter": false,
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
        },
    });
    return (
        null
    );
}

export default ServisDtb;
