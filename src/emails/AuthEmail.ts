import { transporter } from "../config/nodemailer"


interface IEmail {
    email: string;
    name: string;
    token: string;
}

export class AuthEmail {

     static sendConfirmationEmail = async ( user: IEmail ) => {
        
       const info =  await transporter.sendMail({
            from: 'UpTask <admin@uptas.com>',
            to: user.email,
            subject: 'UpTask - Confirma tu cuenta en UpTask',
            text: 'UpTask - Confirma tu cuenta',
            html: `<p>Hola: ${user.name}, has creando tu cuenta en Uptask, ya casi esta todo listo, solo debes confirmar tu cuenta </p>
            
            <p>visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>

            <p> E ingresa el codigo: <b>${user.token}</b></p>
            <p>Este token expira en 10 minutos</p>
            `
         })

         console.log('Mensaje enviado', info.messageId);
    
    }
    static sendPasswordResetToken= async ( user: IEmail ) => {
        
        const info =  await transporter.sendMail({
             from: 'UpTask <admin@uptas.com>',
             to: user.email,
             subject: 'UpTask - Restablecer tu password',
             text: 'UpTask - Confirma tu cuenta',
             html: `<p>Hola: ${user.name}, has solicitado reestablecer tu password  </p>
             
             <p>visita el siguiente enlace:</p>
             <a href="${process.env.FRONTEND_URL}/auth/new-password">Restablecer password</a>
 
             <p> E ingresa el codigo: <b>${user.token}</b></p>
             <p>Este token expira en 10 minutos</p>
             `
          })
 
          console.log('Mensaje enviado', info.messageId);
     
     }
}