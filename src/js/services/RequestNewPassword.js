import React, { useState } from 'react'
import { delForgotPassword, setChangePassword } from "../../features/servicesSlice"
import { useDispatch } from "react-redux";
import { Button } from '@material-ui/core';
import axios from '../../axios'
import FlashMessage from '../../features/flashMessage'
import '../../css/services/RequestNewPassword.css'



function RequestNewPassword() {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [APImessage, setMessage] = useState('')
    const [APIsuccess, setSuccess] = useState(false)
    const [gotResponse, setGotResponse] = useState(false)

    const goToLogin = () => {
        dispatch(delForgotPassword())
    }

    const goToReset = () => {
        dispatch(delForgotPassword())
        dispatch(setChangePassword())
    }

    const sendResetEmail = (e) => {
        e.preventDefault();

        axios.post('/syndesi_api/authentication/forgot', {
            email: email
        })
            .then((res) => {
                setGotResponse(true)
                setSuccess(res.data.success)
                setMessage(res.data.message)
            })
            .catch((err) => {
                setGotResponse(true)
                setSuccess(err.response.data.success)
                setMessage(err.response.data.message)
            })
        setMessage('')
        setSuccess(false)
        setGotResponse(false)
        setEmail('')
    }
    return (
        <div className="base-container-forgot">

            <label className="recover-title">Send Reset Email</label>

            <div className="content-forgot">

                <div className="form">

                    <div className="form-group">
                        <label htmlFor="email" >Email</label>
                        <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} placeholder="email" ></input>
                    </div>

                </div>

            </div>

            <div className="footer-forgot">
                <Button className="btn_send_email" onClick={sendResetEmail}>Send Reset Email</Button>
                <label htmlFor="forgotpwdone" onClick={goToLogin}>Return to Login</label>
                <label htmlFor="gotopwreset" onClick={goToReset}>Reset Password</label>
            </div>
            {
                gotResponse ? <FlashMessage message={APImessage} success={APIsuccess} /> : ''
            }
        </div>
    )
}

export default RequestNewPassword
