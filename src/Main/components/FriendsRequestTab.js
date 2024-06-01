import React, { useEffect, useState } from "react";
import "../css/FriendsRequestTab.css";
import axios from "axios";

function FriendsRequestTab() {

    //나의 친구 데이터 통신
    const [requestFriend, setRequestFriend] = useState([]);
    //검색 데이터 저장
    const [search, setSearch] = useState('');

    const headers = 
    {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`, // localStorage에서 저장된 accessToken을 가져와서 헤더에 포함
    };

    const getRequestFriends = async () => {
        try{
            const respone = await axios
            .get("http://localhost:8080/chat/friend-add-list",
            {
                headers: headers, // 헤더 설정
            });
            setRequestFriend(respone.data);
            console.log(respone.data);
        } catch(err){
            console.log({error: err});
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

    const reqFriendslist = searchFriends.map(friend => {
        return(
            <div className="friends-list" key={friend.friendshipId}>
                <img src={process.env.PUBLIC_URL + '/img/account.png'}
                    className="friends-profile" alt='profile'/>    
                <div className="friends-name">{friend.friendNickname}</div>
                <img src={process.env.PUBLIC_URL + '/img/invitation.png'}
                 className="friends-invite" alt='profile'/>    
            </div>
        )
    })

    const ClickSearch = async () => {
        try{
            const respone = await axios
            .get('http://localhost:8080/chat/friend/search/');
            const content = respone.data;
            setSearch(content);
        } catch (err){
            console.log({error : err});
        }
    }


    return (
        <div className="FriendsRequestTab">
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
                    onClick={ClickSearch}/>
            </div>
            <div className="FriendsList-body">{reqFriendslist}</div>
        </div>
    );
}

export default FriendsRequestTab;