import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import '../css/CreateChat.css';
import Vote from './Vote';
import Notice from './Notice';
import ChatModal from './ChatModal';
import FriendsList from './FriendsList';

function CreateChat({ selectedFriends, onClose }) {
    const chatMember = selectedFriends.map(friend => friend.friendNickname).join(',');
    const chatMemberID = selectedFriends.map(friend => friend.friendLoginId);

    // console.log("멤버 ID", chatMemberID);
    // console.log("ID 값", chatMemberID);
    
    const [stompClient, setStompClient] = useState(null);
    const [chatRoomName] = useState(chatMember + "과의 채팅방");
    const [roomId, setRoomId] = useState(null);
    const [enterMsg, setEnterMsg] = useState('');

    const [showVoteComponent, setShowVoteComponent] = useState(false); // 투표 컴포넌트
    const [showNoticeComponent, setNoticeComponent] = useState(false); //공지 컴포넌트
    const [showChatModal, setShowChatModal] = useState(false);  // 채팅 내 모달

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws-stomp');
        const client = Stomp.over(socket);
    
        const headers =
        {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // localStorage에서 저장된 accessToken을 가져와서 헤더에 포함
        };  
    
        client.connect(headers, () => {
            setStompClient(client);
            handleCreateRoom(client); //바로 실행

            // 각 friendLoginId에 대해 구독 설정
            chatMemberID.forEach(friendLoginId => {
                client.subscribe(`/topic/public/${friendLoginId}`, (message => {
                    console.log('받은 메세지: ', message.body);
                    let roomId = JSON.parse(message.body);
                    setEnterMsg(JSON.parse(message.body).content)
                    setRoomId(roomId);
                    console.log("Room ID: " + roomId);
                }));
            });
        }, (error) => {
            console.error('Error connecting to Websocket', error);
        });
    
        return () => {
            if(stompClient) {
                stompClient.disconnect();
            }
        }
    }, []);
    
    //채팅방 등록
    const handleCreateRoom = (client) => {
        const requestDTO = {
            name : chatRoomName,
            friendLoginIds : selectedFriends.map(friend => friend.friendLoginId),
        };

        client.send('/app//chat.createRoomAndInviteFriends', {}, JSON.stringify(requestDTO));
        console.log("채팅방 생성 !")
        // onclose();
    }

    const [showFriendsList, setShowFriendsList] = useState(false);

    const handleLeaveChat = () => {
        setShowFriendsList(true);
        onClose();
    };

    if(showFriendsList){
        return <FriendsList/>;
    }

    
    // const [voteCreated, setVoteCreated] = useState(false);

    //투표가 생성 되면 공지 띄우기
    // const handleVoteCreated = () => {
    //     setVoteCreated(true);
    //     setShowVoteComponent(false);
    //     setNoticeComponent(true);
    // }


    const toggleModal = () => {
        setShowChatModal(!showChatModal);
    };

    return (
        <div className='CreateChat'>
            <div className='chat-room-header'>
                <img src={process.env.PUBLIC_URL + '/img/attention_red.png'}
                    className="notice-btn" alt='notice'
                    // onClick={() => {
                    //     if(voteCreated) {
                    //         setShowVoteComponent(false);
                    //         setNoticeComponent(true);
                    //     }
                    // }}
                    />
                <img src={process.env.PUBLIC_URL + '/img/vote.png'}
                    className="vote-btn" alt='vote'
                    // onClick={() => {
                    //     if(voteCreated) {
                    //         setShowVoteComponent(true);
                    //         setNoticeComponent(false);
                    //     }
                    // }}
                    onClick={() => setShowVoteComponent(true)}
                    />
                <div className='chat-room-name'><h2>{chatRoomName}</h2></div>
                {/* <button className="friend-list-btn" onClick={onClose}>친구목록</button> */}
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
                        handleLeaveChat={handleLeaveChat}
                    />}
            </div>
            {showVoteComponent && 
                <Vote roomId={roomId}
                      selectedFriends={selectedFriends}
                      onClose={() => setShowVoteComponent(false)}
                    //   onVoteCreated={handleVoteCreated}
                />}
            {/* {showNoticeComponent &&
                <Notice roomId={roomId}
                    onClose={() => setNoticeComponent(false)}
                />} */}
        </div>
    );
}

export default CreateChat;