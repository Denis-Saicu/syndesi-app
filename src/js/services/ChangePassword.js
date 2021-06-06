import React, { useState } from 'react'
import { delChangePassword } from "../../features/servicesSlice"
import { useDispatch } from "react-redux";
import { Button } from '@material-ui/core';
import axios from '../../axios'
import FlashMessage from '../../features/flashMessage'


function ChangePassword() {

    const dispatch = useDispatch()
    const [secret, setSecret] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [APImessage, setMessage] = useState('')
    const [APIsuccess, setSuccess] = useState(false)
    const [gotResponse, setGotResponse] = useState(false)

    const goToLogin = () => {
        dispatch(delChangePassword())
    }

    const ResetPassword = (e) => {
        e.preventDefault();

        axios.post('/syndesi_api/authentication/reset', {
            password:newPassword,
            resetCode:secret
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
        setSecret('')
        setNewPassword('')
    }

    return (
        <div className="base-container-forgot">

            <label className="recover-title">Reset your password</label>

            <div className="content-forgot">

                <div className="form">

                    <div className="form-group">
                        <label htmlFor="email" >Code from email</label>
                        <input type="Text" value={secret} name="secret" onChange={(e) => setSecret(e.target.value)} placeholder="enter the code from the email" ></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" >New password</label>
                        <input type="password" value={newPassword} name="Password" onChange={(e) => setNewPassword(e.target.value)} placeholder="new password"></input>
                    </div>

                </div>

            </div>

            <div className="footer-forgot">
                <Button className="btn_send_email" onClick={ResetPassword}>Reset Password</Button>
                <label htmlFor="forgotpwdone" onClick={goToLogin}>Return to Login</label>
            </div>

            {
                gotResponse ? <FlashMessage message={APImessage} success={APIsuccess} /> : ''
            }

        </div>
    )
}

export default ChangePassword
