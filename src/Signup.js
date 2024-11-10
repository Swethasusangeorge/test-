import React, { useState } from "react";
import axios from "axios";
import logo from "./New folder/logo.png"
import { Link, useNavigate } from "react-router-dom";


function Signup(){

    const [error,seterror]=useState("");
    const [load,setload]=useState(false)

    const navi=useNavigate()

    const handleSignup=(e)=>{
      seterror("")
      setload(true)
        e.preventDefault()
    
        const user=e.target.elements[0].value;
        const email=e.target.elements[1].value;
        const pass=e.target.elements[2].value;

        axios.post("/signup/",{
            'username':user,
            'email':email,
            'password':pass
        },{withCredentials:true})
        .then(res=>{
          if(res.data.message==='User registered successfully'){
            navi("/");
          }
          setload(false)
        })
        .catch(e=>{
          seterror(e.response.data.error);
          setload(false)
          
        })
      }
    return(
        <div className="w-screen h-svh flex flex-col">
      <img src={logo} className="h-10 mx-auto mt-5 w-fit object-contain"/>
      <div className="box-border px-5 py-4 m-auto flex align-middle flex-col w-svw h-fit">

        <h1 className="uppercase mb-9 text-center text-red-600 text-2xl font-bold">Signup</h1>
        <form onSubmit={handleSignup} className="flex w-full flex-col gap-5">
          <input type="text" placeholder="username" className="outline-red-700 bg-gray-100 px-3 py-2 rounded"/>
          <input type="email" placeholder="email@example.com" className="outline-red-700 bg-gray-100 px-3 py-2 rounded"/>
          <input type="password" placeholder="password" className="outline-red-700 bg-gray-100 px-3 py-2 rounded"/>
          <button type="submit" className="text-white text-lg bg-red-700 py-2 rounded">{load?<div className="w-6 h-6 border-4 border-red-500 border-t-white animate-spin rounded-full mx-auto"></div>:"Submit"}</button>
        </form>
        <p className="text-sm text-red-600">{error}</p>
    <p className="text-sm text-center my-4">Already have an account? <Link to="/"><b className="text-red-600">Login</b></Link>
    </p>
      </div>
    </div>
    )
}export default Signup;