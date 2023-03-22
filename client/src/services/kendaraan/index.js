import { API } from '../API'
import user from '../../pages/auth/infoUser'

const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization": user.token,
    },
}

export async function getKendaraan() {
    try {
        const response = await API.get('kendaraan')
        return response
    }
    catch (err) {
        return false
    }
}

export async function getKendaraanAktif() {
    try {
        const response = await API.get('kendaraan-aktif')
        return response
    }
    catch (err) {
        return false
    }
}

export async function getKendaraanById(id) {
    try {
        const response = await API.get('kendaraan/' + id)
        return response
    }
    catch (err) {
        return false
    }
}

export async function addKendaraan(data) {
    try {
        const response = await API.post('kendaraan', data, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function editKendaraan(data, id) {
    try {
        const response = await API.patch(`kendaraan/${id}`, data, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function deleteKendaraan(id) {
    try {
        const response = await API.delete(`kendaraan/${id}`, config)
        return response
    }
    catch (err) {
        return false
    }
}

// bbm 

export async function getBBM(id) {
    try {
        const response = await API.get('bbm/' + id)
        return response
    }
    catch (err) {
        return false
    }
}

export async function addBBM(data) {
    try {
        const response = await API.post('bbm', data, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function deleteBBM(id) {
    try {
        const response = await API.delete('bbm/' + id, config)
        return response
    }
    catch (err) {
        return false
    }
}

// servis 

export async function getServis(id) {
    try {
        const response = await API.get('servis/' + id)
        return response
    }
    catch (err) {
        return false
    }
}

export async function addServis(data) {
    try {
        const response = await API.post('servis', data, config)
        return response
    }
    catch (err) {
        return false
    }
}

export async function deleteServis(id) {
    try {
        const response = await API.delete('servis/' + id, config)
        return response
    }
    catch (err) {
        return false
    }
}

// pemakaian
export async function getPemakaian(id) {
    try {
        const response = await API.get('pemakaian/' + id)
        return response
    }
    catch (err) {
        return false
    }
}