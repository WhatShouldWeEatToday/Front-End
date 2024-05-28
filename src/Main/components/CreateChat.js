import React, { useEffect } from 'react';
import chatService from './ChatService';


function CreateChat({ selectedFriends, onClose }) {

    //토큰
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // localStorage에서 저장된 accessToken을 가져와서 헤더에 포함
      };

    useEffect(() => {
        chatService.connect(headers, (message) => {
            console.log('받은 메세지: ', message);
        });

        return() => {
            chatService.disconnect();
        };
        
    }, []);

    const handleCreateRoom = () => {
        const roomName = "new Chat";
        const friendloginId = selectedFriends.map(friend => friend.friendloginId);
        const requestDTO = {
            name : roomName,
            friendloginId: friendloginId
        };

        chatService.sendMessage('/app/chat.createRoomAndInviteFriends', requestDTO);
    }

    return (
        <div>
            <h2>채팅방1</h2>
            <div>
                참여 멤버
                {selectedFriends.map(friend => (
                    <div key={friend.friendloginId}>
                        {friend.friendNickname} ({friend.friendloginId})
                    </div>
                ))}
            </div>
            <button onClick={handleCreateRoom}>생성</button>
            <button onClick={onClose}>뒤로가기</button>
        </div>
    );
}

export default CreateChat;
