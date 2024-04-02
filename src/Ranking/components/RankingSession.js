import '../css/RankingSession.css';
import React, { useState, useRef} from 'react';

const CATEGORY = [
    {id: 1, value: '카테고리별'},
    {id: 2, value: '음식별'}
];

const SelectBox = (props) => {
    return(
        <select className="rank-category">
            {props.options.map((option) => (
                <option
                className='rank-category-option'
                id={option.id}
                defaultValue={props.defaultValue === option.id}
                >
                {option.value}
                </option>
            ))}
        </select>
    )
}

function RankingSession() {

    // const dropDownRef = useRef();
    // const [selectedCategory, setSelectedCategory] = useState(CATEGORY[0].value);

    return (
        <div className='RankingSession'>
            <div className='RankingArea'>
                <div className='RankingTitle'>
                    <div className='rank-title'>주간 순위</div>
                    <SelectBox
                    options={CATEGORY}
                    defaultValue={CATEGORY[0].value}>
                    </SelectBox>
                </div>
                <div className='Ranking'>
                    <div className='Ranks'>
                        <img src={process.env.PUBLIC_URL + '/img/medal_1.png'} alt='ranks-img' className='ranks-img'/>
                        <div className='ranks-name'>한식</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RankingSession;