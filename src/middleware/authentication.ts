import jwt from "jsonwebtoken";
import {secret} from "../config/jwtKey";

class authentication {
    static http(req, res, next) {
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

    static ws(socket, next) {
            const token = socket.handshake.headers.access_token;
            console.log(token);

        try {
            const authHeader = socket.handshake.headers.access_token;
            if (!authHeader) {
                next(new Error("request without a token"));
            }
            const token = authHeader.split(' ')[1]
            if (!token) {
                next(new Error("Пользователь не авторизован"));
            }
            jwt.verify(token, secret)

            next()
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

export {authentication};

