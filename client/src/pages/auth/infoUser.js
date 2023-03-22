import jwt_decode from "jwt-decode";

export default {
    token: JSON.parse(localStorage.getItem("jwt")) ? JSON.parse(localStorage.getItem("jwt")).data.token : null,
    username: JSON.parse(localStorage.getItem("jwt")) ? JSON.parse(localStorage.getItem("jwt")).data.username : null,
    id_user: JSON.parse(localStorage.getItem("jwt")) ? jwt_decode(JSON.parse(localStorage.getItem("jwt")).data.token).id_user : null,
    role: JSON.parse(localStorage.getItem("jwt")) ? jwt_decode(JSON.parse(localStorage.getItem("jwt")).data.token).role : null
}