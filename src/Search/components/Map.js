import React, { useEffect, useState } from "react";
import "../css/Map.css";

const {Tmapv2} = window;

function Map({restaurant, restLen}) {

    const [mapLoaded, setMapLoaded] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        initMap();
    }, []);

    useEffect(() => {
        if(mapLoaded && restaurant && restLen > 0) {
            addMarkers();
            findCenter();
            setDataLoaded(true);
        }
    }, [restaurant]);

    //지도 생성
    var map;  

    //마커들 저장할 배열
    // var markers = [];

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
        restaurant.forEach(rest => {
            var marker = new Tmapv2.Marker({
                position: new Tmapv2.LatLng(rest.latitude, rest.longitude),
                label: rest.name
            });
            marker.setMap(mapLoaded);
        })
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