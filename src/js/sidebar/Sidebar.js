import React, { useEffect, useState } from 'react'
import '../../css/sidebar/Sidebar.css';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import { Avatar } from '@material-ui/core';
import { useSelector} from 'react-redux';
import { selectUser } from '../../features/userSlice';
import db from '../../firebase';

function Sidebar() {

    const user = useSelector(selectUser)
    const [channels, setChannels] = useState([])
    useEffect(() => {

        db.collection('channels').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data(),
            })))
        ))

    }, [])

    const handleAddChannel = (e) => {
        e.preventDefault()

        const channelName = prompt('Enter a new channel name')

        if (channelName.trim()) {
            db.collection('channels').add({
                channelName: channelName,
            });
        }
    };

    return (
        <div className="sidebar">

            <div className="sidebar__channels">

                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <h4>Text Channels</h4>
                    </div>

                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                </div>

                <div className="sidebar__channelsList">
                    {channels.map(({ id, channel }) => (
                        <SidebarChannel
                            key={id}
                            id={id}
                            channelName={channel.channelName}
                        />
                    ))}

                </div>

            </div>

            <div className="sidebar__profile">

                <Avatar src={user.photo} />

                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0, 5)}</p>
                </div>

            </div>


        </div>
    )
}

export default Sidebar
