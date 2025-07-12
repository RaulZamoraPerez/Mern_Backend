"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authenticate = async (req, res, next) => {
    const bearer = req.headers.authorization; //obtenemos el header de autorizaciona
    //ssino enviar nungun header de autorizacion
    if (!bearer) {
        const error = new Error('No autorizado');
        res.status(401).json({ error: error.message });
        return;
    }
    const [, token] = bearer.split(' '); //quitar el bearer y quedarnos solo con el token pq daba algo como " Bearer token"
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET); //verificamos el token
        if (typeof decoded === 'object' && decoded.id) {
            const user = await User_1.default.findById(decoded.id).select('_id name email'); //solo esos datos del usuario
            if (user) {
                req.user = user; //el usuario autenticado
                next();
            }
            else {
                res.status(401).json({ error: 'Token no valido' });
            }
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Token no valido' });
        return;
    }
};
exports.authenticate = authenticate;
//para obtener el usuario autenticado
//# sourceMappingURL=auth.js.map