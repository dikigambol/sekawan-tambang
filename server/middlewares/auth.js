import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

export const isAuth = (req, res, next) => {
    const bearer = req.headers.bearer
    jwt.verify(bearer, 'gambol', (err) => {
        if(err){
            console.log(err.message)
            res.json(err)
            return
        }
        next()
    })
};