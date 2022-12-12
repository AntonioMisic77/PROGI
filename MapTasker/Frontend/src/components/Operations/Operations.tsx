import * as React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Operations.css'

interface OperationsProps {
   
}
 
const Operations = () => {
   return (
      <MapContainer center={[45.33, 14.445]} zoom={13} scrollWheelZoom={true}>
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
      </MapContainer>
   );
}
 
export default Operations;