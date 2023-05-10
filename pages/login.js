import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import Swal from 'sweetalert2';


const Login = () => {
  const router = useRouter();
  const clientId = "301985077028-f683ifst9hfeqaqnk3bhhiqibb8ed9ij.apps.googleusercontent.com"

  const [credentials, setcredentials] = useState({
    email: "",
    pass: "",
  });
  const [dataGoogle, setDataGoogle] = useState()

  const handleChange = (e) => {
    // console.log(e.target.value, e.target.name)
    setcredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(credentials)
    try {
      const response = await axios.post("/api/auth/login", credentials);
      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      Swal.fire(
        'Ocurrió un Error!',
        'Credenciales no validas!',
        'error'
      )
    }
  };
  const validationGoogle  = async (credentialsGoogle) => {
    const response = await axios.post("/api/auth/login", credentialsGoogle);
      if (response.status === 200) {
        router.push("/dashboard");
      }
  }

  return (
    <div className="position">
      <section className="min-vh-100" style={{ backgroundColor: "#508bfc"}}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                    <form onSubmit={handleSubmit}>
                        <h3 className="mb-5">Sign in</h3>
                        <div className="form-outline mb-4">
                            <input
                            name="email"
                            type="email"
                            id="typeEmailX-2"
                            className="form-control form-control-lg"
                            placeholder="Email"
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-outline mb-4">
                            <input
                            name="pass"
                            type="password"
                            id="typePasswordX-2"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            onChange={handleChange}
                            />
                        </div>
                        <button
                            className="btn btn-primary btn-lg btn-block m-2"
                        >
                            Login
                        </button>
                    </form>
                    
                  <hr className="my-4" />
                  <div className="d-flex justify-content-center">
                  <GoogleOAuthProvider clientId={clientId}>
                  <GoogleLogin  clientId={clientId}
                      onSuccess={credentialResponse => {
                        setDataGoogle(credentialResponse)
                        validationGoogle(credentialResponse)
                      }}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                    />
                  </GoogleOAuthProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
