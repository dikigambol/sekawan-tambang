import { API } from '../API'
import user from '../../pages/auth/infoUser'

const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization": user.token,
    },
}

export async function getPsewa() {
    try {
        const response = await API.get('psewa')
        return response
    }
    catch (err) {
        return false
    }
}

export async function addPsewa(data) {
    try {
        const response = await API.post('psewa', data, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function editPsewa(data, id) {
    try {
        const response = await API.patch(`psewa/${id}`, data, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function deletePsewa(id) {
    try {
        const response = await API.delete(`psewa/${id}`, config)
        return response
    }
    catch (err) {
        return false
    }
}