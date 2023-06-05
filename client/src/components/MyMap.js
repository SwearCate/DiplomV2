import {Map, YMaps, ZoomControl, SearchControl, Placemark, GeolocationControl, withYMaps} from "@pbe/react-yandex-maps";
import {useRef, useState} from "react";
import React from 'react';
import {render} from "react-dom";




const MyMap = () => {


    const map = useRef(null);

    const mapState = {
        center: [55.779625, 37.5012],
        zoom: 9
    };

    const handleClick = (e) => {
        const placemarkCoords = e.get("coords");
        if (map.current) {
            map.current.setCenter(placemarkCoords);
        }
    };

    return (
    <YMaps

            query={{
                    ns: "use-load-option",
                    apikey: "3245f75b-f1e7-4de6-bcc8-a3d7cb991f4c",


            }}
        >
            <div className="map-container">
                <Map state={mapState} instanceRef={map}
                    defaultState={{
                        zoom: 9,
                        controls: [],
                    }}
                    options={{suppressMapOpenBlock: true}}
                    width='100%'
                    height='98vh'
                >
                    <ZoomControl />
                    <GeolocationControl
                        options={
                        {float: 'right',}} />
                    <SearchControl
                    options={{float: "top"}}
                    m
                    >
                    </SearchControl>
                    <Placemark
                        onClick={handleClick}
                        geometry={[55.76, 37.64]}
                        options={{
                            preset: "islands#violetCircleDotIcon",
                            balloonCloseButton: true,
                        }}
                        properties={{
                            iconContent: "Начало",
                            balloonContent: 'dd'
                        }}

                    />

                </Map>
            </div>
        </YMaps>
    );
}


export default MyMap;
