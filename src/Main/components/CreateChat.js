import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function CreateChat({ selectedFriends, onClose }) {
    const chatMember = selectedFriends.map(friend => friend.friendNickname).join(',');
    const chatMemberID = selectedFriends.map(friend => friend.friendLoginId);

    console.log("ID 값", chatMemberID);
    const [stompClient, setStompClient] = useState(null);
    const [chatRoomName] = useState(chatMember + "의 채팅방");

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
        console.log("채팅방 생성 !")
        onclose();
    }

    return (
        <div>
            <h2>{chatRoomName}</h2>
            <div>
                참여 멤버
                {selectedFriends.map(friend => (
                    <div key={friend.friendLoginId}>
                        {friend.friendNickname} ({friend.friendLoginId})
                    </div>
                ))}
            </div>
            <button onClick={onClose}>친구목록</button>
        </div>
    );
}

export default CreateChat;
