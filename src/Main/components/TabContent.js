import React from 'react';
import FriendsList from './FriendsList';
import FriendsRequestTab from './FriendsRequestTab';
import ChatRoomList from './ChatRoomList';

function TabContent({ activeTab, onShowCreateChat, onRoomClick}) {
  return (
    <div className="TabContent">
      {activeTab === 0 &&
        <ChatRoomList onRoomClick={onRoomClick}/>
      }
      {activeTab === 1 &&
        <FriendsList onShowCreateChat={onShowCreateChat}/>
      }
      {activeTab === 2 &&
        <FriendsRequestTab/>
      }
    </div>
  );
}

export default TabContent;
