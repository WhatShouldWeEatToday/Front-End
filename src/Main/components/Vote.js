import React, { useState, useEffect } from 'react';
import '../css/Vote.css';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import Notice from './Notice';

function Vote({ onClose, currentUser, roomId, selectedFriends, voteData, setVoteData }) {
    // 상태 정의
    const [inputValue1, setInputValue1] = useState(voteData.menu1 || '');
    const [inputValue2, setInputValue2] = useState(voteData.menu2 || '');
    const [showChatAndVote, setShowChatAndVote] = useState(!!voteData.menu1 && !!voteData.menu2);
    const [voteCount1, setVoteCount1] = useState(voteData.voteCount1 || 0);
    const [voteCount2, setVoteCount2] = useState(voteData.voteCount2 || 0);
    const [voted, setVoted] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [voteId, setVoteId] = useState(voteData.voteId || null);
    const [stompClient, setStompClient] = useState(null);
    const [voteEnd, setVoteEnd] = useState(null);
    const [showNotice, setShowNotice] = useState(false); // Notice 컴포넌트를 표시할 상태 추가
    const [maxVotedMenu, setMaxVotedMenu] = useState('');
    const [meetId, setMeetId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowChatAndVote(true);
        submitVote();
    };

    const isInputsFilled = () => {
        return inputValue1.trim() !== '' && inputValue2.trim() !== '';
    };

    //투표 카운트 하기
    const handleVote = (menuNumber) => {
        if (!voted) {
            const headers = {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            };
            const voteRequest = {
                menu: menuNumber === 1 ? 'menu1' : 'menu2',
                voteCount1: menuNumber === 1 ? voteCount1 + 1 : voteCount1,
                voteCount2: menuNumber === 2 ? voteCount2 + 1 : voteCount2
            };

            stompClient.send(`/app/vote/increment/${roomId}/${voteId}`, headers, JSON.stringify(voteRequest));

            setVoted(true);
            setSelectedMenu(menuNumber);
            if (menuNumber === 1) {
                setVoteCount1(voteCount1 + 1);
            } else {
                setVoteCount2(voteCount2 + 1);
            }
        }
    };

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws-stomp');
        const client = Stomp.over(socket);

        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        };

        client.connect(headers, () => {
            setStompClient(client);
            console.log('WebSocket 연결 성공');

            client.subscribe(`/topic/room/${roomId}`, (message) => {
                const updatedVoteData = JSON.parse(message.body);
                setVoteData(updatedVoteData);
                setVoteCount1(updatedVoteData.voteCount1);
                setVoteCount2(updatedVoteData.voteCount2);
                setVoteEnd(updatedVoteData.countSame); // voteEnd 상태 업데이트
                
            });
        }, (error) => {
            console.error('WebSocket 연결 오류', error);
        });

        return () => {
            if (client) {
                client.disconnect(() => {
                    console.log('WebSocket 연결 해제');
                });
            }
        };
    }, [roomId, setVoteData]);
    

    // voteEnd가 변경될 때마다 로그를 출력하고 voteEnd가 true가 되면 Notice를 표시
    useEffect(() => {
        if (voteEnd) {
            setShowNotice(true);
        }
    }, [voteEnd]);

    //투표 종료
    useEffect(() => {
        if(voteEnd){
            handleEndVote(stompClient)
        }
    })

    // useEffect(()=> {
    //     const winnerMenu = voteCount1 > voteCount2 ? inputValue1 : inputValue2; 
    //     setWinner(winnerMenu);

    // }, [voteCount1 , voteCount2, inputValue1,  inputValue2]);
    
    const submitVote = () => {
        if (stompClient && stompClient.connected) {
            handleSubmitVote(stompClient);
        } else {
            console.error("WebSocket이 연결되지 않았습니다.");
        }
    };

    const handleEndVote = (client) => {
    if (client && client.connected) {
        // 메시지 구독 설정
        client.subscribe(`/topic/room/${roomId}`, (message) => {
            const response = JSON.parse(message.body);
            console.log("투표종료!!!!!!!!!", response);
            setMaxVotedMenu(response.maxVotedMenu);
            setMeetId(response.meetId);
        });

        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
        };

        // 메시지 전송
        client.send(`/app/vote/end/${roomId}/${voteId}`, {}, JSON.stringify(headers));
    } else {
        console.error("WebSocket이 연결되지 않았습니다.");
    }
}

    //투표 생성하기
    const handleSubmitVote = (client) => {
        const voteData = {
            menu1: inputValue1,
            menu2: inputValue2,
            friendLoginId: selectedFriends.map(friend => friend.friendLoginId),
        };

        if (client && client.connected) {
            client.subscribe(`/topic/room/${roomId}`, (message) => {
                const response = JSON.parse(message.body);

                console.log("투표아이디!!!!!!!!!",response)
                setVoteId(response.voteId);
            });

            const headers = {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
            };

            client.send(`/app/vote/register/${roomId}`, headers, JSON.stringify(voteData));
        } else {
            console.error("WebSocket이 연결되지 않았습니다.");
        }
    };

    const handleVoted = () => {
        if (selectedMenu !== null) {
            const userSelected = selectedMenu === 1 ? inputValue1 : inputValue2;
            const votedData = {
                voteId: voteId,
                menu1: inputValue1,
                menu2: inputValue2,
                voteCount1: voteCount1,
                voteCount2: voteCount2,
            };

            if (stompClient && stompClient.connected && window.confirm(`${userSelected}로 투표되었습니다.`)) {
                const headers = {
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                };

                stompClient.send(`/app/vote/increment/${roomId}/${voteId}`, headers, JSON.stringify(votedData));
            }
        } else {
            alert("메뉴를 선택해주세요.");
        }
    };

    return (
        <div>
            {showNotice ? (
                <Notice onClose={() => setShowNotice(false)} roomId={roomId} maxVotedMenu={maxVotedMenu} meetId={meetId}/>
            ) : showChatAndVote ? (
                <div className="chat-and-vote">
                    <div className="chat-vote-area">
                        <div className="promise-header">오늘 뭐 먹지?</div>
                        <div className="menu-scrpit">
                            <br />오늘 {inputValue1} 와 {inputValue2} 중에
                            <br />먹고 싶어합니다.
                            <br />투표해주세요!
                        </div>
                        <div className="vote-menu">
                            <button
                                className={`vote-menu-btn ${selectedMenu === 1 ? 'selected' : ''}`}
                                onClick={() => handleVote(1)}>
                                {inputValue1}
                            </button>
                            <button
                                className={`vote-menu-btn ${selectedMenu === 2 ? 'selected' : ''}`}
                                onClick={() => handleVote(2)}>
                                {inputValue2}
                            </button>
                        </div>
                    </div>
                    <button className="close-btn" onClick={handleVoted}>투표하기</button>
                </div>
            ) : (
                <InputVote
                    inputValue1={inputValue1}
                    inputValue2={inputValue2}
                    setInputValue1={setInputValue1}
                    setInputValue2={setInputValue2}
                    handleSubmit={handleSubmit}
                    isInputsFilled={isInputsFilled()}
                />
            )}
        </div>
    );
}

function InputVote({ inputValue1, inputValue2, setInputValue1, setInputValue2, handleSubmit, isInputsFilled }) {
    const handleChangeInput1 = (e) => {
        setInputValue1(e.target.value);
    };

    const handleChangeInput2 = (e) => {
        setInputValue2(e.target.value);
    };

    return (
        <div className='InputVote'>
            <div className='today-title'>오늘 뭐 먹지?</div>
            <div className='vote-title'>투표할 메뉴를 입력해주세요.</div>
            <form onSubmit={handleSubmit} className='menu-form'>
                <label className='menu-input'>
                    메뉴 1:
                    <input type="text" className="inputBox" value={inputValue1} onChange={handleChangeInput1} />
                </label>
                <br />
                <label className='menu-input'>
                    메뉴 2:
                    <input type="text" className="inputBox" value={inputValue2} onChange={handleChangeInput2} />
                </label>
                <br />
                <button type="submit"
                        disabled={!isInputsFilled}
                        className='vote-submit-btn'>제출</button>
            </form>
        </div>
    );
}

export default Vote;
