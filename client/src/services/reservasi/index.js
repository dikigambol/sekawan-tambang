import { API } from '../API'
import user from '../../pages/auth/infoUser'

const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization": user.token,
    },
}

export async function getReservasi() {
    try {
        const response = await API.get('reservasi')
        return response
    }
    catch (err) {
        return false
    }
}

export async function getReservasiById(id) {
    try {
        const response = await API.get('reservasi/' + id)
        return response
    }
    catch (err) {
        return false
    }
}

export async function addReservasi(data) {
    try {
        const response = await API.post('reservasi', data, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function editReservasi(data, id) {
    try {
        const response = await API.patch(`reservasi/${id}`, data, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function deleteReservasi(id) {
    try {
        const response = await API.delete(`reservasi/${id}`, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function setujuReservasi(data) {
    try {
        const response = await API.post('setuju-reservasi', data, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function tolakReservasi(data) {
    try {
        const response = await API.post('tolak-reservasi', data, config)
        return response
    }
    catch (err) {
        return false
    }
}