import React, { useEffect, useState } from "react";
import '../css/FriendsList.css';
import axios from "axios";

function FriendsList() { 
    //나의 친구 데이터 통신
    const [myFriends, setMyFriends] = useState([]);
    //검색 데이터 저장
    const [search, setSearch] = useState('');

    const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // localStorage에서 저장된 accessToken을 가져와서 헤더에 포함
      };

    const getMyFriends = async () => {
        try{
            const respone = await axios
            .get("http://localhost:8080/chat/friend-list",
            {
                headers: headers, // 헤더 설정
            });
            setMyFriends(respone.data);
            console.log(respone.data);
        } catch(err){
            console.log({error: err});
        }
    };

    useEffect(() => {
        getMyFriends();
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    }

    const searchFriends = myFriends.filter(friends => 
        friends.friendNickname.toLocaleLowerCase().includes(search)
    );

    const myFriendslist = searchFriends.map(friend => {
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
                    onClick={ClickSearch}/>
            </div>
            <div className="FriendsList-body">{myFriendslist}</div>
            <div className="Group">
                <img src={process.env.PUBLIC_URL + '/img/users-group.png'}
                    className="make-group"
                    alt='group'
                />
                <div className="group-text">그룹만들기</div>
            </div>
        </div>
    );
}

export default FriendsList;