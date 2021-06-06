import React, { useState } from 'react'
import { delActivate } from "../../features/servicesSlice"
import { useDispatch } from "react-redux";
import { Button } from '@material-ui/core';
import axios from '../../axios'
import FlashMessage from '../../features/flashMessage'

function ConfirmEmail() {

    const dispatch = useDispatch()
    const [secret, setSecret] = useState('')
    const [APImessage, setMessage] = useState('')
    const [APIsuccess, setSuccess] = useState(false)
    const [gotResponse, setGotResponse] = useState(false)

    const goToLogin = () => {
        dispatch(delActivate())
    }

    const activateAccount = (e) => {
        e.preventDefault();

        axios.post('/syndesi_api/authentication/activate', {
            activationCode: secret
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
    }

    return (
        <div className="base-container-forgot">

            <label className="recover-title">Activate your account</label>

            <div className="content-forgot">

                <div className="form">

                    <div className="form-group">
                        <label htmlFor="secret" >Activation Code</label>
                        <input type="Text" value={secret} name="secret" onChange={(e) => setSecret(e.target.value)} placeholder="enter the code from the email" ></input>
                    </div>

                </div>

            </div>

            <div className="footer-forgot">
                <Button className="btn_send_email" onClick={activateAccount}>Activate account</Button>
                <label htmlFor="forgotpwdone" onClick={goToLogin}>Return to Login</label>
            </div>

            {
                gotResponse ? <FlashMessage message={APImessage} success={APIsuccess} /> : ''
            }

        </div>
    )
}

export default ConfirmEmail
