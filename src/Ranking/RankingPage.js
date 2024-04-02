import Header from "../etc/components/Header"
import RankingSession from "./components/RankingSession";
import './css/RankingPage.css';

function RankingPage() {
    return (
        <div className="RankingPage">
            <Header></Header>
            <RankingSession></RankingSession>
        </div>
    );
}

export default RankingPage;