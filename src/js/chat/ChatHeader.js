import React from 'react'
import '../../css/chat/ChatHeader.css'
import { Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/userSlice';
import {useHistory} from 'react-router-dom'
function ChatHeader({ channelName }) {

    const dispatch = useDispatch()
    const history = useHistory();
    const Logout = () => {
        auth.signOut()
            .then(() => {
                localStorage.removeItem('loggedIn');
                localStorage.removeItem('uid');
                localStorage.removeItem('photo');
                localStorage.removeItem('email');
                localStorage.removeItem('userName');
                dispatch(logout())
                history.push("/auth")
            }).catch((error) => alert(error.message))
    }


    return (
        <div className="chatHeader">

            <div className="chatHeader__left">
                <h3>
                    <span className="chatHeader__hash">
                        #
                 </span>
                    {channelName}
                </h3>
            </div>

            <div className="chatHeader__center">
                <h3> Syndesi MessagingApp </h3>
            </div>

            <div className="chatHeader__right">
                <div className="logout">
                    <Button className="logout__btn" onClick={Logout} >Logout </Button>
                    <ExitToAppIcon name="exit" />
                </div>
            </div>
        </div>
    )
}

export default ChatHeader