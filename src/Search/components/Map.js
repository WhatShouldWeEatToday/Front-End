import React, { useEffect, useState } from "react";
import "../css/Map.css";
const {Tmapv2} = window;
function Map({restaurant, restLen}) {

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