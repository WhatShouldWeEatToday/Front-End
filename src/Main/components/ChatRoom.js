import React, {useEffect, useState } from "react";
import ChatModal from './ChatModal';
import FriendsList from './FriendsList';
import Vote from './Vote';
import axios from "axios";
import "../css/ChatRoom.css"

function ChatRoom({ roomId, roomName, onClose, selectedFriends}) {
    const [message, setMessage] = useState([]);
    const [showChatModal, setShowChatModal] = useState(false);  // 채팅 내 모달
    const [showVoteComponent, setShowVoteComponent] = useState(false); // 투표 컴포넌트

    const headers =
    {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`, // localStorage에서 저장된 accessToken을 가져와서 헤더에 포함
    };

    //채팅방 기존 투표나 공지 메세지 불러오기
    const fetchMessages = async () => {
        try{
            const response = await axios.get(`/chat/rooms/${roomId}`, {headers});
            setMessage(response.data);
        }catch(err){
            console.error({error: err});
        }
    }

    useEffect(() => {
        fetchMessages();
    }, [roomId]);

    // 뒤로가기 => 채팅목록/친구목록
    const [showFriendsList, setShowFriendsList] = useState(false); 
    
    const handleBackChat = () => {
        setShowFriendsList(true);
        onClose();
    };

    if (showFriendsList) {
        return <FriendsList />;
    }

    const toggleModal = () => {
        setShowChatModal(!showChatModal);
    };

    return (
        <div className='CreateChat'>
            <div className='chat-room-header'>
                <img src={process.env.PUBLIC_URL + '/img/attention_red.png'}
                    className="notice-btn" alt='notice'
                    />
                <img src={process.env.PUBLIC_URL + '/img/vote.png'}
                    className="vote-btn" alt='vote'
                    onClick={() => setShowVoteComponent(true)}
                    />
                <div className='chat-room-name'><h2>{roomName}</h2></div>
                <img src={process.env.PUBLIC_URL + '/img/users-group.png'}
                    className="modal-btn" alt='chatModal'
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleModal();
                    }}/>
                {showChatModal &&
                    <ChatModal
                        onClose={toggleModal}
                        selectedFriends={selectedFriends}
                        handleBackChat={handleBackChat}
                        roomId={roomId}
                    />}
            </div>
            {showVoteComponent && 
                <Vote roomId={roomId}
                      selectedFriends={selectedFriends}
                      onClose={() => setShowVoteComponent(false)}
                />}
        </div>
    );
}

export default ChatRoom;