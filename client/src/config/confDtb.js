import '../config/cssDTB/buttonsDTB.css';
const $ = require("jquery");
$.Datatable = require("datatables.net");
require('datatables.net-buttons')(window, $);
require('datatables.net-buttons/js/buttons.html5.js')();

function ConfDtb() {

    $('#tabel').DataTable({
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
        },
    });


    $('#Jadwal').dataTable({
        "retrieve": true,
        "paging": false,
        "ordering": false,
        "info": false,
        "filter": true,
        "order": [[4, 'asc']],
        "autoWidth": false,
        language: {
            sEmptyTable: "Tidak Ada Data",
            sProcessing: "Sedang memproses...",
            sLengthMenu: "tampil : _MENU_",
            sZeroRecords: "Tidak ditemukan data yang sesuai",
            sInfo: "_END_ dari total _TOTAL_ data",
            sInfoEmpty: "0 data",
            sInfoFiltered: "(disaring dari _MAX_ data)",
            sInfoPostFix: "",
            sSearch: "Cari jadwal kuliah : ",
            sUrl: "",
            oPaginate: {
                sFirst: "Pertama",
                sPrevious: "&laquo;",
                sNext: "&raquo;",
                sLast: "Terakhir",
            },
        },
    });

    $('#jadwalreguler').DataTable({
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
        },
    });

    $('#jadwaleksekutif').DataTable({
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
        },
    });

    $('#agenda').dataTable({
        "retrieve": true,
        "paging": true,
        "ordering": true,
        "info": false,
        "filter": true,
        "pageLength": 10,
        language: {
            sEmptyTable: "Tidak Ada Data",
            sProcessing: "Sedang memproses...",
            sLengthMenu: "tampil : _MENU_",
            sZeroRecords: "Tidak ditemukan data yang sesuai",
            sInfo: "_END_ dari total _TOTAL_ data",
            sInfoEmpty: "0 data",
            sInfoFiltered: "(disaring dari _MAX_ data)",
            sInfoPostFix: "",
            sSearch: "Cari agenda : ",
            sUrl: "",
            oPaginate: {
                sFirst: "Pertama",
                sPrevious: "&laquo;",
                sNext: "&raquo;",
                sLast: "Terakhir",
            },
        },
    });

    $('#genPass').DataTable({
        "paging": false,
        "ordering": false,
        "info": false,
        "processing": true,
        "retrieve": true,
        colReorder: {
            realtime: false
        },
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                title: '',
                exportOptions: {
                    columns: [0, 1, 2, 3]
                }
            },
        ],
        language: {
            sEmptyTable: "Tidak Ada Data",
            sProcessing: "Sedang memproses...",
            sLengthMenu: "tampil : _MENU_",
            sZeroRecords: "Tidak ditemukan data yang sesuai",
            sInfo: "_END_ dari total _TOTAL_ data",
            sInfoEmpty: "0 data",
            sInfoFiltered: "(disaring dari _MAX_ data)",
            sInfoPostFix: "",
            sSearch: "Cari mahasiswa : ",
            sUrl: "",
            oPaginate: {
                sFirst: "Pertama",
                sPrevious: "&laquo;",
                sNext: "&raquo;",
                sLast: "Terakhir",
            },
        },
    });
    $('.buttons-excel').html('<span><i class="fa fa-print"></i>&nbsp;&nbsp;export to excel</span>');

    $('#MK').dataTable({
        "retrieve": true,
        "paging": false,
        "ordering": true,
        "info": false,
        "filter": true,
        "order": [[4, 'asc']],
        "autoWidth": false,
        language: {
            sEmptyTable: "Tidak Ada Data",
            sProcessing: "Sedang memproses...",
            sLengthMenu: "tampil : _MENU_",
            sZeroRecords: "Tidak ditemukan data yang sesuai",
            sInfo: "_END_ dari total _TOTAL_ data",
            sInfoEmpty: "0 data",
            sInfoFiltered: "(disaring dari _MAX_ data)",
            sInfoPostFix: "",
            sSearch: "Cari mata kuliah : ",
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

export default ConfDtb;
