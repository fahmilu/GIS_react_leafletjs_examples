import { useState, useEffect } from "react";
import { MapContainer, ZoomControl, TileLayer, WMSTileLayer, GeoJSON, LayersControl } from "react-leaflet";
import MarkerLayer from "../layers/marker_layer";
import MarkerLayerWithTooltip from "../layers/marker_layer_with_tooltip";
import MarkerLayerWithTooltipCluster from "../layers/marker_layer_with_tooltip_cluster";
import MarkerLayerWithTooltipReproject from "../layers/marker_layer_with_tooltip_reproject";

import { cities } from "../data/cities";
import { mountains } from "../data/highest_points";
import { continents } from "../data/continents";
import { irishCities2157 } from "../data/irish_cities_2157";

import { RadiusFilter } from "../layers/radius_filter";
import ContinentsPolygon from "../layers/continents_polygon_layer";

import MinimapControl from "./MiniMap";

import { FitBoundsToDataControl } from "../controls/fit_data_to_bounds";
import { GetXYfromMouse } from "../controls/get_xy_mouse";
import { ShowActiveFiltersControl } from "../controls/show_active_filters";


const Map = () => {
  const [geoFilter, setGeoFilter] = useState(null);
  const getGeoFilter = () => geoFilter;


  const [radiusFilter, setRadiusFilter0] = useState(null);
  const getRadiusFilter = () => radiusFilter;

  const [asyncBoundary, setAsyncBoundary] = useState({ features: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places.geojson');
      const boundaryUS = await response.json();
      setAsyncBoundary(boundaryUS);
    };
    fetchData().catch(console.error); //catch error info
  }, []);

  console.log(asyncBoundary);

  const position = [0, 0];
  const scrollWheelZoom = true;

  return (
    <MapContainer center={position} zoom={1} scrollWheelZoom={scrollWheelZoom} zoomControl={false}>
      {/*for LAYER LIST*/}
      <LayersControl
        position="topleft"
      >
        <LayersControl.BaseLayer
          checked
          name="OSM Street">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer

          name="OSM Topo">
          <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>
        <MarkerLayer
          data={cities}
          setRadiusFilter1={setRadiusFilter0}
          getRadiusFilterP={getRadiusFilter}
          getGeoFilter={getGeoFilter}
        />
        <MarkerLayerWithTooltip data={mountains} />
        <RadiusFilter
          radiusFilter={radiusFilter}
          setRadiusFilterP={setRadiusFilter0} />
        <ContinentsPolygon
          data={continents}
          setGeoFilterP={setGeoFilter}
          getGeoFilter={getGeoFilter}

        />

        <LayersControl.Overlay
          name="GEOSERVER DATA EXAMPLE"
          checked={true}
        >
          <WMSTileLayer

            url='http://192.168.56.3:8080/geoserver/wms'
            layers='nurc:Img_Sample'
            format="image/png"
            transparent={true}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay
          name="asycn geojson example"
          checked
        >
          <GeoJSON //DOES NOT WORK FOR GEOJSON AT THE MOMENT
            data={asyncBoundary}
          >
          </GeoJSON>
        </LayersControl.Overlay>

        <MarkerLayer  //RETRY IN THE MARKER EXAMPLE ASYCN PROCESS WORK, SEEM IT NEED A RAW GEOJSON AND BREAKDOWN THE FEATURE
          data={asyncBoundary}
          setRadiusFilter1={setRadiusFilter0}
          getRadiusFilterP={getRadiusFilter}
          getGeoFilter={getGeoFilter}
        />

        <MarkerLayerWithTooltipCluster
          data={cities}
        />



        <MarkerLayerWithTooltipReproject data={irishCities2157} />


      </LayersControl> {/**/}

      {/*THIS IS FOR CONTROL FUNCTIONALITY*/}
      <div className="leaflet-control-container">
        <MinimapControl position={"topright"} />
        <ZoomControl position="bottomright" />
        <FitBoundsToDataControl />
      </div>
      <GetXYfromMouse />
      <ShowActiveFiltersControl
        getFilters={() => ({ geoFilter, radiusFilter })}
      >
      </ShowActiveFiltersControl>


    </MapContainer>


  )
}

export default Map;