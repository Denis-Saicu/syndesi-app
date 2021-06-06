import React, { useEffect, useState, useRef } from 'react'
import '../../css/chat/Chat.css'
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { selectChannelId, selectChannelName } from '../../features/appSlice';
import db from '../../firebase';
import firebase from 'firebase'


function Chat() {

    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const scrollDummy = useRef();
    useEffect(() => {

        if (channelId) {
            db.collection('channels')
                .doc(channelId)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                );
        }

    }, [channelId]);


    const sendMessage = e => {

        e.preventDefault();

        if(input.trim()){
        db.collection('channels')
            .doc(channelId)
            .collection('messages')
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                user: user,
            })
        }
        setInput('')

        scrollDummy.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });

    }

    return (
        <div className="chat">

            <ChatHeader channelName={channelName} />

            <div className="chat__messages">
                <div ref = {scrollDummy}/>
                {messages.map((message) => (
                    <Message
                        timestamp={message.timestamp}
                        message={message.message}
                        user={message.user}
                    />
                ))}

            </div>

            <div className="chat__input">

                <AddCircleIcon fontSize="large" />

                <form>

                    <input
                        type="text"
                        value={input}
                        disabled={!channelId}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Message #${channelName}`}
                    />

                    <button
                        disabled={!channelId}
                        className="chat__inputButton"
                        type='submit'
                        onClick={sendMessage}
                    >
                        Send Message
                 </button>

                </form>

            </div>
        </div>
    )
}

export default Chat
