import { verify } from "jsonwebtoken";
import {serialize} from 'cookie';


const logoaut = (req,res) => {

    const {myTokenName,myTokenName2} = req.cookies
    if(!myTokenName && !myTokenName2){
        return res.status(401).json({error: 'no token'})
    }

    try {
        if (myTokenName2 === undefined){

            console.log("validando el otro token")
            verify(myTokenName,'session')
            const serialized = serialize('myTokenName', null,{
                httpOnly:true,
                secure: process.env.NODE_ENV === 'production',  //validamos si esta en produccion para activar la seguridad
                sameSite: 'strict',
                maxAge: 4,
                path: '/'
            })
            res.setHeader('Set-Cookie', serialized)
            return res.status(200).json('logout succesfully')

        }else{
            const serialized = serialize('myTokenName2', null,{
                httpOnly:true,
                secure: process.env.NODE_ENV === 'production',  //validamos si esta en produccion para activar la seguridad
                sameSite: 'strict',
                maxAge: 0,
                path: '/'
            })
            res.setHeader('Set-Cookie', serialized)
            return res.status(200).json('logout succesfully')
        }

    } catch (error) {
        verify(myTokenName,'session')
            const serialized = serialize('myTokenName', null,{
                httpOnly:true,
                secure: process.env.NODE_ENV === 'production',  //validamos si esta en produccion para activar la seguridad
                sameSite: 'strict',
                maxAge: 0,
                path: '/'
            })
            res.setHeader('Set-Cookie', serialized)
        console.log(error)
        console.log("entro al error (sesion cerrada)")
        return res.status(401).json({error: 'invalid token'})
    }

}


export default logoaut;



