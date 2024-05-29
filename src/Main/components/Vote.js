import { useState } from 'react';
import '../css/Vote.css';

function Vote({ onClose }) {
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [showChatAndVote, setShowChatAndVote] = useState(false);
    const [voteCount1, setVoteCount1] = useState(0);
    const [voteCount2, setVoteCount2] = useState(0);
    const [voted, setVoted] = useState(false); // 이미 투표했는지 여부를 나타내는 상태

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('메뉴 1:', inputValue1);
        console.log('메뉴 2:', inputValue2);
        setShowChatAndVote(true); // 입력을 제출하면 chat-and-vote 영역을 표시합니다.
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
                console.log(voteCount1);
            } else if (menuNumber === 2) {
                setVoteCount2(voteCount2 + 1);
                console.log(voteCount2)
            }
            setVoted(true); // 투표 완료 표시
        }
    };

    return (
        <div>
            {showChatAndVote ? (
                <div className="chat-and-vote">
                    <div className="chat-vote-area">
                        <div className="promise-header">오늘 뭐 먹지?</div>
                        <div className="menu-scrpit">
                            000님이
                            <br />오늘 {inputValue1} 와 {inputValue2} 중에
                            <br />먹고 싶어합니다.
                            <br />투표해주세요 !
                        </div>
                        <div className="vote-menu">
                            <button className="vote-menu-btn" onClick={() => handleVote(1)}>{inputValue1}</button>
                            <button className="vote-menu-btn" onClick={() => handleVote(2)}>{inputValue2}</button>
                        </div>
                    </div>
                    {/* <div className="chat-member">
                        <img src={process.env.PUBLIC_URL + '/img/account.png'}
                            className="chat-mem" alt='profile' />
                        <div className="chat-mem-name">임수연</div>
                    </div> */}
                    <button onClick={onClose}>닫기</button>
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
            <div className='today-title'>오늘 뭐 먹지 ?</div>
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
