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

    const promieTime = dayjs(date).format("YYYYMMDD") + dayjs(time).format('HHmm'); //약속시간
    const [address, setAddress] = useState('');

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

                {/* 투표 종료 */}
                {/* <div className="vote-finish">투표가 종료되었습니다.</div> */}

                {/* 임시 */}
                    {/* <button
                     className="course-btn" onClick={sendAddress}>경로조회</button> */}
                
            </div>
        </div>
    );
}

export default Chat;