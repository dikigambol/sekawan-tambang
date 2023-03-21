import { API } from '../API'

// API POST METHOD
export async function SignIn(data) {
    try {
        const response = await API.post('signin', data)
        return response
    }
    catch (err) {
        return false
    }
}