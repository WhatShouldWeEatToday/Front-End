import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../css/ChatRoomList.css";

function ChatRoomList({ onRoomClick }) {
    const [myChatRoom, setMyChatRoom] = useState([]);
    const [search, setSearch] = useState('');

    const headers = {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    };

    const hasFetchedChatRooms = useRef(false);

    const getMyChatRoom = async () => {
        try {
            const response = await axios.get("http://localhost:8080/chat/rooms", { headers });
            setMyChatRoom(response.data);
            console.log("받아온 채팅방 데이터", response.data);
        } catch (err) {
            console.log({ error: err });
        }
    };

    useEffect(() => {
        if (!hasFetchedChatRooms.current) {
            getMyChatRoom();
            hasFetchedChatRooms.current = true;
        }
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    const searchChatRoom = myChatRoom.filter(room => 
        room.roomName.toLowerCase().includes(search)
    );

    const myRoomList = searchChatRoom.map(room => (
        <div className="rooms-list" key={room.id} onClick={() => onRoomClick(room)}>
            <div className="rooms-name">{room.roomName}</div>
        </div>
    ));

    return (
        <div className="ChatRoomList">
            <div className="ChatRoom-search">
                <input
                    type="search"
                    className="ChatRoom-search-bar"
                    onChange={handleSearch}
                    value={search}
                />
                <img
                    src={process.env.PUBLIC_URL + '/img/yellow_search.png'}
                    className="search_icon"
                    alt="search"
                />
            </div>
            <div className="ChatRoomList-body">{myRoomList}</div>
        </div>
    );
}

export default ChatRoomList;
