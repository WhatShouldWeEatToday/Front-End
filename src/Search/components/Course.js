import React, {useEffect, useState} from "react";
import Header from "../../etc/components/Header"
import "../css/Course.css";

const { Tmapv2  } = window;

function Course(){
	const [courseData, setCourseData] = useState(null);
	// const [polyline, setPolyline] = useState();
	const [totalDistance, setTotalDistance] = useState();
	const [totalTime, setTotalTime] = useState();
	const [mapLoaded, setMapLoaded] = useState(null);
	const [linestringData, setLineStringData] = useState();
	const [coordinates, setCoordinates] = useState([]);
	const [steps, setSteps] = useState();

    useEffect(() => {
        const storedCourseData = localStorage.getItem('courseData');
        if (storedCourseData) {
            const parsedData = JSON.parse(storedCourseData);
            setCourseData(parsedData);
        }
    }, []);

	// 도보는 legs[0].steps 각 배열마다 linestring이 존재
	//버스는 legs[1].
	//lineString을 분해해서 경도 위도로 배열 새로 생성
    useEffect(() => {
        if (courseData) {
			console.log("데이터: ", courseData.course.plan.itineraries[0].legs);
			console.log("bus: ", courseData.course.plan.itineraries[0].legs[1].passShape);
			console.log(" 스텝: ", courseData.course.plan.itineraries[0].legs[0].steps);
			setSteps(courseData.course.plan.itineraries[0].legs[1].steps);
			setTotalDistance(parseFloat((courseData.course.plan.itineraries[0].totalDistance / 1000).toFixed(1)));
			setTotalTime(Math.round(courseData.course.plan.itineraries[0].totalTime / 60));
            initTmap();
        }
    }, [courseData, steps]);


    var map;
	var marker_s, marker_e, marker_p;
	var drawInfoArr = [];
	var resultdrawArr = [];

	function initTmap() {
		// 1. 지도 띄우기
		const mapDiv = document.getElementById('map_div');

		if(!mapDiv.firstChild){
			map = new Tmapv2.Map("map_div", {
				center : new Tmapv2.LatLng(courseData.course.requestParameters.startY, courseData.course.requestParameters.startX),
				width : "50%",
				height : "400px",
				zoom : 17,
				zoomControl : true,
				scrollwheel : true
			});
		}
		
		// 2. 시작, 도착 심볼찍기
		marker_s = new Tmapv2.Marker(
				{
					position : new Tmapv2.LatLng(courseData.course.requestParameters.startY, courseData.course.requestParameters.startX),
					icon : "https://tmapapi.tmapmobility.com/upload/tmap/marker/pin_r_b_s.png",
					iconSize : new Tmapv2.Size(24, 38),
					map : map
				});

		marker_e = new Tmapv2.Marker(
				{
					position : new Tmapv2.LatLng(courseData.course.requestParameters.endY, courseData.course.requestParameters.endX),
					icon : "https://tmapapi.tmapmobility.com/upload/tmap/marker/pin_b_m_e.png",
					iconSize : new Tmapv2.Size(24, 38),
					map : map
				});



		//3. 기존 그려진 라인 & 마커가 있다면 초기화
		if (resultdrawArr.length > 0) {
			for ( var i in resultdrawArr) {
				resultdrawArr[i].setMap(null);
			}
			resultdrawArr = [];
		}
		

		//4. 경로그리기
		resultdrawArr.forEach(line => line.setMap(null));
		resultdrawArr = [];
		drawInfoArr = [];

		courseData.course.plan.itineraries[0].legs.forEach(leg => {
			if(leg.mode === "WALK"){
				drawPath(leg.steps, "#4169E1");
			} else if(leg.mode === "BUS"){
				drawPath([leg.passShape], leg.passShape.routeColor);
			}
		});

		function drawPath(steps, color){
			const drawInfoArr = [];
			steps.forEach(step => {
				const lineString = step.linestring.split(' ');
				lineString.forEach(coord => {
					const [lon, lat] = coord.split(',');
					drawInfoArr.push(new Tmapv2.LatLng(parseFloat(lat), parseFloat(lon)));
				});
			});

			const polyline = new Tmapv2.Polyline({
				path: drawInfoArr,
				strokeColor: color,
				strokeWeight: 6,
				map: map
			});

			resultdrawArr.push(polyline);
		}

	}
	
	// function drawLine() {
	// 	(courseData.course.plan.itineraries[0].legs[0].steps).forEach(step => {
	// 		const lineString = step.linestring.split(' ');
	// 		lineString.forEach(coordinate => {
	// 		  const [lon, lat] = coordinate.split(',');
	// 		  drawInfoArr.push(new window.Tmapv2.LatLng(parseFloat(lat), parseFloat(lon)));
	// 		});
	// 	  });

	// 	new Tmapv2.Polyline({
	// 		path : drawInfoArr,
	// 		strokeColor : "#DD0000",
	// 		strokeWeight : 6,
	// 		map : map
	// 	});
	// }

	// function drawBusline() {
	// 	const lineString = (courseData.course.plan.itineraries[0].legs[1].passShape).linestring.split(' ').map(coord => {
			
	// 		const [lon, lat] = coord.split(',');
	// 		return new Tmapv2.LatLng(parseFloat(lat), parseFloat(lon));
	// 	});

	// 	new Tmapv2.Polyline({
	// 		path : lineString,
	// 		strokeColor : courseData.course.plan.itineraries[0].legs[1].passShape.routeColor,
	// 		strokeWeight : 6,
	// 		map : map
	// 	});
	// }


    return(
        <div className="CourseSession">
            <Header></Header>
			<div className="Course">
				<div className="course-menu">떡볶이</div>
				<div id="map_div"></div>
				<div className="totalTime-result">총 거리: {totalDistance}km, 총 시간: {totalTime}분</div>
			</div>
        </div>
    )

    
}



export default Course;