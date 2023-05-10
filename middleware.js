import {NextResponse} from 'next/server'
import { jwtVerify } from 'jose'


export async function middleware(request){
    
    const token = request.cookies.get('myTokenName') // obtenemos el token
    const token2 = request.cookies.get('myTokenName2') 
    
    if (token2 === undefined){

        if (request.nextUrl.pathname.includes('/dashboard')){ //ruta

            //validamos si hay un token o no 
            if(token === undefined){
                return NextResponse.redirect(new URL('/login', request.url))
            }
            try {
                const { payload } = await jwtVerify(token.value, new TextEncoder().encode('session'))
                return NextResponse.next()
            } catch (error) {
                console.log(error)
                return NextResponse.redirect(new URL('/login', request.url))
            }
    
        }
    }else{
        return NextResponse.next()
    }

    return NextResponse.next()
}


