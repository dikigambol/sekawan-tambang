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
        case 404:
            data = {
                icon: 'error',
                title: 'Invalid Username or Password!',
                message: 'menutup jendela...'
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