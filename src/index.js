import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login';
import Signup from './Signup';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Dash from './Dash';
import logo from "./New folder/logo_white.png"

export default function Index() {
  const [isIPLoaded, setIsIPLoaded] = useState(false);
  const [ipa,set]=useState()

  // const ip = setInterval(() => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = String(`http://127.0.0.1:8000/`);
    
    
  //   axios.get("https://heartify.pythonanywhere.com/getIp")
  //     .then(res => {
       
  //       // set(res.data.stored_ip)
  //       // setIsIPLoaded(true); 
  //       // clearInterval(ip)
  //     })
  //     .catch(error => {
  //       console.error("Error fetching IP:", error);
  //       setIsIPLoaded(false);
  //     });
  // }, 1000);
  // if (!isIPLoaded) {
  //   return (<div className="w-screen h-svh bg-red-600 flex">
  //     <div className="m-auto animate-pulse">
  //     <img src={logo} className='w-full box-border px-12 h-fit '/>
  //     <p className="text-white text-center text-xs mt-3">Turn on the python server and wait</p>
  //     </div>
  //   </div>);
  // }

  return (
    <div>
    {/* <p>{ipa}</p> */}
    <HashRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dash' element={<Dash />} />
      </Routes>
    </HashRouter>
    </div>
  );
}

reportWebVitals();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);
