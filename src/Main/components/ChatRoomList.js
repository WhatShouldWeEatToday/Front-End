import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/ChatRoomList.css";

function ChatRoomList() {
    //나의 채팅방 데이터
    const [myChatRoom, setMyChatRoom] = useState([]);
    //검색 데이터 저장
    const [search, setSearch] = useState('');

    //토큰
    const headers =
    {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`, // localStorage에서 저장된 accessToken을 가져와서 헤더에 포함
    };

    //나의 채팅방 데이터 불러오기
    const getMyChatRoom = async () => {
        try{
            const respone = await axios
            .get("http://localhost:8080/chat/rooms",
            {
                headers: headers, // 헤더 설정
            });
            console.log(respone);
            setMyChatRoom(respone.data);
            console.log("받아온 채팅방 데이터", respone.data);
        } catch(err){
            console.log({error: err});
        }
    };

    useEffect(() => {
        getMyChatRoom();
    }, []);

    //친구 검색
    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    }


    const searchChatRoom = myChatRoom.filter(rooms => 
        rooms.roomName.toLocaleLowerCase().includes(search)
    );


    const ClickSearch = async () => {
        /*axios 수정해야함*/

        // try{
        //     const respone = await axios
        //     .get('http://localhost:8080/chat/friend/search/');
        //     const content = respone.data;
        //     setSearch(content);
        // } catch (err){
        //     console.log({error : err});
        // }
    }

    const myRoomList = searchChatRoom.map(room => {
        return(
            <div className="rooms-list">
                <div className="rooms-name">{room.roomName}</div>
                <div className="rooms-invite"
                ></div>
            </div>
        )
    })

    return (
        <div className="ChatRoomList">
            <div className="ChatRoom-search">
                <input
                type="search"
                className="ChatRoom-serach-bar"
                onChange={handleSearch}
                value={search}/>
                <img src={process.env.PUBLIC_URL + '/img/yellow_search.png'}
                    className="search_icon"
                    alt='search'
                    onChange={handleSearch}
                    onClick={ClickSearch}
                    />
            </div>
            <div className="ChatRoomList-body">{myRoomList}</div>
        </div>
    );
}

export default ChatRoomList;