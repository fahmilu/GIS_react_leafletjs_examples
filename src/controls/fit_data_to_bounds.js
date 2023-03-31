import { createRoot } from 'react-dom/client';
import { Button } from 'antd';
import { BorderInnerOutlined, BorderOuterOutlined } from '@ant-design/icons';

import { createControlComponent } from '@react-leaflet/core'
import { Control, DomUtil } from 'leaflet';

const node = DomUtil.create("div");
const centerIndo = [-3, 119] //for static setView
const zoomView = 5;

const root = createRoot(node)

Control.FitBoundsToDataControl = Control.extend({
    options: {
        position: "bottomright"
    },
    onAdd: function (map) {
        const doFitDataToBounds = () => {
            const latLngs = [];
            map.eachLayer((layer) => {
                const latLng = layer.options.doFitToBounds && layer.getLatLng();
                if (latLng) {
                    latLngs.push(latLng);
                }
            })
            if (latLngs.length > 0) {
                map.fitBounds(latLngs);
            }
        }

        const commonProps = {
            className: "leaflet-control-button",
            style: {
                style: { width: '33px', height: '33px' }
            }
        }

        //this is the line for root
        root.render(
            <div className='fit-bounds-control-container'>
                <Button
                    {...commonProps}
                    title="Fit bounds to data"
                    icon={<BorderInnerOutlined />}
                    onClick={() => {
        
                        //map.setView(centerIndo, zoomView); //this is only if we want to make into static fit to bound
                        doFitDataToBounds()
                    }
                    }
                ></Button>
                <Button
                    {...commonProps}
                    title="Fit bounds to Indonesia"
                    icon={<BorderOuterOutlined />}
                    onClick={() => {
        
                        map.setView(centerIndo, zoomView); //this is only if we want to make into static fit to bound
        
                        console.log("map", map);
                    }
                    }
                ></Button>
            </div>
        );

        return node;
    },
    onRemove: function (map) {
        root.unmount();
    }
})

export const FitBoundsToDataControl = createControlComponent(
    (props) => new Control.FitBoundsToDataControl(props)
);