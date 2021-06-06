import { Avatar } from '@material-ui/core'
import React from 'react'
import "../../css/chat/Message.css"
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
function Message({ timestamp, user, message }) {

    const loogedInUser = useSelector(selectUser);

    if (loogedInUser.uid === user.uid) {

        return (
            <div className="message-right" >

                <div className="message__info_right">
                     <h4>
                        <span className="message__timestamp_right">
                            {new Date(timestamp?.toDate()).toUTCString()}
                        </span>
                        {user.displayName}
                    </h4>
                    <p>{message}</p>
                </div>

                <Avatar src={user.photo} />

            </div>
        )
    } else {
        return(
            <div className="message-left" >

                <Avatar src={user.photo} />

                <div className="message__info">
                    <h4>
                        {user.displayName}
                        <span className="message__timestamp">
                            {new Date(timestamp?.toDate()).toUTCString()}
                        </span>
                    </h4>
                    <p>{message}</p>
                </div>
            </div>
        )
    }
}

export default Message
