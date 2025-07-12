import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';



declare global {
     namespace Express {
         interface Request {
             user?: IUser
         }
     }
}

export const authenticate = async (req : Request, res: Response, next: NextFunction) => {

    const bearer = req.headers.authorization //obtenemos el header de autorizaciona

    //ssino enviar nungun header de autorizacion
    if(!bearer) {
        const error = new Error('No autorizado')
        res.status(401).json({error: error.message})
        return
    }
    const [, token] = bearer.split(' ')//quitar el bearer y quedarnos solo con el token pq daba algo como " Bearer token"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)//verificamos el token
         
       if( typeof decoded === 'object' && decoded.id){
             const user = await User.findById(decoded.id).select('_id name email') //solo esos datos del usuario
             
             if(user){
                  req.user = user //el usuario autenticado
                  next()

             }else{
                  res.status(401).json({error: 'Token no valido'})
             }
       }

    } catch (error) {
        res.status(500).json({error: 'Token no valido'})
        return
    }
   
   
}

//para obtener el usuario autenticado