import React, { useRef, useState } from "react";
import loginImg from "../../assets/logo_dchatapp.png";
import '../../css/login/Register.css'
import { Button } from '@material-ui/core';
import axios from '../../axios'
import FlashMessage from '../../features/flashMessage'


function Register() {

    const [APImessage, setAPIMessage] = useState('')
    const containerRef = useRef()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [APIsuccess,setAPISuccess] = useState(false)
    const [gotResponse,setGotResponse] = useState(false)

    const registerWhitEmail = (e) => {
        e.preventDefault();

        axios.post('/syndesi_api/authentication/register', {
            email: email,
            password: password,
            userName: username
        })
        .then((res) => {
            setGotResponse(true)
            setAPISuccess(res.data.success)
            setAPIMessage(res.data.message)
        }).catch((err) => {
            setAPIMessage(err.response.data.message)
            setAPISuccess(err.response.data.success)
            setGotResponse(true)
        })
         setAPIMessage('')
         setAPISuccess(false)
         setGotResponse(false)
         setUsername('')
         setEmail('')
         setPassword('')
        }

    return <div className="base-container" ref={containerRef} >
        <div className="content">

            <div className="image">
                <img src={loginImg} alt="Err404:ups! Img not found" />
            </div>

            <div className="form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" value={username} name="username" onChange={(e) => setUsername(e.target.value)} placeholder="username"></input>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} placeholder="email"></input>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} placeholder="password"></input>
                </div>
            </div>

            <div className="footer">
                <Button className="btn_register" onClick={registerWhitEmail}>Register</Button>
            </div>

        </div>

        {
           gotResponse  ? <FlashMessage message={APImessage} success={APIsuccess} /> : ''
        }
    </div>
}

export default Register
