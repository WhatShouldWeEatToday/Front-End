import React from 'react';
import FriendsList from './FriendsList';
import FriendsRequestTab from './FriendsRequestTab';

function TabContent({ activeTab, onShowCreateChat}) {
  return (
    <div className="TabContent">
      {activeTab === 0 &&
        <FriendsList onShowCreateChat={onShowCreateChat}/>
      }
      {activeTab === 1 &&
        <FriendsRequestTab/>
      }
    </div>
  );
}

export default TabContent;
