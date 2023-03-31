import React from "react";
import { Control, DomUtil } from 'leaflet';
import { createRoot } from 'react-dom/client';

import { createControlComponent } from '@react-leaflet/core'

import MinimapControl from "../Map/MiniMap";

const node = DomUtil.create("div");
const root = createRoot(node);

Control.MinimapControlWrapper = Control.extend({
    options: {
        position: "topright"
    }, 
    onAdd: function(map) {
        
        root.render(<MinimapControl />);
        return node;
        },
    onRemove: function (map) {
        root.unmount();
    }
});


export const MinimapControlWrapper = createControlComponent(
    (props) => new Control.MinimapControlWrapper(props)
);