import React from "react";
import { LayersControl, LayerGroup, Marker, Tooltip, useMap } from "react-leaflet";
import { mountainIcon } from "../icons/mountainIcon";

const MarkerLayerWithTooltip = ({ data }) => {
  const leafletMap = useMap();
  const layer = data.features.map((feature) => { //iteration to the list in the feature value data.features
    const { coordinates } = feature.geometry;  //need to be have the index based on the exact key (coordinates)
    const { name, elevation, continent } = feature.properties;

    return (

      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={mountainIcon}
        eventHandlers = {{
          click: (e) => leafletMap.panTo(e.latlng)
        }}
      >
        <Tooltip>
          <h3>Mt {name}</h3>
          Continent: <b>{continent}</b> <br />
          Elevation: <b>{elevation} m</b>
        </Tooltip>
      </Marker>


    );
  });
  return (<LayersControl.Overlay
    checked
    name="Highest point"   
       >
<LayerGroup>{layer}</LayerGroup>
</LayersControl.Overlay>);

};

export default MarkerLayerWithTooltip;