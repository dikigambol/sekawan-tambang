import jwt_decode from "jwt-decode";

export const isAuthenticate = () =>
  localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

export const isAdmin = () =>
  localStorage.getItem("jwt") ? jwt_decode(JSON.parse(localStorage.getItem("jwt")).data.token).role == 1 : false;