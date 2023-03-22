import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
    const auth = req.headers.authorization
    jwt.verify(auth, 'gambol', (err) => {
        if(err){
            console.log(err.message)
            res.json(err)
            return
        }
        next()
    })
};