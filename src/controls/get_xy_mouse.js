import { createControlComponent } from '@react-leaflet/core';
import { DomUtil } from 'leaflet';
import { Control } from 'leaflet';

Control.GetXYfromMouse = Control.extend({
  options: {
    position: 'bottomleft',
  },

  onAdd(map) {
    const container = DomUtil.create('div', 'leaflet-control-attribution' //'leaflet-bar leaflet-control leaflet-control-custom'
    );
    //container.style.backgroundColor = 'white'
    //container.style.padding = '5px 10px'

    // Create the mousemove event listener
    const mouseMoveHandler = (e) => {
      const { lat, lng } = e.latlng
      container.innerText = `Mouse location: ${Math.round(lat * 100000)/100000}, ${Math.round(lng *100000)/100000}`
    }

    map.on('mousemove', mouseMoveHandler)

    return container
  },

  onRemove(map) {
    map.off('mousemove')
  },
})

export const GetXYfromMouse = createControlComponent((props) => new Control.GetXYfromMouse(props))
