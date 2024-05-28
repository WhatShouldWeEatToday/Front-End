import { useState } from 'react';
import '../css/GroupSession.css';
import Modal from './Modal';
import FriendsTab from './FriendsTab';
import CreateChat from './CreateChat';

function GroupSession(props) {
    const [group, setGroup] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [showCreateChat, setShowCreateChat] = useState(false);

    const handleShowCreateChat = (selectedFriends) => {
        setSelectedFriends(selectedFriends);
        setShowCreateChat(true);
    };

    const handleHideCreateChat = () => {
        setShowCreateChat(false);
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
                    {showCreateChat ? (
                        <CreateChat selectedFriends={selectedFriends} onClose={handleHideCreateChat} />
                    ) : (
                        <FriendsTab onShowCreateChat={handleShowCreateChat} />
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
