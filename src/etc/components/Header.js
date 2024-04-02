import TopHeader from "./TopHeader";
import '../css/Header.css'
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <div className="Header">
            <div className='MainLogo'>
                <NavLink to="/">
                <img src={process.env.PUBLIC_URL + '/img/LOGO.png'} width='200px' alt='Logo' className='Logo'/>
                </NavLink>
            </div>
            <div className="Headers">
                <TopHeader></TopHeader>
                <ul className='Menu'>
                        <li className="Menu_Box">
                            <NavLink to="/" activeClassName="active">소개</NavLink>
                        </li>
                        <li className="Menu_Box">
                            <NavLink to="/restaurant/search" activeClassName="active">맛집 검색</NavLink>
                        </li>
                        <li className="Menu_Box">
                            <NavLink to="/review" activeClassName="active">맛집 리뷰</NavLink>
                        </li>
                        <li className="Menu_Box">
                            <NavLink to="/ranking" activeClassName="active">랭킹</NavLink>
                        </li>
                    </ul>
            </div>
        </div>
    );
}

export default Header;