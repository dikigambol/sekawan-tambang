import { API } from '../API'
import user from '../../pages/auth/infoUser'

const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization": user.token,
    },
}

export async function getUsers() {
    try {
        const response = await API.get('users')
        return response
    }
    catch (err) {
        return false
    }
}

export async function getUsersByTambang(id) {
    try {
        const response = await API.get('optionuser/' + id)
        return response
    }
    catch (err) {
        return false
    }
}

export async function addUser(data) {
    try {
        const response = await API.post('users', data, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function editUser(data, id) {
    try {
        const response = await API.patch(`users/${id}`, data, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function deleteUser(id) {
    try {
        const response = await API.delete(`users/${id}`, config)
        return response
    }
    catch (err) {
        return false
    }
}