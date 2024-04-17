import React, { useEffect } from "react";
import "../css/Map.css";

const {Tmapv2} = window;

function Map() {
    
    useEffect(() => {
        initMap();
    }, []);

    function initMap(){

        const mapDiv = document.getElementById("map_div");
        if(!mapDiv.firstChild){
            const map = new Tmapv2.Map("map_div", {
                center: new Tmapv2.LatLng(36.1456, 128.3924),
                width: "100%",
                height: "100%",
                zoom: 17
            });
        }
    }

    return (
        <div id="map_div"/>
    );
}

export default Map;