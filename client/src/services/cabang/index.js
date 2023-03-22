import { API } from '../API'
import user from '../../pages/auth/infoUser'

const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization": user.token,
    },
}

export async function getCabang() {
    try {
        const response = await API.get('cabang')
        return response
    }
    catch (err) {
        return false
    }
}

export async function addCabang(data) {
    try {
        const response = await API.post('cabang', data, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function editCabang(data, id) {
    try {
        const response = await API.patch(`cabang/${id}`, data, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function deleteCabang(id) {
    try {
        const response = await API.delete(`cabang/${id}`, config)
        return response
    }
    catch (err) {
        return false
    }
}