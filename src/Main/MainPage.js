import Header from "../etc/components/Header"
import MainSession from "./components/MainSession";
import Vote from "./components/Vote";
import './css/MainPage.css'


function MainPage() {
    return (
        <div className="MainPage">
            <Header></Header>
            <div className="Main">
                <MainSession></MainSession>
                <Vote></Vote>
            </div>
        </div>
    );
}

export default MainPage;