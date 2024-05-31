import React from 'react';
import FriendsList from './FriendsList';
import FriendsRequestTab from './FriendsRequestTab';
import ChatRoomList from './ChatRoomList';

function TabContent({ activeTab, onShowCreateChat}) {
  return (
    <div className="TabContent">
      {activeTab === 0 &&
        <ChatRoomList/>
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
