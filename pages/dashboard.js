import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Confetti from 'react-confetti'

const Dashboard = () => {

    const [user, setUser] = useState({
        email:'',
        user:''
    })
    const router = useRouter()

    const getProfile = async () =>{
        try {
            const response = await axios.get('api/profile')

            setUser(response.data)

        } catch (error) {
            console.log(error)
        } 
    }
    const logoutProfile = async () =>{
       try {
        const response = await axios.post('/api/auth/logout')
        router.push("/login")

       } catch (error) {
        console.log(error)
        router.push("/login")
       }
    }

    return (
        <>
        <Confetti
        
        style={{height: '100%', width:'100%'}}
        />
        <div className="text-center" style={{'zIndex':4}}>
            <h1 className="display-2">Dashboard...!</h1>
            <br/>
            <pre>
                <h2><span className="badge bg-info text-dark">{user.user}</span></h2>
                <h3><span className="badge bg-success text-dark">{user.email}</span></h3>
            </pre>
            <button
                onClick={() => getProfile()}
                className="btn btn-outline-primary m-4"
                > 
                get profile
            </button>
            <button 
                onClick={() => logoutProfile()}
                className="btn btn-outline-warning m-4"
                >
                Logout
            </button>
        </div>
        </>
       
    )

} 


export default Dashboard;




