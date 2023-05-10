import React from "react";
import Link from "next/link";


const Index = () => {

  return(
    <div className="container">
    <h1 className="display-2"> hello world! </h1>
    <p className="display-5">Esto es un login con jwt en <spam className='badge bg-info'>NEXT.JS</spam></p>

    <Link className="btn btn-outline-info" href='/login'>Login</Link>
    </div>
    
  )
}

export default Index;






