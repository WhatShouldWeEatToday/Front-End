import React, { useEffect, useState } from "react";
import '../css/FriendsList.css';
import axios from "axios";

function FriendsList() { 
    const [myFriends, setMyFriends] = useState([]);
    const [search, setSearch] = useState('');
    const [invite, setInvite] = useState({});
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [chatRoomName, setChatRoomName] = useState('');
    const [roomId, setRoomId] = useState(null);

    const headers = {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    };

    const getMyFriends = async () => {
        try {
            const response = await axios.get("http://localhost:8080/chat/friend-list", { headers });
            setMyFriends(response.data);
            console.log("받아온 친구 데이터", response.data);
        } catch (err) {
            console.log({ error: err });
        }
    };

    useEffect(() => {
        getMyFriends();
    }, []);

    useEffect(() => {
        const chatMember = selectedFriends.map(friend => friend.friendNickname).join(',');
        setChatRoomName(`${chatMember}과의 채팅방`);
    }, [selectedFriends]);

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    const searchFriends = myFriends.filter(friend => 
        friend.friendNickname.toLowerCase().includes(search)
    );

    const ClickSearch = async () => {
        try {
            const response = await axios.get('http://localhost:8080/chat/friend/search/');
            const content = response.data;
            setSearch(content);
        } catch (err) {
            console.log({ error: err });
        }
    };

    const handleInvite = (friend) => {
        setInvite(prevStatus => ({
            ...prevStatus,
            [friend.friendLoginId]: !prevStatus[friend.friendLoginId],
        }));

        setSelectedFriends(prevSelectedFriends => {
            if (prevSelectedFriends.some(selectedFriend => selectedFriend.friendLoginId === friend.friendLoginId)) {
                return prevSelectedFriends.filter(selectedFriend => selectedFriend.friendLoginId !== friend.friendLoginId);
            } else {
                return [...prevSelectedFriends, friend];
            }
        });
    };

    const myFriendsList = searchFriends.map(friend => {
        const isInvited = invite[friend.friendLoginId] || false;
        return (
            <div className="friends-list" key={friend.friendLoginId}>
                <img src={process.env.PUBLIC_URL + '/img/account.png'}
                    className="friends-profile" alt='profile'/>    
                <div className="friends-name">{friend.friendNickname}</div>
                <div className="friends-invite"
                    onClick={() => handleInvite(friend)}
                >
                    {isInvited ? (
                        <img src={process.env.PUBLIC_URL + '/img/invitation_y.png'}
                            className="invite-icon" alt='profile'/>
                        ) : (
                        <img src={process.env.PUBLIC_URL + '/img/invitation.png'}
                            className="invite-icon" alt='profile'/>
                    )}
                </div>
            </div>
        );
    });

    const CreateChatRoom = async (selectedFriends) => {
        if(selectedFriends.length > 0){
            const requestDTO = {
                name: chatRoomName,
                friendLoginIds: selectedFriends.map(friend => friend.friendLoginId),
            };
            try {
                const response = await axios.post("http://localhost:8080/room/create", requestDTO, { headers });
                console.log("채팅방 생성 데이터", response.data);
                setRoomId(response.data.id);
                alert(`${chatRoomName} 생성되었습니다.`);
            } catch (err) {
                console.log({ error: err });
            }
        } else {
            alert('한 명 이상의 친구를 선택해주세요.')
        }
    };

    return ( 
        <div className="FriendsList">
            <div className="Friends-search">
                <input
                type="search"
                className="friends-serach-bar"
                onChange={handleSearch}
                value={search}/>
                <img src={process.env.PUBLIC_URL + '/img/yellow_search.png'}
                    className="search_icon"
                    alt='search'
                    onChange={handleSearch}
                    onClick={ClickSearch}
                />
            </div>
            <div className="FriendsList-body">{myFriendsList}</div>
            <div className="Group" onClick={() => CreateChatRoom(selectedFriends)}>
                <img src={process.env.PUBLIC_URL + '/img/users-group.png'}
                    className="make-group"
                    alt='group'
                />
                <div className="group-text">그룹 만들기</div>
            </div>
        </div>
    );
}

export default FriendsList;
