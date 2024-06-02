import { useState, useEffect } from 'react';
import '../css/Vote.css';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function Vote({ onClose, currentUser, roomId, selectedFriends }) {
    const [inputValue1, setInputValue1] = useState(''); // 메뉴1 이름
    const [inputValue2, setInputValue2] = useState(''); // 메뉴2 이름
    const [showChatAndVote, setShowChatAndVote] = useState(false); 
    const [voteCount1, setVoteCount1] = useState(0); // 메뉴1 카운트
    const [voteCount2, setVoteCount2] = useState(0); // 메뉴2 카운트
    const [voted, setVoted] = useState(false); // 이미 투표했는지 여부를 나타내는 상태
    const [selectedMenu, setSelectedMenu] = useState(null); // 클릭된 버튼 상태를 관리
    const [voteId, setVoteId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('메뉴 1:', inputValue1);
        console.log('메뉴 2:', inputValue2);
        setShowChatAndVote(true); // 입력을 제출하면 chat-and-vote 영역을 표시
        submitVote();
    };

    // 입력값이 모두 채워졌는지 확인하는 함수
    const isInputsFilled = () => {
        return inputValue1.trim() !== '' && inputValue2.trim() !== '';
    };

    // 투표 기능
    const handleVote = (menuNumber) => {
        if (!voted) { // 투표하지 않았을 경우에만 투표 기능 작동
            if (menuNumber === 1) {
                setVoteCount1(voteCount1 + 1);
            } else if (menuNumber === 2) {
                setVoteCount2(voteCount2 + 1);
            }
            setVoted(true); // 투표 완료 표시
            setSelectedMenu(menuNumber); // 클릭된 버튼 상태를 업데이트
        }
    };

    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        // WebSocket 연결 설정
        const socket = new SockJS('http://localhost:8080/ws-stomp');
        const client = Stomp.over(socket);

        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        };

        console.log("Connecting with headers:", headers);

        client.connect(headers, () => {
            setStompClient(client);
            console.log('WebSocket 연결 성공');
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
    }, []);

    // 투표 생성
    const submitVote = () => {
        if (stompClient && stompClient.connected) {
            handleSubmitVote(stompClient);
        } else {
            console.error("WebSocket이 연결되지 않았습니다.");
        }
    };

    // 채팅 생성 보내고 투표 아이디 받아오기
    const handleSubmitVote = (client) => {
        const voteData = {
            menu1: inputValue1,
            menu2: inputValue2,
            friendLoginId: selectedFriends.map(friend => friend.friendLoginId),
        };
    
        console.log("투표 등록 데이터:", voteData);
    
        if (client && client.connected) {
            client.subscribe(`/topic/room/${roomId}`, (message) => {
                let voteId = JSON.parse(message.body).voteId;
                setVoteId(voteId);
                console.log("VoteID: ", voteId);
            });

            // 여기서 헤더를 포함하여 메시지 전송
            const headers = {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
            };

            client.send(`/app/vote/register/${roomId}`, headers, JSON.stringify(voteData));
            console.log("투표 등록!");

        } else {
            console.error("WebSocket이 연결되지 않았습니다.");
        }
    };

    // 멤버 투표 결과 전송
    const handleVoted = () => {
        if (selectedMenu !== null) {
            const userSelected = selectedMenu === 1 ? inputValue1 : inputValue2;
            console.log("선택한 메뉴: ", userSelected);
            const votedData = {
                voteId: voteId,
                menu1: inputValue1,
                menu2: inputValue2,
                voteCount1: voteCount1,
                voteCount2: voteCount2,
            };
            console.log("votedData의 결과값", votedData);

            if (stompClient && stompClient.connected && window.confirm(`${userSelected}로 투표되었습니다.`)) {
                // 여기서도 헤더를 포함하여 메시지 전송
                const headers = {
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                };
                stompClient.subscribe(`/topic/room/${roomId}`, (message) => {
                    console.log("투표 한 뒤에 결과값: ", message.body);
                });

                stompClient.send(`/vote/increment/${roomId}/${voteId}`, headers, JSON.stringify(votedData));
            }
        } else {
            alert("메뉴를 선택해주세요.");
        }
    };

    return (
        <div>
            {showChatAndVote ? (
                <div className="chat-and-vote">
                    <div className="chat-vote-area">
                        <div className="promise-header">오늘 뭐 먹지?</div>
                        <div className="menu-scrpit">
                            {/* {currentUser.userId}님이 */}
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
                    isInputsFilled={isInputsFilled()} // 입력값이 모두 채워졌는지 여부를 props로 전달
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
