import React from "react";
import ReactDOM from "react-dom";


const MyMap2 = () => {
    return (
        <div>
            <script src="https://api-maps.yandex.ru/3.0/?lang=ru_RU&amp;apikey=3245f75b-f1e7-4de6-bcc8-a3d7cb991f4c&apm;lang=ru_RU" type="text/javascript"/>
            <YMap location="center, zoom" mode="vector">
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                <YMapMarker coordinates={[34, 57]} draggable={true}>
                    <div className="marker marker_pill">I'm marker!</div>
                </YMapMarker>
            </YMap>
        </div>
    );
}

export default MyMap2;
