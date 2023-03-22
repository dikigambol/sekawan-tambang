import { API } from '../API'
import user from '../../pages/auth/infoUser'

const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization": user.token,
    },
}

export async function getTambang() {
    try {
        const response = await API.get('tambang')
        return response
    }
    catch (err) {
        return false
    }
}

export async function addTambang(data) {
    try {
        const response = await API.post('tambang', data, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function editTambang(data, id) {
    try {
        const response = await API.patch(`tambang/${id}`, data, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function deleteTambang(id) {
    try {
        const response = await API.delete(`tambang/${id}`, config)
        return response
    }
    catch (err) {
        return false
    }
}