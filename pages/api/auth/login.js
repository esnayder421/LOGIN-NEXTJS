
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const loginHandler = (req,res) =>{

    const {email,pass, credential} = req.body //estructurar el objeto

    //aqui viene toda la logica de la base de datos para confirmar si el email y la contraseña son validos

    if(credential !== undefined){
        console.log("llego a validar")
        const serializedTokenGoogle = serialize('myTokenName2', credential,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',  //validamos si esta en produccion para activar la seguridad
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/'
        })
        res.setHeader('Set-Cookie',serializedTokenGoogle)
        return res.json('login succesfully')

    }else{
        //===================================================================================================
        if(email === 'admin@gmail.com' && pass === '1234'){

            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
                email: 'admin@gmail.com',
                username: 'Administrador',
            },'session')

                //serializamos y configuramos el token
            const serialized = serialize('myTokenName', token,{
                httpOnly:true,
                secure: process.env.NODE_ENV === 'production',  //validamos si esta en produccion para activar la seguridad
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 30,
                path: '/'
            })
            //guardamos el token en las cabeceras del navegador para que el front no necesite guardarlo
            res.setHeader('Set-Cookie', serialized)
            
            return res.json('login succesfully')

        }
    }
    

    return res.status(401).json({error:'credencilaes no validas'})
}



export default loginHandler;






