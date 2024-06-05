import React, { useEffect, useState } from "react";
import "../css/FriendsRequestTab.css";
import axios from "axios";

function FriendsRequestTab() {
    const [requestFriend, setRequestFriend] = useState([]);
    const [search, setSearch] = useState('');

    const headers = {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    };

    const getRequestFriends = async () => {
        try {
            const response = await axios.get("http://localhost:8080/chat/friend-add-list", {
                headers: headers,
            });
            setRequestFriend(response.data);
            console.log(response.data);
        } catch (err) {
            console.log({ error: err });
        }
    };

    useEffect(() => {
        getRequestFriends();
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    }

    const searchFriends = requestFriend.filter(friends =>
        friends.friendNickname.toLocaleLowerCase().includes(search)
    );

    const ClickSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/chat/friend/search/${search}`, {
                headers: headers,
            });
            const content = response.data;
            setRequestFriend(content);
        } catch (err) {
            console.log({ error: err });
        }
    }

    const reqFriendslist = searchFriends.map(friend => {
        return (
            <div className="friends-list" key={friend.friendshipId}>
                <img src={process.env.PUBLIC_URL + '/img/account.png'}
                    className="friends-profile" alt='profile' />
                <div className="friends-name">{friend.friendNickname}</div>
                <img src={process.env.PUBLIC_URL + '/img/invitation.png'}
                    className="friends-invite" alt='profile'
                    onClick={() => InviteFriendsList(friend.friendLoginId, friend.friendNickname)} />
            </div>
        )
    })

    const InviteFriendsList = async (friendId, friendNickname) => {
        try {
            const response = await axios.post(`http://localhost:8080/chat/friend/add/${friendId}`, {}, {
                headers: headers
            });
            console.log("친구 추가 데이터", response);
            alert(`${friendNickname} 과 친구가 되었습니다.`);

            // 친구 추가 후 목록에서 해당 친구 제거
            setRequestFriend(prevRequestFriend =>
                prevRequestFriend.filter(friend => friend.friendLoginId !== friendId)
            );
        } catch (err) {
            console.log({ error: err });
        }
    }

    return (
        <div className="FriendsRequestTab">
            <div className="Friends-search">
                <input
                    type="search"
                    className="friends-serach-bar"
                    onChange={handleSearch}
                    value={search} />
                <img src={process.env.PUBLIC_URL + '/img/yellow_search.png'}
                    className="search_icon"
                    alt='search'
                    onClick={ClickSearch} />
            </div>
            <div className="FriendsList-body">{reqFriendslist}</div>
        </div>
    );
}

export default FriendsRequestTab;
