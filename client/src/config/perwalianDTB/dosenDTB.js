const $ = require("jquery");
$.Datatable = require("datatables.net");

function DosenDTB() {

    $('#dosenDTB').DataTable({
        "info": false,
        "pageLength": 10,
        "processing": true,
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

export default DosenDTB;