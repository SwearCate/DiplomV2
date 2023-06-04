import {Map, YMaps, ZoomControl, SearchControl, Placemark, GeolocationControl} from "@pbe/react-yandex-maps";
import {useState} from "react";



const MyMap = () => {
    const [zoom, setZoom] = useState(9);

    return (
        <YMaps
            query={{
                    ns: "use-load-option",
                    apikey: "3245f75b-f1e7-4de6-bcc8-a3d7cb991f4c",}}
        >
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
                    <GeolocationControl
                        options={
                        {float: 'right',}} />
                    <SearchControl
                    options={{float: "top"}}
                    >

                    </SearchControl>
                </Map>
            </div>
        </YMaps>
    );
}

export default MyMap;
