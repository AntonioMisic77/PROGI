import L, { LatLng,  } from 'leaflet';
import * as React from 'react';
import { Marker, useMapEvents, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@mui/material';

interface LocationMarkerProps {
   position: LatLng | undefined,
   onClick: (point: LatLng) => void;
   confirmAction: (event: any) => void;
}

const LocationMarker = (props: LocationMarkerProps) => {

   const markerIcon = new L.Icon({
      iconUrl: '/marker-icon.png',
      iconRetinaUrl: '/marker-icon.png',
      iconAnchor: [12.5, 40],
      popupAnchor:  [0, -40],
      iconSize: [25,40],    
  });

   let map = useMapEvents({
      click(event){
         let latLng  = map.mouseEventToLatLng(event.originalEvent);
         props.onClick(latLng);
      }
   });

   return ( 
      props.position !== undefined ? 
      <Marker position={props.position} icon={markerIcon}>
         <Popup>
            <Button onClick={props.confirmAction} variant="outlined">
               Potvrdi točku
            </Button>
         </Popup>
      </Marker> : <div/>
   );
}
 
export default LocationMarker;