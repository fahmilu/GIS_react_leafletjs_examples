import { LayersControl, Circle } from "react-leaflet";

export const RadiusFilter = ({ radiusFilter, setRadiusFilterP }) => {
    if (radiusFilter) {
        const { coordinates } = radiusFilter.featureP.geometry;
        const layer = (
            <Circle
                center={[coordinates[1], coordinates[0]]}
                radius={radiusFilter.radius * 1000}
                eventHandlers={{
                    dblclick: (e) => {
                        e.originalEvent.view.L.DomEvent.stopPropagation(e); //this for disable zoom effect when double click the circle
                        setRadiusFilterP(null); //this is to make circle dissappear if dbl click in the circle
                    }
                }}
                color={"gray"}
                weight={1}
                fillOpacity={0.4}
            />
        );

        return (<LayersControl.Overlay
            checked
            name="Radius filter"
        >
            {layer}
        </LayersControl.Overlay>);
    } else {
        return null;
    }
};