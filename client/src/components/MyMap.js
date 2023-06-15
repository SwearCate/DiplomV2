import {
    Map,
    YMaps,
    ZoomControl,
    SearchControl,
    Placemark,
    GeolocationControl,
    withYMaps,
    Polyline,
    GeoObject,
} from "@pbe/react-yandex-maps";
import {useEffect, useRef, useState} from "react";
import React from 'react';
import {render} from "react-dom";
import TaskList from "./TaskList";




const MyMap = (props) => {
    const ref = useRef();
    const ref2 = useRef();
    const ymaps = React.useRef(null);
    const polyline = React.createRef(null);

    const placemarkRef = React.useRef(null);


    const map = useRef(null);

    const [newCoords, setNewCoords] = useState([
        59.936075,
        30.30251
    ])
    const [value, setValue] = useState("");
    const [address, setAddress] = useState("");
    const [options, setOptions] = useState([]);

    const mapState = {
        center: [59.936075, 30.30251],
        zoom: 9
    };

    const handleClick = (e) => {
        const placemarkCoords = e.get("coords");
        if (map.current) {
            map.current.setCenter(placemarkCoords);
        }
    };
    const createPlacemark = (coords) => {
        return new ymaps.current.Placemark(
            coords,
            {
                iconCaption: "loading.."
            },
            {
                preset: "islands#violetDotIconWithCaption",
                draggable: true
            }
        );
    };
    const getAddress = (coords) => {
        placemarkRef.current.properties.set("iconCaption", "loading..");
        ymaps.current.geocode(coords).then((res) => {
            const firstGeoObject = res.geoObjects.get(0);

            const newAddress = [
                firstGeoObject.getLocalities().length
                    ? firstGeoObject.getLocalities()
                    : firstGeoObject.getAdministrativeAreas(),
                firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
            ]
                .filter(Boolean)
                .join(", ");

            setAddress(newAddress);

            placemarkRef.current.properties.set({
                iconCaption: newAddress,
                balloonContent: firstGeoObject.getAddressLine()

            });
        });
    };

    const onMapClick = (e) => {
        const coords = e.get("coords");

        if (placemarkRef.current) {
            placemarkRef.current.geometry.setCoordinates(coords);
        } else {
            placemarkRef.current = createPlacemark(coords);
            map.current.geoObjects.add(placemarkRef.current);
            placemarkRef.current.events.add("dragend", function () {
                getAddress(placemarkRef.current.geometry.getCoordinates());
            });
        }
        getAddress(coords);
        console.log(coords)
    };

    useEffect(() => {
        (async () => {
            try {
                if (value) {
                    const res = await fetch(
                        `https://geocode-maps.yandex.ru/1.x/?apikey=3245f75b-f1e7-4de6-bcc8-a3d7cb991f4c&format=json&geocode=${value}`
                    );
                    const data = await res.json();
                    console.log(data)
                    const collection = data.response.GeoObjectCollection.featureMember.map(
                        (item) => item.GeoObject

                    );
                    setOptions(() => collection);
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, [value]);

    return (
    <YMaps

            query={{
                    ns: "use-load-option",
                    apikey: "3245f75b-f1e7-4de6-bcc8-a3d7cb991f4c",

            }}
        >
            <div className="map-container">
                <Map state={mapState}
                     modules={["Placemark", "geocode", "geoObject.addon.balloon"]}
                     instanceRef={map}
                    defaultState={{
                        zoom: 9,
                        controls: [],
                    }}
                     onLoad={(ympasInstance) => (ymaps.current = ympasInstance)}
                     onClick={onMapClick}
                    options={{suppressMapOpenBlock: true,
                        copyrightLogoVisible: false,
                        copyrightProvidersVisible: false,
                        copyrightUaVisible: false
                }}
                    width='100%'
                    height='98vh'

                >
                    <ZoomControl />
                    <GeolocationControl
                        options={
                        {float: 'right',}} />
                    <SearchControl
                    options={{float: "top",
                        provider: "yandex#search",
                        noSuggestPanel: true
                    }}
                    >
                    </SearchControl>
                    <Placemark
                        onClick={handleClick}
                        geometry={[59.936075, 30.30251]}
                        options={{
                            preset: "islands#violetCircleDotIcon",
                            balloonCloseButton: true,
                            draggable: true
                        }}
                        properties={{
                            iconContent: "Хай",
                            balloonContent: 'dd'
                        }}


                    />
                </Map>
            </div>
        </YMaps>
    );
}


export default MyMap;
