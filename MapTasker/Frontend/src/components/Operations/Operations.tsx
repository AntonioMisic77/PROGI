import * as React from 'react';
import { Circle, MapContainer, Polygon, Polyline, TileLayer, useMapEvents } from 'react-leaflet';
import './Operations.css'
import { useEffect, useMemo, useState } from 'react';
import { Point, LatLng } from 'leaflet';
import LocationMarker from '../LocationMarker/LocationMarker';
import PointMarker from '../PointMarker/PointMarker';
import { Button, Typography } from '@mui/material';
import { useUserData } from '../../hooks/useUserData';
import { roles } from '../../models/Role';
import { useNavigate } from 'react-router-dom';
import { GetBlockDto, GetBuildingDto, GetOperationDto, GetRegionDto, OperationClient } from '../../Api/Api';
import Map from '../Map/Map';

interface OperationsProps {
   
}

const Operations = () => {

   let navigate = useNavigate();

   let [operations, setOperations] = useState<GetOperationDto[]>([])
   let [regions, setRegions] = useState<GetRegionDto[]>([]);
   let [blocks, setBlocks] = useState<GetBlockDto[]>([]);
   let [buildings, setBuildings] = useState<GetBuildingDto[]>([]);
   let [selectedRegionId, setSelectedRegionId] = useState<number | undefined>(undefined);
   let [selectedBlockId, setSelectedBlockId] = useState<number | undefined>(undefined);
   let [selectedBuildingId, setSelectedBuildingId] = useState<number | undefined>(undefined);
   let [showAllRegions, setShowAllRegions] = useState<boolean>(true);
   let [showChildrenBlocks, setShowChildrenBlocks] = useState<boolean>(false);
   let [showChildrenBuildings, setShowChildrenBuildings] = useState<boolean>(false);

   let [areas, setAreas] = useState<LatLng[][]>([]);
   let [drawing, setDrawing] = useState<boolean>(false);
   let [points, setPoints] = useState<LatLng[]>([]);
   let [point, setPoint] = useState<LatLng | undefined>(undefined);

   let [shownText, setShownText] = useState<string>("")

   let {user, userLoaded} = useUserData();
   useEffect(
      () => {
         if (userLoaded) {
            if (!user){
               navigate("/login")
            } 
            else {
               if (roles[user.roleId] === 'Voditelj' || roles[user.roleId] === 'Admin') {
                  setShownText("Kliknite gumb za stvaranje nove operacije ili kliknite na regiju postojeće operacije za njen pregled")
               }
               if (roles[user.roleId] === 'Kartograf') {
                  setShownText("Kliknite na regiju za uređivanje ili stvaranje njenih blokova")
               }
               if (roles[user.roleId] === 'Spasioc') {
                  setShownText("Kliknite na regiju u kojoj želite pregledati ili stvoriti nove građevine")
               }
            }
         }
      }, [userLoaded]
   )

   useEffect(()=>{
      let client = new OperationClient("https://localhost:7270");
      client.getAllAreas().then(areas => {
         setOperations(areas.operations);
         setRegions(areas.regions);
         setBlocks(areas.blocks);
         setBuildings(areas.buildings);
      })
   }, [])

   let updatePoint = (point: LatLng) => {
      setPoint(point);
      setShownText("Potvrdite točku ili označite drugu")
   }

   let startNewOperation = () => {
      setSelectedBlockId(undefined);
      setSelectedRegionId(undefined);
      setDrawing(true);
   }

   let confirmPoint = (e: any) => {
      setShownText("Nova točka potvrđena, označite još točaka ili stvorite novo područje")
      e.stopPropagation()
      if (point !== undefined){
         setPoints(
            oldPoints => {
               oldPoints.push(point ?? new LatLng(0,0));
               return oldPoints;
            }
         )
         setPoint(undefined);
      }
   }

   let resetPoints = () => {
      setShownText("Točke resetirane, označite novu početnu točku ili završite s trenutnim područjima")
      setPoints([]);
      setPoint(undefined);
   }

   let giveUp = () => {
      setPoints([]);
      setPoint(undefined);
      setAreas([]);
      setDrawing(false);
   }

   let addPolygon = () => {
      if (points.length < 3) setShownText("Nedovoljno točaka za stvaranje novog područja")
      else {
         setAreas(oldPolygons => {
            oldPolygons.push(points);
            return oldPolygons;
         })
         resetPoints();
         setShownText("Novo područje uspješno stvoreno, označite početnu točku sljedećeg područja ili završite sa stvaranjem")
      }
   }

   let onAreaClick = (id: number, type: "region" | "block" | "building") => {
      setShowAllRegions(false);
      if (type === "region") {
         setShowAllRegions(false);
         setSelectedRegionId(id);
      }
      if (type === "block"){
         setSelectedBlockId(id);
      }
      if (type === "building"){
         setSelectedBuildingId(id);
      }
   }

   return (
      <div className="operations-container">
         <Map
            regions={regions}
            blocks={blocks}
            buildings={buildings}
            onAreaClick={onAreaClick}
            selectedRegionId={selectedRegionId}
            selectedBlockId={selectedBlockId}
            selectedBuildingId={selectedBuildingId}
            showAllRegions={showAllRegions}
            showChildrenBlocks={showChildrenBlocks}
            showChildrenBuildings={showChildrenBuildings}
         >
            {  drawing && <LocationMarker position={point} onClick={updatePoint} confirmAction={confirmPoint}/>}
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
               areas && areas.map(polygon => <Polygon positions={polygon} key={polygon[0].lat}/>)
            }
         </Map>
         <div className="actions-container">
            <div className="text-container">
               <Typography variant="h4">
                  {shownText}
               </Typography>
            </div>
            <div className="button-container">
               {user && (roles[user.roleId] === 'Voditelj' || roles[user.roleId] === 'Admin') && showAllRegions && 
               <>
                  <Button variant="outlined" onClick={startNewOperation}>
                     Započni stvaranje operacije
                  </Button>
                  <Button variant="outlined" onClick={confirmPoint}>
                     Potvrdi novu točku
                  </Button>
                  <Button variant="outlined" onClick={resetPoints}>
                     Resetiraj točke
                  </Button>
                  <Button variant="outlined" onClick={addPolygon}>
                     Stvori regiju
                  </Button>
                  <Button variant="outlined" onClick={addPolygon}>
                     Stvori regiju
                  </Button>
                  <Button variant="outlined" onClick={addPolygon}>
                     Stvori regiju
                  </Button>
               </>
               }
            </div>
         </div>
      </div>
   );
}
 
export default Operations;