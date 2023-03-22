import { API } from '../API'
import user from '../../pages/auth/infoUser'

const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization": user.token,
    },
}

export async function getDriver() {
    try {
        const response = await API.get('driver')
        return response
    }
    catch (err) {
        return false
    }
}

export async function addDriver(data) {
    try {
        const response = await API.post('driver', data, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function editDriver(data, id) {
    try {
        const response = await API.patch(`driver/${id}`, data, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function deleteDriver(id) {
    try {
        const response = await API.delete(`driver/${id}`, config)
        return response
    }
    catch (err) {
        return false
    }
}