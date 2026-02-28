import React, { useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const LoginPopUp = ({setShowLogin}) => {
    const {url,setToken}=useContext(StoreContext)

    const [currState,setCurrentState]=useState("Sign Up")
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin=async (event)=>{
        event.preventDefault();
        let newUrl=url;
        if (currState==="Login") {
            newUrl +="/api/user/login"
        }else{
            newUrl+="/api/user/register"
        }

        const response=await axios.post(newUrl,data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false)
        }else{
            alert(response.data.message)
        }

    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} action="" className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)}  src={assets.cross_icon}/>
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
                <input  name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>
            <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By contuining, i agree to the terms of use & privacy policy</p>
            </div>
            {currState==="Login"?
            <p>Create a new account? <span onClick={()=>setCurrentState("Sign up")}>Click here</span></p>:
            <p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>
            }
        </form>
      
    </div>
  )
}

export default LoginPopUp
