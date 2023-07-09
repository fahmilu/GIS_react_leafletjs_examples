import { useState } from "react";
import { LayerGroup, LayersControl, Marker, Popup } from "react-leaflet";
import { defaultIcon } from "../icons/defaultIcon";
import { Button, Card, InputNumber, Space } from "antd";
import { FilterOutlined } from '@ant-design/icons';
import L from "leaflet";

import booleanPointInPolygon from "@turf/boolean-point-in-polygon";


const DEFAULT_RADIUS = 3000;

const PopupStatistics = ({ featureP, setRadiusFilter0 }) => {
    const [radius, setRadius] = useState(DEFAULT_RADIUS);
    const { name, adm0name, pop_max } = featureP.properties;

    return (
        <>
            <Card type="inner" title="Name" style={{ marginTop: 16 }}>
                <b>{`${name}, ${adm0name}`}</b>
            </Card>
            <Card type="inner" title="Population" style={{ marginTop: 16 }}>
                <b>{`${pop_max}`}</b>
            </Card>
            <Card type="inner" title="Radius Filter" style={{ marginTop: 16 }}>
                <Space>
                    <InputNumber
                        defaultValue={DEFAULT_RADIUS}
                        min={0}
                        onChange={(e) =>
                            setRadius(e)}
                    >
                    </InputNumber>
                    <Button
                        type="primary"
                        shape="round"
                        icon={<FilterOutlined />}
                        onClick={() => setRadiusFilter0((prevState) => {
                            let newFilter;
                            if (prevState) {
                                if (radius === 0) {
                                    newFilter = prevState
                                } else {
                                    const sameFeature = prevState.featureP === featureP;
                                    const sameRadius = prevState.radius === radius;
                                    if (!sameFeature || !sameRadius) {
                                        newFilter = { featureP, radius }
                                    }
                                }
                            } else if (radius !== 0) {
                                newFilter = { featureP, radius }
                            }
                            return newFilter;
                        })

                        }
                    >
                        Filter by km
                    </Button>
                </Space>

            </Card>
        </>
    );
};

const MarkerLayer = ({ data, setRadiusFilter1, getRadiusFilterP, getGeoFilter }) => {
    const radiusFilter = getRadiusFilterP();
    const geoFilter = getGeoFilter();
    let centerPoint;
    if (radiusFilter) {
        const { coordinates } = radiusFilter.featureP.geometry;
        centerPoint = L.latLng(coordinates[1], coordinates[0]);
    }

    const layer = data.features
        .filter((currentFeature) => {
            let filterByRadius;
            let filterByGeo;

            if (centerPoint) {
                const { coordinates } = currentFeature.geometry;
                const currentPoint = L.latLng(coordinates[1], coordinates[0]);
                filterByRadius = centerPoint.distanceTo(currentPoint) / 1000 < radiusFilter.radius
                console.log(centerPoint.distanceTo(currentPoint) / 1000 < radiusFilter.radius);
            }
            if (geoFilter) {
                filterByGeo = booleanPointInPolygon(currentFeature, geoFilter) //this one from thirdparty library for this clip/intersect
            }

            let doFilter = true;
            if (geoFilter && radiusFilter) {
                doFilter = filterByGeo && filterByRadius;
            } else if (geoFilter && !radiusFilter) {
                doFilter = filterByGeo;
            } else if (radiusFilter && !geoFilter) {
                doFilter = filterByRadius;
            }
            return doFilter;
        }).map((feature0) => {
            const { coordinates } = feature0.geometry;  //need to be have the index based on the exact key (coordinates)

            return (
                <Marker key={String(coordinates)}
                    position={[coordinates[1], coordinates[0]]}
                    icon={defaultIcon}
                    doFitToBounds={true} //only work if the marker layer checked is true
                    >
                    
                    <Popup>
                        <PopupStatistics featureP={feature0} setRadiusFilter0={setRadiusFilter1} />
                    </Popup>
                </Marker>
            );
        });
    return (<LayersControl.Overlay
             checked = {false}
             name="World cities"   
                >
        <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>);
};

export default MarkerLayer;