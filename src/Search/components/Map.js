import React, { useEffect, useState } from "react";
import "../css/Map.css";
const {Tmapv2} = window;

function Map({ restaurant, restLen, setLat, setLon }) {

    const [mapLoaded, setMapLoaded] = useState(null);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        initMap();
    }, []);

    useEffect(() => {
        if(mapLoaded && restaurant && restLen > 0) {
            clearMarkers(); // 새로운 마커 추가 전에 이전 마커 제거
            addMarkers();
            findCenter();
        }
    }, [restaurant]);

    //지도 생성
    var map;  
    var InfoWindow;
    var infoMark;

    function initMap(){
        const mapDiv = document.getElementById("map_div");
        if(!mapDiv.firstChild){
            map = new Tmapv2.Map("map_div", {
                center: new Tmapv2.LatLng(36.1456, 128.3924),
                width: "100%",
                height: "100%",
                zoom: 15
            }); 
            setMapLoaded(map);
        }

        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다      
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function(position) {
					var lat = position.coords.latitude;
					var lon = position.coords.longitude;

                    setLat(lat);
                    setLon(lon);
					//팝업 생성
					var content = "<div style=' position: relative; border-bottom: 1px solid #dcdcdc; line-height: 18px; padding: 0 35px 2px 0;'>"
							+ "<div style='font-size: 12px; line-height: 15px;'>"
							+ "<span style='display: inline-block; width: 14px; height: 14px; background-image: url(/resources/images/common/icon_blet.png); vertical-align: middle; margin-right: 5px;'></span>현재위치"
							+ "</div>" + "</div>";

					infoMark = new Tmapv2.Marker({
						position : new Tmapv2.LatLng(lat,lon),
						map : map
					});

					InfoWindow = new Tmapv2.InfoWindow({
						position : new Tmapv2.LatLng(lat,lon),
						content : content,
						type : 2,
						map : map,
                        center: new Tmapv2.LatLng(lat,lon)
					});
					map.setCenter(new Tmapv2.LatLng(lat,lon));
					map.setZoom(15);
				});
		}
    }

    //지도에 마커 생성
    function addMarkers() {
        const newMarkers = restaurant.map(rest => {
            var marker = new Tmapv2.Marker({
                position: new Tmapv2.LatLng(rest.latitude, rest.longitude),
                label: rest.name
            });
            marker.setMap(mapLoaded);
            return marker;
        });
        setMarkers(newMarkers);
    } 

    // 이전 마커 제거
    function clearMarkers() {
        markers.forEach(marker => {
            marker.setMap(null);
        });
        setMarkers([]);
    }

    function findCenter() {
        if(!mapLoaded) return;

        const bounds = new Tmapv2.LatLngBounds();
        restaurant.forEach(rest => {
            bounds.extend(new Tmapv2.LatLng(rest.latitude, rest.longitude));
        });
        mapLoaded.fitBounds(bounds);
    }


    return (
        <div id="map_div"></div>
    );
}

export default Map;