import './css/SearchPage.css';
import Header from "../etc/components/Header"
import SearchSession from './components/SearchSession';

function SearchPage() {
    return (
        <div className="MapPage">
            <Header></Header>
            <SearchSession></SearchSession>
        </div>
    );
}

export default SearchPage;