import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../css/CreateChat.css';
import Vote from './Vote';
import ChatModal from './ChatModal';
import FriendsList from './FriendsList';

function CreateChat({ selectedFriends, onClose }) {
    const chatMember = selectedFriends.map(friend => friend.friendNickname).join(',');
    const chatMemberID = selectedFriends.map(friend => friend.friendLoginId);

    const [chatRoomName] = useState(chatMember + "과의 채팅방");
    const [roomId, setRoomId] = useState(null);
    const [showVoteComponent, setShowVoteComponent] = useState(false); // 투표 컴포넌트
    const [showChatModal, setShowChatModal] = useState(false);  // 채팅 내 모달

    const headers = {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    };

    // 채팅방 생성 및 친구초대 post.ver
    const CreateChatRoom = async (selectedFriends) => {
        const requestDTO = {
            name: chatRoomName,
            friendLoginIds: selectedFriends.map(friend => friend.friendLoginId),
        };
        try {
            const response = await axios.post("http://localhost:8080/room/create", requestDTO, { headers });
            console.log("채팅방 생성 데이터", response.data);
            setRoomId(response.data.id); // 채팅방 ID 저장
        } catch (err) {
            console.log({ error: err });
        }
    };

    //두번 보내기 방지
    const hasCreatedRoom = useRef(false);
    useEffect(() => {
        if (!hasCreatedRoom.current && selectedFriends.length > 0) {
            CreateChatRoom(selectedFriends);
            hasCreatedRoom.current = true;
        }
    }, [selectedFriends]);

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
                <div className='chat-room-name'><h2>{chatRoomName}</h2></div>
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

export default CreateChat;
