import { useState } from "react";
import Tabs from "./Tabs";
import TabContent from "./TabContent";

function FriendsTab({onShowCreateChat, onRoomClick}) {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    }

    return (
        <div className="FriendsTab">
            <Tabs activeTab={activeTab} onTabClick={handleTabClick}/>
            <TabContent activeTab={activeTab} onShowCreateChat={onShowCreateChat} onRoomClick={onRoomClick}/>
        </div>
    );
}

export default FriendsTab;