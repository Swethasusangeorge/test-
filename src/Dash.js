import React, { useEffect, useState } from "react";
import logo from "./New folder/logo_white.png"
import Datatake from "./component/Datatake";
import axios from "axios";

function Dash(){


    const [dataset,getdata]=useState({});
    const [out,setout]=useState(false)
    const [predict,setpredict]=useState(true);
    const [date,setdate]=useState();
    const [error,seterror]=useState();
    const [load,setload]=useState(false)
    

    const process = (dat)=>{
        return dat.reduce((acc, curr) => {
          Object.keys(curr).forEach((key) => {
            if (!acc[key]) acc[key] = []; 
            acc[key].push(curr[key]);   
          });
          return acc;
        }, {});
      }

   useEffect(()=>{
    axios.get("/get-heart-condition/")
    .then(res=>{
        getdata(process(res.data.heart_conditions))
        setdate(process(res.data.heart_conditions).date)
       
}).catch(e=>{seterror(e.message)})
   },[])
function predicts(){
    setload(true)
    axios.get("/predict")
    .then(res=>{
        console.log(res.data)
        if(res.data.started===true){
            const time = setInterval(()=>{
                axios.get("/getResults/")
                .then(res=>{
                    console.log(res.data)
                    if(res.data.message==="Prediction in progress"){

                    }else{
                        clearInterval(time)
                        setout(res.data.prediction)
                    }
                    setload(false)
                })
            },1000)
        }
    }).catch(e=>{seterror(e.message); setload(false)})
}

const formsubmit=(e)=>{
    setload(true);
    e.preventDefault();
    const data = new FormData();

data.append('male', e.target.elements[0].value);
data.append('age', e.target.elements[1].value);
data.append('education', e.target.elements[2].value);
data.append('currentSmoker', e.target.elements[3].value);
data.append('cigsPerDay', e.target.elements[4].value);
data.append('BPMeds', e.target.elements[5].value);
data.append('prevalentStroke', e.target.elements[6].value);
data.append('prevalentHyp', e.target.elements[7].value);
data.append('diabetes', e.target.elements[8].value);
data.append('totChol', e.target.elements[9].value);
data.append('sysBP', e.target.elements[10].value);
data.append('diaBP', e.target.elements[11].value);
data.append('BMI', e.target.elements[12].value);
data.append('heartRate', e.target.elements[13].value);
data.append('glucose', e.target.elements[14].value);

console.log(Object.fromEntries(data)); // Check the form data contents

axios.post("/save-heart-condition/", data, { withCredentials: true })
    .then(res => {
        console.log(res.data);
        if(res.data.message==="Heart condition data saved successfully"){
            setload(false);
            window.location.reload()
        }
    })
    .catch(err => {
        seterror(err);
        setload(false)
    });

  };

  


    return(
        <div className="w-screen h-svh ">
            <div className="text-white w-full h-fit bg-red-700">
            <nav className="w-full h-fit box-border px-3 py-4 flex flex-col">
                <img src={logo} className="w-fit h-8 mx-auto"/>
            </nav>
           <div className="w-full flex justify-between">
           <div>
            <h1 className="text-2xl px-3 font-bold pb-9 py-4">Welcome, user
            <p className="text-sm font-normal my-1 text-gray-100">Let's check your heart</p>
            </h1>
            </div>
           </div>
            
            </div>

           {predict? <div className="box-border w-full px-3 h-fit py-4 flex flex-col -mt-5 rounded-3xl bg-white">
            <div className={"w-full h-fit box-border px-3 py-2 font-bold text-center shadow-lg rounded my-6 " + (out && out.prediction?" text-red-600":" text-green-600")}><p cl>{out && out.prediction?"Risk of Heart Deisese":"No Risks"}</p>
            <div className="flex justify-between">
            <button onClick={predicts} className="w-fit my-3 bg-red-600 text-white px-3 py-2 rounded">{load?<p className="animate-pulse">Predicting...</p>:"Start Prediction"}</button>
            <button onClick={()=>{setpredict(!predict)}} className="py-2 my-3 px-3 w-20 border-2 border-red-700 text-red-700 bg-white rounded">Add</button>
            
            </div>
            </div>
                
               <div>
               {Object.entries(dataset)
  .filter(([name]) => !['male', 'age', 'education', 'currentSmoker', 'date','BPMeds','prevalentStroke','prevalentHyp','diabetes'].includes(name))
  .map(([name, values], index) => (
    <Datatake da={{ name, values,date:date }} key={index} />
  ))}

               </div>
           
            

        </div>:<div className="box-border px-3 h-fit py-4 flex flex-col overflow-scroll -mt-5 rounded-3xl bg-white">
            <p className="ml-auto font-semibold" onClick={()=>{setpredict(!predict)}}>╳</p>
            <h1 className="mb-4 capitalize text-xl font-bold text-center text-red-600">dataentry</h1>
            <form onSubmit={formsubmit} className="w-full flex flex-col gap-5">
            <select className="outline-red-700 bg-gray-100 px-3 py-2 rounded">
                <option value="1">Select Gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
            </select>
            <select className="outline-red-700 bg-gray-100 px-3 py-2 rounded">
                <option value="0">Do you Smoke</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
            </select>
            <select className="outline-red-700 bg-gray-100 px-3 py-2 rounded">
                <option value="0">Do you take any BP Meds</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
            </select>
            <select className="outline-red-700 bg-gray-100 px-3 py-2 rounded">
                <option value="0">Stroke recently</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
            </select>
            <select className="outline-red-700 bg-gray-100 px-3 py-2 rounded">
                <option value="0">Hypertension</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
            </select>
            <select className="outline-red-700 bg-gray-100 px-3 py-2 rounded">
                <option value="0">Have diabetes</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
            </select>
            <input type="text" required placeholder="age" className="outline-red-700 placeholder:text-gray-700 bg-gray-100 px-3 py-2 rounded"/>
            <input type="text" required placeholder="education" className="outline-red-700 placeholder:text-gray-700 bg-gray-100 px-3 py-2 rounded"/>
            <input type="text" required placeholder="cigsPerDay" className="outline-red-700 placeholder:text-gray-700 bg-gray-100 px-3 py-2 rounded"/>
            <input type="text" required placeholder="totChol" className="outline-red-700 placeholder:text-gray-700 bg-gray-100 px-3 py-2 rounded"/>
            <input type="text" required placeholder="sysBP" className="outline-red-700 placeholder:text-gray-700 bg-gray-100 px-3 py-2 rounded"/>
            <input type="text" required placeholder="diaBP" className="outline-red-700 placeholder:text-gray-700 bg-gray-100 px-3 py-2 rounded"/>
            <input type="text" required placeholder="BMI" className="outline-red-700 placeholder:text-gray-700 bg-gray-100 px-3 py-2 rounded"/>
            <input type="text" required placeholder="heartRate" className="outline-red-700 placeholder:text-gray-700 bg-gray-100 px-3 py-2 rounded"/>
            <input type="text" required placeholder="glucose" className="outline-red-700 placeholder:text-gray-700 bg-gray-100 px-3 py-2 rounded"/>
            <button type="submit" className="text-white text-center text-lg bg-red-700 py-2 rounded">{load?<div className="w-5 h-5 rounded-full mx-auto border-2 border-red-200 border-t-white animate-spin"></div>:"Submit"}</button>
          
            </form>
            <p className="text-sm text-red-600">{error}</p>
            </div>}
        </div>
    )
}export default Dash