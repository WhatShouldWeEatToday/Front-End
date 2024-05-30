import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import '../css/CreateChat.css';
import Vote from './Vote';

function CreateChat({ selectedFriends, onClose }) {
    const chatMember = selectedFriends.map(friend => friend.friendNickname).join(',');
    const chatMemberID = selectedFriends.map(friend => friend.friendLoginId);


    console.log("ID 값", chatMemberID);
    const [stompClient, setStompClient] = useState(null);
    const [chatRoomName] = useState(chatMember + "과의 채팅방");
    const [roomId, setRoomId] = useState(null); // 방 ID 저장 상태 추가

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
            
            client.subscribe(`/topic/public/${chatMemberID}`, (message => {
                console.log('받은 메세지: ', message.body);
                const roomId = JSON.parse(message.body);
                setRoomId(roomId);
                console.log("Room created with ID: " + roomId);
            }))
        }, (error) => {
            console.error('Error connecting to Websocket', error);
        });

        return () => {
            if(stompClient) {
                stompClient.disconnect();
            }
        }
    }, []);
    
    const handleCreateRoom = (client) => {
        const requestDTO = {
            name : chatRoomName,
            friendLoginIds : selectedFriends.map(friend => friend.friendLoginId),
        };

        client.send('/app//chat.createRoomAndInviteFriends', {}, JSON.stringify(requestDTO));
        console.log("채팅방 생성 !");
        // onclose();
    }

    const [showVoteComponent, setShowVoteComponent] = useState(false); // 투표 컴포넌트
    return (
        <div className='CreateChat'>
            <div className='chat-room-header'>
                <img src={process.env.PUBLIC_URL + '/img/attention_red.png'}
                    className="notice-btn" alt='notice'/>
                <img src={process.env.PUBLIC_URL + '/img/vote.png'}
                    className="vote-btn" alt='vote'
                    onClick={() => setShowVoteComponent(true)}/>
                <div className='chat-room-name'><h2>{chatRoomName}</h2></div>
                <button className="friend-list-btn" onClick={onClose}>친구목록</button>
            </div>
            
            <div>
                참여 멤버 :
                {selectedFriends.map(friend => (
                    <div key={friend.friendLoginId}>
                        {friend.friendNickname} ({friend.friendLoginId})
                    </div>
                ))}
            </div>
            {showVoteComponent && <Vote roomId={roomId} onClose={() => setShowVoteComponent(false)}/>}
        </div>
    );
}

export default CreateChat;