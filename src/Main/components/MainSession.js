import '../css/MainSession.css'

function MainSession() {
    return (
        <div className="MainSession">
            <div className='foodText'>
                오늘 선정된 음식은?
            </div>
            <div className='select-food-btn'>
                + 음식 추가하기
            </div>
            <div className='selectedImg'>
                이미지파일
            </div>
        </div>
    );
}

export default MainSession;