
import { CorsOptions } from "cors";


export const corsConfig : CorsOptions={

     origin: function(origin, callback){

        const whitelist =[process.env.FRONTEND_URL] //url permitida

        if(process.argv[2]=== '--api'){
            whitelist.push(undefined)
        }

        if(whitelist.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
     }
}


//origin  - es el dominio que esta haciendo la peticion
//callback - epara permitir la peticion - toma error y un booleano si o no conexion