import { API } from '../API'

export async function SignIn(data) {
    try {
        const response = await API.post('signin', data)
        return response
    }
    catch (err) {
        return false
    }
}

export async function getDashboard() {
    try {
        const response = await API.get('dash')
        return response
    }
    catch (err) {
        return false
    }
}