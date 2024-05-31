import { useEffect, useRef, useState } from 'react';
import '../css/MainSession.css'
import axios from 'axios';

function MainSession() {

    const [foodName, setFoodName] = useState('');
    const [imgUrl, setImageUrl] = useState('');

    const handleInputChange = (e) => {
        setFoodName(e.target.value);
    };

    //투표 결과로 선정된 메뉴를 이 함수로
    const handleSearch = async () => {
        try {
            console.log(foodName);
            const response = await axios.get(`http://localhost:8080/image/${foodName}`,
            {
                responseType: 'blob'
            });
            const url = URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
            setImageUrl(url);
        } catch (error) {
            console.error('Error fetching image:', error);
        }

    };


    return (
        <div className="MainSession">
            <div className='food-alert'>
                <div className='foodText'>
                    오늘 선정된 음식은?
                </div>
                {/*임시로 검색시 이미지 보이도록 설정*/}
                <input type="text" value={foodName} onChange={handleInputChange} />
                <button onClick={handleSearch}>Search</button>
                {imgUrl &&
                <div>
                    <h2>{foodName}</h2>
                    <img src={imgUrl} alt={foodName}/>
                </div>
                }
            </div>
        </div>
    );
}

export default MainSession;