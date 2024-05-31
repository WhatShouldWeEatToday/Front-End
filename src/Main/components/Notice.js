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
import '../css/Notice.css';

//공지 => 투표 결과 메뉴를 받아와서 뿌려주기
function Notice() {

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [place, setPlace] = useState('');
    const [course, setCourse] = useState();

    const promieTime = dayjs(date).format("YYYYMMDD") + dayjs(time).format('HHmm'); //약속시간
    const [address, setAddress] = useState('');

    return (
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
}

export default Notice;