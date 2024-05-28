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
import FriendsTab from "./FriendsTab";

function Chat(props) {
    return (
        <div className="ChatSession">
            <FriendsTab/>
            <div className="chat-area">
            
            </div>
        </div>
    );
}

export default Chat;