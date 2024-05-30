import axios from "axios";
import "../css/RankingSession.css";
import React, { useState, useEffect } from "react";

const CATEGORY = [
  { id: 1, value: "카테고리별" },
  { id: 2, value: "음식별" },
];

const SelectBox = ({ options, defaultValue, onChange }) => {
  return (
    <select className="rank-category" onChange={onChange}>
      {options.map((option) => (
        <option
          className="rank-category-option"
          key={option.id}
          value={option.id}
          defaultValue={defaultValue === option.id}
        >
          {option.value}
        </option>
      ))}
    </select>
  );
};

function RankingSession() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY[0].id);
  const [rankingFoodTypeList, setRankingFoodTypeList] = useState([]); // 카테고리별 랭킹 리스트
  const [rankingFoodList, setRankingFoodList] = useState([]); // 음식별 랭킹 리스트

  useEffect(() => {
    if (selectedCategory === 1) {
      getWeeklyRankByCategory();
    } else {
      getWeeklyRankByFood();
    }
  }, [selectedCategory]);

  // 주간 랭킹 - 카테고리별 (ex. 한식, 일식, 양식...)
  const getWeeklyRankByCategory = () => {
    axios
      .get(`http://localhost:8080/rank/foodType`)
      .then((res) => {
        // console.log(res.data);
        setRankingFoodTypeList(res.data.topFoodTypes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 주간 랭킹 - 음식별 (ex. 삼겹살, 돈까스, 초밥...)
  const getWeeklyRankByFood = async () => {
    axios
      .get(`http://localhost:8080/rank/food`)
      .then((res) => {
        // console.log(res.data);
        setRankingFoodList(res.data.topFoods);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // select 태그 변화 감지
  const handleCategoryChange = (e) => {
    setSelectedCategory(parseInt(e.target.value));
  };

  return (
    <div className="RankingSession">
      <div className="RankingArea">
        <div className="RankingTitle">
          <div className="rank-title">주간 순위</div>
          <SelectBox
            options={CATEGORY}
            defaultValue={CATEGORY[0].id}
            onChange={handleCategoryChange}
          ></SelectBox>
        </div>
        <div className="Ranking">
          {selectedCategory === 1
            ? rankingFoodTypeList &&
              rankingFoodTypeList.map((rankingList, index) => (
                <div className="Ranks" key={rankingList.id}>
                  {index < 3 ? (
                    <img
                      src={
                        process.env.PUBLIC_URL + `/img/medal_${index + 1}.png`
                      }
                      alt="ranks-img"
                      className="ranks-img"
                    />
                  ) : (
                    <span className="ranks-number">{`${index + 1}위`}</span>
                  )}
                  <div className="ranks-name">{rankingList.foodTypeName}</div>
                </div>
              ))
            : rankingFoodList &&
              rankingFoodList.map((rankingList, index) => (
                <div className="Ranks" key={rankingList.id}>
                  {index < 3 ? (
                    <img
                      src={
                        process.env.PUBLIC_URL + `/img/medal_${index + 1}.png`
                      }
                      alt="ranks-img"
                      className="ranks-img"
                    />
                  ) : (
                    <span className="ranks-number">{`${index + 1}위`}</span>
                  )}
                  <div className="ranks-name">{rankingList.foodName}</div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default RankingSession;
