import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import '../css/Notice.css';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import Departure from './Departure';

function Notice({ roomId, meetId, maxVotedMenu }) {
    const [date, setDate] = useState(dayjs());
    const [time, setTime] = useState(dayjs());
    const [place, setPlace] = useState('');
    const [noticeTime, setNoticeTime] = useState("");
    const [stompClient, setStompClient] = useState(null);
    const [isNoticeRegistered, setIsNoticeRegistered] = useState(false); // 공지 등록 상태

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
                const noticeData = JSON.parse(message.body);
                console.log("noticeData", noticeData);
                console.log("noticeTime!!!!!!!!!!!!!!!!!", noticeData.meetTime)
                setNoticeTime(noticeData.meetTime);
                setPlace(noticeData.meetLocate);
                setIsNoticeRegistered(true);
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
    }, [roomId]);

    useEffect(() => {
        const promiseTime = dayjs(date).format("YYYYMMDD") + dayjs(time).format('HHmm');
        console.log("시간promiseTime!!!!!!!!!!!!!!!!!!!!!!", promiseTime);
        setNoticeTime(promiseTime);
    }, [date, time]);

    const submitVote = () => {
        if (!date || !time || !place.trim()) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        if (stompClient && stompClient.connected) {
            alert("공지가 등록되었습니다.");
            setIsNoticeRegistered(true); // 공지 등록 상태 변경

            const noticeRequest = {
                meetLocate: place,
                meetTime: noticeTime,
                meetMenu: maxVotedMenu,
            };

            console.log(noticeRequest); //시간 찍힘 확인

            const headers = {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
            };

            stompClient.send(`/app/meet/register/${roomId}/${meetId}`, headers, JSON.stringify(noticeRequest));
        } else {
            console.error("WebSocket이 연결되지 않았습니다.");
        }
    };

    return (
        <div className="promise-area">
            {isNoticeRegistered ? (
                <>
                    <div className="promise-content">
                        <div className="promise-header">오늘 뭐 먹지?</div>
                        <div className="promise-menu">{maxVotedMenu}</div>
                        <div className="promise-alltime">
                            <div>약속 날짜 : {date.format("YYYY-MM-DD")}</div>
                            <div>약속 시간 : {time.format("HH:mm")}</div>
                        </div>
                        <div className="promise-place">
                            <div className="place-name">
                                약속 장소 : {place}
                            </div>
                        </div>
                        <div className="promise-btns">
                            <button className="promise-btn">공지 삭제</button>
                        </div>
                    </div>
                    <Departure roomId={roomId} />
                </>
            ) : (
                <div className="promise-content">
                    <div className="promise-header">오늘 뭐 먹지?</div>
                    <div className="promise-menu">{maxVotedMenu}</div>
                    <div className="promise-alltime">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="약속 날짜를 선택해주세요"
                                inputFormat="yyyy-MM-dd"
                                value={date}
                                onChange={(day) => setDate(day)}
                                slotProps={{
                                    textField: {
                                        size: "small",
                                    },
                                }} />
                            <TimePicker
                                label="약속 시간을 선택해주세요"
                                value={time}
                                onChange={(selectTime) => setTime(selectTime)}
                                slotProps={{
                                    textField: {
                                        size: "small",
                                    },
                                }} />
                        </LocalizationProvider>
                    </div>
                    <div className="promise-place">
                        <div className="place-name">
                            약속 장소:
                        </div>
                        <input
                            type="text"
                            className="place"
                            onChange={(e) => setPlace(e.target.value)} />
                    </div>
                    <div className="promise-btns">
                        <button className="promise-btn" onClick={submitVote}>공지 등록</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Notice;
