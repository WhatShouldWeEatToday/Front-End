import { useState } from 'react';
import '../css/GroupSession.css'
import Modal from './Modal';
import GroupList from './GroupList';

function GroupSession(props) {
    const [group, setGroup] = useState(false);
    

    return (
        <div className="GroupSession">
                <img src={process.env.PUBLIC_URL + '/img/users-group.png'}
                    width='80px'
                    alt='group'
                    className='group-img'
                    onClick={() => setGroup(!group)}/>
                {group && (
                    <Modal closeModal={()=>setGroup(!group)}>
                        <GroupList/>
                    </Modal>
                )}
                <div className='group-text'>
                    그룹만들기
                </div>
        </div>
    );
}

export default GroupSession;