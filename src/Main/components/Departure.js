import { useState } from "react";
import "../css/Departure.css";
import PostCode from 'react-daum-postcode';

function Departure () {
    const [address, setAddress] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    // const [detailAddress, setDetailAddress] = useState('');


    const handleComplete = (data) => {
        const {address} = data;
        setAddress(address);
    };

    const handleCloser = (state) => {
        if(state === 'FORSE_CLOSE' || state === 'COMPLETE_CLOSE') {
            setIsOpen(false);
        }
    };

    const handleToggle = () => {
        setIsOpen((prevOpenState) => !prevOpenState);
    };

    // const handleInputChange = (e) => {
    //     setDetailAddress(e.target.value);
    // };

    const handleDepature = () => {
        alert("출발지가 등록되었습니다.");
    }


    return (
        <div className="Departure-area">
            <div className="depature-chat">
                <div className="depature-setting">
                    <div className="address-area">
                        <div className="address-name">
                            현 주소:
                        </div> 
                        <button
                            className="search-address"
                            type="button"
                            onClick={handleToggle}>
                            주소 찾기
                        </button>
                    </div>
                    {isOpen && (
                    <div>
                        <PostCode
                            className="postcode"
                            onComplete={handleComplete}
                            onClose={handleCloser}
                        />
                    </div>
                    )}
                    <div className="mem-address">
                        <div className="mem-add">{address}</div>
                        {/* <input
                        value={detailAddress}
                        onChange={handleInputChange}
                        /> */}
                    </div>
                    <button
                        className="addressClick"
                        type="button"
                        onClick={handleDepature}>
                            출발지 등록
                    </button>
                    
                </div>
                <div className="chat-member">
                    <img src={process.env.PUBLIC_URL + '/img/account.png'}
                        className="chat-mem" alt='profile'/>
                    <div className="chat-mem-name">임수연</div>
                </div>
            </div>
        </div>
    );
}

export default Departure ;