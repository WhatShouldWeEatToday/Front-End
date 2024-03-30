import { useEffect, useRef, useState } from 'react';
import '../css/MainSession.css'
import { DropDown } from './DropDown';

const FOOD_LIST = [
    {id: 1, value: '햄버거'},
    {id: 2, value: '떡볶이'},
    {id: 3, value: '마라탕'},
];

//외부 페이지 클릭
const useDetectClose = (ref, initialState) => {
    const [isOpen, setIsOpen] = useState(initialState);

    useEffect(() => {
        const pageClickEvent = e => {
            if(ref.current && !ref.current.cotains(e.target)){
                setIsOpen(! isOpen);
            }
        };
        if(isOpen){
            window.addEventListener('click', pageClickEvent);
        }
        return() => {
            window.removeEventListener('click', pageClickEvent);
        };   
    }, [isOpen, ref]);
    return [isOpen, setIsOpen];
}

function MainSession() {
    const dropDownRef = useRef();
    const [selectedFood, setSelectedFood] = useState('음식을 선택하세요');
    
    const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

    return (
        <div className="MainSession">
            <div className='food-alert'>
                <div className='foodText'>
                    오늘 선정된 음식은?
                </div>
                <div className='select-food-btn'>
                    <input
                    onClick={() => setIsOpen(!isOpen)}
                    type='button'
                    value={selectedFood}/>
                    {isOpen &&
                    <ul>
                        {FOOD_LIST.map((select, id) => (
                        <DropDown key={id} value={select.value} setIsOpen={setIsOpen} setSelectedFood={setSelectedFood} isOpen={isOpen}/>
                        ))}    
                    </ul>}
                </div>
            </div>
            <div className='selectedImg'>
                이미지파일
            </div>
        </div>
    );
}

export default MainSession;