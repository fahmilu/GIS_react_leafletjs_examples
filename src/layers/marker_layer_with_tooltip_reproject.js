import React from "react";
import { LayerGroup, LayersControl, Marker, Tooltip, useMap } from "react-leaflet";
import { defaultIcon } from "../icons/defaultIcon";
import proj4 from "proj4";

const ITM = "EPSG:2157";
const WGS = "EPSG:4326";

proj4.defs(ITM,"+proj=tmerc +lat_0=53.5 +lon_0=-8 +k=0.99982 +x_0=600000 +y_0=750000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
proj4.defs(WGS,"+proj=longlat +datum=WGS84 +no_defs +type=crs");


const MarkerLayerWithTooltipReproject = ({ data }) => {
  const leafletMap = useMap();
  const layer = data.features.map((feature) => { //iteration to the list in the feature value data.features
    const { coordinates } = feature.geometry;  //need to be have the index based on the exact key (coordinates)
    const { name } = feature.properties;

    const reprojectedCoordinates = proj4(ITM, WGS, coordinates);

    return (

      <Marker
        key={String(reprojectedCoordinates)}
        position={[reprojectedCoordinates[1], reprojectedCoordinates[0]]}
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
    name="IRISH CITIES RE_PROJECTED"
    
  >
    <LayerGroup >{layer}</LayerGroup>
  </LayersControl.Overlay>);

};

export default MarkerLayerWithTooltipReproject;