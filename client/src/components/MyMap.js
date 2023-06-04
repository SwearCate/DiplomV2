import {Map, YMaps, ZoomControl, SearchControl, Placemark, FullscreenControl} from "@pbe/react-yandex-maps";
import {useState} from "react";

const MyMap = () => {
    const [zoom, setZoom] = useState(9);
    return (
        <YMaps>
            <div className="map-container">
                <Map
                    defaultState={{
                        center: [55.751574, 37.573856],
                        zoom: 9,
                        controls: [],
                    }}
                    width='100%'
                    height='98vh'
                >
                    <ZoomControl />
                </Map>
                <div>
                </div>
            </div>
        </YMaps>
    );
}

export default MyMap;
