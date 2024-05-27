import { useState } from "react";
import "../css/Departure.css";
import axios from "../../etc/utils/apis";
import PostCode from 'react-daum-postcode';

function Departure ({address, setAddress}) {
    // const [address, setAddress] = useState('');
    const [isOpen, setIsOpen] = useState(false);


    const handleComplete = (data) => {
        const { address } = data;
        if(address.includes("구미")) {
            setAddress(address);
        } else{
            alert("출발지를 구미 내로 설정해주세요.");
        }
    };

    const handleCloser = (state) => {
        if(state === 'FORSE_CLOSE' || state === 'COMPLETE_CLOSE') {
            setIsOpen(false);
        }
    };

    const handleToggle = () => {
        setIsOpen((prevOpenState) => !prevOpenState);
    };

    const handleDepature = () => {
        // sendAddress();
        alert("출발지가 등록되었습니다.");
        console.log(address);
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