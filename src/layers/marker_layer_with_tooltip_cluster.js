import React from "react";
import { LayersControl, Marker, Tooltip, useMap } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { defaultIcon } from "../icons/defaultIcon";

const MarkerLayerWithTooltipCluster = ({ data }) => {
  const leafletMap = useMap();
  const layer = data.features.map((feature) => { //iteration to the list in the feature value data.features
    const { coordinates } = feature.geometry;  //need to be have the index based on the exact key (coordinates)
    const { name } = feature.properties;

    return (

      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={defaultIcon}
        eventHandlers={{
          click: (e) => leafletMap.panTo(e.latlng)
        }}
      >
        <Tooltip>
          <h3>Mt {name}</h3>
        </Tooltip>
      </Marker>


    );
  });
  return (<LayersControl.Overlay
    checked
    name="CITIES CLUSTER"
  >
    <MarkerClusterGroup zoomToBoundsOnClick ={false} >{layer}</MarkerClusterGroup>
  </LayersControl.Overlay>);

};

export default MarkerLayerWithTooltipCluster;