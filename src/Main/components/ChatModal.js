import React, { useEffect, useRef } from "react";
import "../css/ChatModal.css";

function ChatModal({ onClose, selectedFriends, handleLeaveChat  }) {
    const modalRef = useRef();

    useEffect(() => {
        function handleClickOutside(e) {
            if( modalRef.current && modalRef.current.contain(e.target)) {
                onClose();
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="ChatModal" ref={modalRef}>
            <div className="chatfriend-list">
                참여자 목록
                {selectedFriends.map(friend => (
                    <div className="chat-friend" key={friend.friendLoginId}>
                        {friend.friendNickname} ({friend.friendLoginId})
                    </div>
                ))}
            </div>
            <div className="leave" onClick={handleLeaveChat}>채팅방 나가기</div>
        </div>
    );
}

export default ChatModal;