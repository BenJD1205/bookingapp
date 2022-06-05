import React, {useState, useContext} from 'react'
import './login.css'
import {AuthContext} from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate();
    const [credentials,setCredentials] = useState({
        username:undefined,
        password:undefined
    })

    const {loading,error,dispatch} = useContext(AuthContext);

    const handleChange = (e) => {
        setCredentials((prev) => ({...prev,[e.target.name]: e.target.value}))
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try{
            const res = await axios.post("/auth/login",credentials);
            dispatch({type:"LOGIN_SUCCESS",payload:res.data});
            navigate("/");
        }
        catch(err){
            dispatch({type:"LOGIN_FAILURE",payload:err.response.data});
        }
    }

  return (
    <div className="login">
        <div className="lContainer">
            <input 
                type="text" 
                placeholder="username" 
                className="lInput" 
                onChange={handleChange}
                id="username"
                name="username"
            /> 
            <input 
                type="password" 
                placeholder="password" 
                className="lInput" 
                onChange={handleChange}
                name="password"
                id="password"
            /> 
            <button disabled={loading} onClick={handleSubmit} className="lButton">
                Login
            </button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login