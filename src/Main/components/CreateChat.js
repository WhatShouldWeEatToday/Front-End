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
    
    const [stompClient, setStompClient] = useState(null);
    const [chatRoomName] = useState(chatMember + "과의 채팅방");
    const [roomId, setRoomId] = useState(null);
    const [enterMsg, setEnterMsg] = useState('');

    const [showVoteComponent, setShowVoteComponent] = useState(false); // 투표 컴포넌트
    const [showNoticeComponent, setNoticeComponent] = useState(false); //공지 컴포넌트
    const [showChatModal, setShowChatModal] = useState(false);  // 채팅 내 모달
    const [voteCreated, setVoteCreated] = useState(false); //투표의 생성 여부 확인

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

    const [showFriendsList, setShowFriendsList] = useState(false); // 뒤로가기 => 채팅목록/친구목록

    const handleBackChat = () => {
        setShowFriendsList(true);
        onClose();
    };

    if(showFriendsList){
        return <FriendsList/>;
    }

    //투표가 생성 되면 공지 띄우기
    const handleVoteCreated = () => {
        setVoteCreated(true); // 투표 생성시
        setShowVoteComponent(false); // 투표 컴포넌트 종료
        setNoticeComponent(true); // 공지 컴포넌트 실행
    }


    const toggleModal = () => {
        setShowChatModal(!showChatModal);
    };

    return (
        <div className='CreateChat'>
            <div className='chat-room-header'>
                <img src={process.env.PUBLIC_URL + '/img/attention_red.png'}
                    className="notice-btn" alt='notice'
                    // onClick={() => {
                    //     if(voteCreated) { //투표 생성이 되면 공지 컴포넌트 실행
                    //         setShowVoteComponent(false); //투표 컴포넌트 종료
                    //         setNoticeComponent(true); // 공지 컴포넌트 실행
                    //     }
                    // }}
                    />
                <img src={process.env.PUBLIC_URL + '/img/vote.png'}
                    className="vote-btn" alt='vote'
                    // onClick={() => {
                    //     if(!voteCreated) { //투표 생성이 되지않으면 투표 컴포넌트 실행
                    //         setShowVoteComponent(true); // 투표 컴포넌트 실행
                    //         setNoticeComponent(false); // 공지 컴포넌트 종료
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
                        handleBackChat={handleBackChat}
                        roomId={roomId}
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