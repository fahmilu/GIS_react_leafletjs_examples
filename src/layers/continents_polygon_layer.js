import { LayersControl, GeoJSON } from "react-leaflet"; //if we import Polygon instead GeoJSON, then we need to swap the latitude and longitude, since in GeoJSON and native leaflet is the other way around, but with GeoJSON is supported without change the position, check on the marker_layer.js and notice the {coordinates}

const ContinentsPolygon = ({ data, setGeoFilterP, getGeoFilter }) => {
    const geoFilter = getGeoFilter();
    const layer =
        <GeoJSON
            key="geo-json-layer"
            data={data}
            eventHandlers={{
                click: (e) =>
                    setGeoFilterP((prevState) => {
                        const same = prevState === e.propagatedFrom.feature; //why is this feature not featureP? this is part of GeoJSON Class that the property defined already, look at the propagatedFrom object and click on that in vscode and search feature
                        return same ? null : e.propagatedFrom.feature;
                    })
            }}
            style={
                (feature) => {
                    return {
                        color: geoFilter === feature ? "red" : "blue",
                        weight: 0.5,
                        fillOpacity: 0.4,
                    }
                }
            }
        >

        </GeoJSON>
    return (<LayersControl.Overlay
        checked
        name="Continents"
    >
        {layer}
    </LayersControl.Overlay>);
}

export default ContinentsPolygon;