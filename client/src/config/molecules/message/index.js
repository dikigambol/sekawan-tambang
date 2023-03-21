import swal from "sweetalert"

export const sendMessage = (params) => {
    let data = []
    switch (params) {
        case 200:
            data = {
                icon: 'success',
                title: 'Berhasil!',
                message: 'menutup jendela...'
            }
            break;
        case 400:
            data = {
                icon: 'error',
                title: 'Bad Request',
                message: 'silahkan tunggu dan coba kembali nanti'
            }
            break;
        case 408: 
            data = {
                icon: 'info',
                title: 'Tidak ada data terpilih',
                message: 'silahkan cek kembali data anda'
            }
            break;
        case 409:
            data = {
                icon: 'info',
                title: 'Data sudah ada',
                message: 'silahkan cek kembali data anda'
            }
            break;
        case 410:
            data = {
                icon: 'info',
                title: 'Melebihi limit SKS',
                message: 'silahkan cek kembali data anda'
            }
            break;
        case 411:
            data = {
                icon: 'info',
                title: 'Ada jadwal yang sama',
                message: 'silahkan cek kembali data anda'
            }
            break;
        case 412:
            data = {
                icon: 'info',
                title: 'Kapasitas ruangan sudah penuh',
                message: 'silahkan pilih jadwal lain yang tersedia'
            }
            break;
        case 413:
            data = {
                icon: 'info',
                title: 'Jam kelas tidak sesuai',
                message: 'silahkan cek kembali jam kelas anda'
            }
            break;
        case 500:
            data = {
                icon: 'error',
                title: 'Internal Server Error',
                message: 'silahkan tunggu dan coba kembali nanti'
            }
            break;
        default: 
            return null
    }

    return swal({
        icon: data.icon,
        title: data.title,
        text: data.message,
        buttons: false,
        timer: 3000
    })
}