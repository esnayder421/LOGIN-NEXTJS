import { verify } from "jsonwebtoken";
import jwt_decode from "jwt-decode";



const profileHandler = (req,res) =>{
    
    const {myTokenName, myTokenName2} = req.cookies

    if(!myTokenName && !myTokenName2){
        return res.status(401).json({error: 'no token'})
    }
    try {
        if(myTokenName2 === undefined){
                //comprovamos si el token esw valido o no y luego retornamos los valores
                if (myTokenName !== undefined){
                    const user = verify(myTokenName,'session')
                    return res.json({email:user.email, user:user.username})
                }else{
                    return res.json({email:user.email, user:user.username})
                }
                
        
            
        }else{
            
            let decoded = jwt_decode(myTokenName2);
            let username =decoded.given_name + " " + decoded.family_name
            return res.json({email:decoded.email, user:username})
        }
    } catch (error) {
        return res.status(401).json({error:'token invalido'})
    }
}


export default  profileHandler;




