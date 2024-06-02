import { useState } from 'react';
import '../css/GroupSession.css';
import Modal from './Modal';
import FriendsTab from './FriendsTab';
import ChatRoom from './ChatRoom';

function GroupSession(props) {
    const [group, setGroup] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleRoomClick = (room) => {
        const selectedFriends = room.participants.map(participant => ({
            friendLoginId: participant.loginId,
            friendNickname: participant.nickname,
        }));
        setSelectedRoom({ roomId: room.id, roomName: room.roomName, selectedFriends });
    }

    const handleCloseChat = () => {
        setSelectedRoom(null);
    };

    return (
        <div className="GroupSession">
            <img src={process.env.PUBLIC_URL + '/img/users-group.png'}
                width='80px'
                alt='group'
                className='group-img'
                onClick={() => setGroup(!group)}/>
            {group && (
                <Modal closeModal={() => setGroup(!group)}>
                    {selectedRoom ? (
                    <ChatRoom
                        roomId={selectedRoom.roomId}
                        roomName={selectedRoom.roomName}
                        onClose={handleCloseChat}
                        selectedFriends={selectedRoom.selectedFriends}
                        />
                    ) : (
                        <FriendsTab onRoomClick={handleRoomClick}/>
                    )}
                </Modal>
            )}
            <div className='group-text'>
                그룹만들기
            </div>
        </div>
    );
}

export default GroupSession;
