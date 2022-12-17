import jwt from "jsonwebtoken";
import {secret} from "../config/jwtKey";


function authentication(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).json({message: "request without a token"})
        }
        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
}

export {authentication};

