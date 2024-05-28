import React from 'react';

function CreateChat({ selectedFriends, onClose }) {
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
            <button onClick={onClose}>뒤로가기</button>
        </div>
    );
}

export default CreateChat;
