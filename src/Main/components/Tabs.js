import React from "react";
import "../css/Tabs.css";

function Tabs({activeTab, onTabClick}) {
    return (
        <div className="Tabs">
            <button
                className={activeTab === 0 ? 'tabactive ' : 'tab'}
                onClick={() => onTabClick(0)}>
                    친구 목록
            </button>
            <button
                className={activeTab === 1 ? 'tabactive' : 'tab'}
                onClick={() => onTabClick(1)}>
                    친구 요청 목록
            </button>
        </div>
    );
}

export default Tabs;