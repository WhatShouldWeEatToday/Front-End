import React from 'react';
import '../css/TopHeader.css'
import { NavLink } from 'react-router-dom';

function TopHeader() {
    return (
        <div className="TopHeader">
            <div className='TopHeader_Box'>000님</div>
            <div className='TopHeader_Box'>로그아웃</div>
            <div className='TopHeader_Box'>
            <img src={process.env.PUBLIC_URL + '/img/notification.png'} width='50px' height='50px' alt='alert_on'/>    
            </div>
            <NavLink to='/mypage'><img src={process.env.PUBLIC_URL + '/img/account.png'} width='50px' height='50px' alt='profile'/></NavLink>
        </div>
    );
}

export default TopHeader;