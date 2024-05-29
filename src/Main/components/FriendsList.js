import React, { useEffect, useState } from "react";
import '../css/FriendsList.css';
import axios from "axios";

function FriendsList({onShowCreateChat}) { 
    //나의 친구 데이터 통신
    const [myFriends, setMyFriends] = useState([]);
    //검색 데이터 저장
    const [search, setSearch] = useState('');

    //토큰
    const headers =
    {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // localStorage에서 저장된 accessToken을 가져와서 헤더에 포함
    };

    //친구목록 불러오기
    const getMyFriends = async () => {
        try{
            const respone = await axios
            .get("http://localhost:8080/chat/friend-list",
            {
                headers: headers, // 헤더 설정
            });
            setMyFriends(respone.data);
            console.log("받아온 친구 데이터", respone.data);
        } catch(err){
            console.log({error: err});
        }
    };

    useEffect(() => {
        getMyFriends();
    }, []);

    //친구 검색
    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    }

    const searchFriends = myFriends.filter(friends => 
        friends.friendNickname.toLocaleLowerCase().includes(search)
    );

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

    //채팅방 초대할 친구 선택
    const [invite, setInvite] = useState({});
    const [selectedFriends , setSelectedFriends] = useState([]);

    const handleInvite = (friend) => {
        setInvite(prevStatus => ({
            ...prevStatus,
            [friend.friendLoginId] : !prevStatus[friend.friendLoginId],
        }));
        console.log("선택된 친구",invite);

        setSelectedFriends(prevSelectedFriends => {
            if(prevSelectedFriends.some(selectedFriends => selectedFriends.friendLoginId === friend.friendLoginId)) {
                return prevSelectedFriends.filter(selectedFriends => selectedFriends.friendLoginId !== friend.friendLoginId);
            } else{
                return [...prevSelectedFriends, friend];
            }
        });
    };


    const myFriendslist = searchFriends.map(friend => {
        const isInvited = invite[friend.friendLoginId] || false;
        return(
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
        )
    })



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
            <div className="FriendsList-body">{myFriendslist}</div>
            <div className="Group" onClick={() => onShowCreateChat(selectedFriends)}>
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