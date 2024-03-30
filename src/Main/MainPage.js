import Header from "../etc/components/Header"
import MainSession from "./components/MainSession";
import './css/MainPage.css'
import GroupSession from "./components/GroupSession";


function MainPage() {
    return (
        <div className="MainPage">
            <div className="Header-area">
                <Header/>
            </div>
            <div className="Main">
                <MainSession/>
            <div className="GroupSession">
                <GroupSession/>
            </div>
            </div>
        </div>
    );
}

export default MainPage;