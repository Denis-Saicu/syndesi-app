import { Button } from '@material-ui/core';
import React, { useRef, useState } from 'react'
import loginImg from "../../assets/logo.png";
import "../../css/login/Login.css";
import { auth, provider } from "../../firebase";
import { login } from "../../features/userSlice"
import {setForgotPassword,setActivate} from "../../features/servicesSlice"
import { useDispatch } from "react-redux";
import axios from '../../axios'
import FlashMessage from '../../features/flashMessage'


function Login() {

    const containerRef = useRef()
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [APIsuccess, setSuccess] = useState(false)
    const [gotResponse, setGotResponse] = useState(false)

    const signInGoogle = () => {

        auth.signInWithPopup(provider)
            .catch((error) => alert(error.message))

    }
    const activateAccount = () => {
        dispatch(setActivate())
    }

    const forgotPassword = () => {
        dispatch(setForgotPassword())
    }

    const singInClassic = (e) => {
        e.preventDefault();

        axios.post('/syndesi_api/authentication/login', {
            email: email,
            password: password
        })
            .then((res) => {
                dispatch(login({
                    uid: res.data.uid,
                    photo: res.data.photo,
                    email: res.data.email,
                    displayName: res.data.userName,
                }))
                localStorage.setItem('loggedIn', true);
                localStorage.setItem('uid', res.data.uid);
                localStorage.setItem('photo', res.data.photo);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('userName', res.data.userName);

            }).catch((err) => {
                setErrorMessage(err.response.data.message)
                setSuccess(err.response.data.success)
                setGotResponse(true)
            })

        setSuccess('')
        setErrorMessage('')
        setGotResponse(false)
        setEmail('')
        setPassword('')
    }

    return <div className="base-container" ref={containerRef}>

        <div className="content">

            <div className="image">
                <img src={loginImg} alt="Err404:ups! Img not found" />
            </div>

            <div className="form">

                <div className="form-group">
                    <label htmlFor="email" >Email</label>
                    <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} placeholder="email" ></input>
                </div>

                <div className="form-group">
                    <label htmlFor="password" >Password</label>
                    <input type="password" value={password} name="Password" onChange={(e) => setPassword(e.target.value)} placeholder="password"></input>
                </div>

            </div>

        </div>

        <div className="footer">

            <Button className="btn_classic" onClick={singInClassic}>Sign In</Button>
            <label className="orLabel" htmlFor="Or"> OR </label>
            <Button className="btn_google" onClick={signInGoogle}>Sign in whit Google</Button>

            <label htmlFor="forgotpw" className="forgot_label" onClick={forgotPassword}>Did u forgot your password? Click here!</label>
            <label htmlFor="forgotpw" className="activate_label" onClick={activateAccount}>Activate your account!</label>

        </div>
        {gotResponse ? <FlashMessage message={errorMessage} success={APIsuccess} /> : ''}

    </div>
}

export default Login