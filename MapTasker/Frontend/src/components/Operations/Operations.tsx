import * as React from 'react';
import { Circle, MapContainer, Polygon, Polyline, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Operations.css'
import { useMemo, useState } from 'react';
import { Point, LatLng } from 'leaflet';
import LocationMarker from '../LocationMarker/LocationMarker';
import PointMarker from '../PointMarker/PointMarker';
import { Button } from '@mui/material';

interface OperationsProps {
   
}

const Operations = () => {

   let [polygons, setPolygons] = useState<LatLng[][]>([])
   let [selecting, setSelecting] = useState<boolean>(false);
   let [points, setPoints] = useState<LatLng[]>([]);
   let [point, setPoint] = useState<LatLng | undefined>(undefined);

   let updatePoint = (point: LatLng) => {
      setPoint(point);
      if (selecting) {
         setPoints((oldPoints) => {
            oldPoints[oldPoints.length - 1] = point;
            return oldPoints;
         })
      } else {
         setPoints((oldPoints) => {
            oldPoints.push(point);
            setSelecting(true);
            return oldPoints;
         })
      }
   }

   let confirmPoint = () => {
      setSelecting(false);
      setPoint(undefined);
   }

   let resetPoints = () => {
      setSelecting(false);
      setPoints([]);
      setPoint(undefined);
   }

   let addPolygon = () => {
      if (points.length < 3) alert("Not enough points!")
      else {
         setPolygons(oldPolygons => {
            oldPolygons.push(points);
            return oldPolygons;
         })
         resetPoints();
         alert("Regija stvorena")
      }
   }

   return (
      <div className="operations-container">
         <MapContainer center={[45.33, 14.445]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={point} onClick={updatePoint} />
            {
               points.length === 1 && <Circle center={points[0]} radius={10} key={points[points.length-1].lat}/>
            }
            {
               points.length === 2 && <Polyline positions={points} key={points[points.length-1].lat}/>
            }
            {
               points.length > 2 && <Polygon positions={points} key={points[points.length-1].lat}/>
            }
            {
               polygons.map(polygon => <Polygon positions={polygon} key={polygon[0].lat}/>)
            }
         </MapContainer>
         <div className="actions-container">
            <Button variant="outlined" onClick={confirmPoint}>
               Potvrdi novu točku
            </Button>
            <Button variant="outlined" onClick={resetPoints}>
               Resetiraj točke
            </Button>
            <Button variant="outlined" onClick={addPolygon}>
               Stvori regiju
            </Button>
         </div>
      </div>
   );
}
 
export default Operations;