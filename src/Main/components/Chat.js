import "../css/Chat.css";
import * as React from 'react';
import { useState } from "react";
import axios from "../../etc/utils/apis";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Departure from "./Departure";
import dayjs from "dayjs";

function Chat(props) {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [place, setPlace] = useState('');
    const [course, setCourse] = useState();

    const promieTime = dayjs(date).format("YYYYMMDD") + dayjs(time).format('HHmm'); //약속시간
    const [address, setAddress] = useState('');

    const sendAddress = async () => {

        if(address){
            try{
                const response = await axios
                .post("http://localhost:8080/restaurant/search/totalPath",
                {
                    departure: address,
                    destination: "경북 구미시 상림로 67",
                    //경북 구미시 산호대로29길 14-16, 경북 구미시 상림로 67
                    searchDttm: promieTime
                });

                console.log("response 파일", response);
                setCourse(response.data);
                localStorage.setItem('courseData', JSON.stringify({course})); //경로데이터 로컬스토리지에 저장
                console.log("경로 데이터 파일",course);
                onPopup();
            
            } catch (err){
                console.log({error: err});
            }
        } else{
            alert("주소를 입력해주세요");
        }
        
    };
    const promises = (
        <div className="promise-area">
                    <div className="promise-content">
                        <div className="promise-header">오늘 뭐 먹지?</div>
                        <div className="promise-menu">떡볶이</div>
                        <div className="promise-alltime">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="약속 날짜를 선택해주세요"
                                        inputFormat={"yyyy-MM-dd"}
                                        selected={date}
                                        onChange={(day) => setDate(day)}
                                        slotProps={{
                                            textField: {
                                                size: "small",
                                            },
                                        }}/>
                                    <DemoContainer components={['TimePicker']}>
                                        <TimePicker
                                            label="약속 시간을 선택해주세요"
                                            selected={time}
                                            onChange={(selectTime) => setTime(selectTime)}
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                },
                                            }}/>
                                    </DemoContainer>
                                </LocalizationProvider>
                        </div>
                        <div className="promise-place">
                            <div className="place-name">
                                약속 장소: 
                            </div>
                            <input type=""
                                className="place"
                                onChange={(e) => {setPlace(e.target.value)}}/>
                        </div>
                        <div className="promise-btns">
                            <button className="promise-btn">공지 삭제</button>
                            <button className="promise-btn">공지 등록</button>
                        </div>
                        
                    </div>
                    <div className="chat-member">
                        <img src={process.env.PUBLIC_URL + '/img/account.png'}
                        className="chat-mem" alt='profile'/>
                        <div className="chat-mem-name">임수연</div>
                    </div>
                </div>
    );
    
    const {param} = props;

    const onPopup = () => {
        const url = 'restaurant/course';
        window.open(url, "_blank", "noopener, noreferrrer");
    }

    return (
        <div className="ChatSession">
            {/* <div className="chat-header">
                <img src={process.env.PUBLIC_URL + '/img/attention_red.png'}
                    className="chat-notice" alt='notice'/>
                <div className="chat-name">그룹1</div>
                <img src={process.env.PUBLIC_URL + '/img/users-group.png'}
                    className="chat-group" alt='member'/>
            </div> */}

            <div className="chat-area">
                
                {/* 출발지 설정 */}
                {/* <Departure address={address} setAddress={setAddress}/> */}

                {/* 투표 */}
                {/* <div className="chat-and-vote">
                    <div className="chat-vote-area">
                        <div className="promise-header">오늘 뭐 먹지?</div>
                        <div className="menu-scrpit">
                            임수연님이
                            <br/>오늘 돈까스 와 떡볶이 중에
                            <br/>먹고 싶어합니다.
                            <br/>투표해주세요 !
                        </div>
                        <div className="vote-menu">
                            <button className="vote-menu-btn">돈까스</button>
                            <button className="vote-menu-btn">떡볶이</button>
                        </div>
                    </div>
                    <div className="chat-member">
                        <img src={process.env.PUBLIC_URL + '/img/account.png'}
                        className="chat-mem" alt='profile'/>
                        <div className="chat-mem-name">임수연</div>
                    </div>
                </div> */}

                {/* 투표 종료 */}
                {/* <div className="vote-finish">투표가 종료되었습니다.</div> */}

                {/* 임시 */}
                    {/* <button
                     className="course-btn" onClick={sendAddress}>경로조회</button> */}
                {/* 약속 설정 */}
                {/* {promises} */}
            </div>
        </div>
    );
}

export default Chat;