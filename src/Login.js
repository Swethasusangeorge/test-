import React, { useState } from "react";
import axios from "axios";
import logo from "./New folder/logo.png"
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const [error,seterror]=useState("");
  const [load,setload]=useState(false);
  const [res,seters]=useState()
  const navi=useNavigate();

  const handleLogin=(e)=>{
    seterror("")
    setload(true)
    e.preventDefault()

    const user=e.target.elements[0].value;
    const pass=e.target.elements[1].value;

    

        try{
          axios.post("/login/",{'username':user,'password':pass},{withCredentials:true})
        .then(res=>{
           
            if(res.data.message==='Login successful'){
              navi("/dash");
            }
            setload(false)
        })
        .catch(e=>{
          seterror(e.response.data.error);
          setload(false)
          
        })
        }
        catch(err){
          seters(err)
        }
    
  }
  return (
    <div className="w-screen h-svh flex flex-col">
      <p>{res}</p>
      <img src={logo} className="h-10 mx-auto mt-5 w-fit object-contain"/>
      <div className="box-border px-5 py-4 m-auto flex align-middle flex-col w-svw h-fit">

        <h1 className="uppercase mb-9 text-center text-red-600 text-2xl font-bold">login</h1>
        <form onSubmit={handleLogin} className="flex w-full flex-col gap-5">
          <input type="text" placeholder="username" className="outline-red-700 bg-gray-100 px-3 py-2 rounded"/>
          <input type="password" placeholder="password" className="outline-red-700 bg-gray-100 px-3 py-2 rounded"/>
          <button type="submit" className="text-white text-lg bg-red-700 py-2 rounded">{load?<div className="w-6 h-6 border-4 border-red-500 border-t-white animate-spin rounded-full mx-auto"></div>:"Submit"}</button>
        </form>
        <p className="text-sm text-red-600">{error}</p>
    <p className="text-sm text-center my-4">Not registered? <Link to="/signup"><b className="text-red-600">Sign Up</b></Link></p>
      </div>
    </div>
  );
}

export default Login;
