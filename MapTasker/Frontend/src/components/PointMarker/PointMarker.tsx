import { LatLng,  } from 'leaflet';
import * as React from 'react';
import { Marker, useMapEvents, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


interface PointMarkerProps {
   position: LatLng,
}
 
const PointMarker = (props: PointMarkerProps) => {

   let map = useMapEvents({
      click(event){
         console.log(map.mouseEventToLatLng(event.originalEvent));
      }
   });

   return ( 
      <Marker position={props.position}>
         <Popup>točka</Popup>
      </Marker>
   );
}
 
export default PointMarker;