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
import { GetBlockDto, GetBuildingDto, GetOperationDto, GetRegionDto, OperationClient, RegionDto, PointDto } from '../../Api/Api';
import Map from '../Map/Map';

interface OperationsProps {
   
}

const areasToRegions = (areas: LatLng[][]) : RegionDto[] => {
   let regions : RegionDto[] = [];
   areas.forEach(area => {
      let region : RegionDto = {coordinates: []};
      area.forEach(latLng => {
         region.coordinates.push({latitude: latLng.lat, longitude: latLng.lng});
      })
      regions.push(region);
   })
   return regions;
}

const Operations = () => {

   let navigate = useNavigate();

   let [operations, setOperations] = useState<GetOperationDto[]>([]);
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

   let [shownText, setShownText] = useState<string>("");

   let [operationName, setOperationName] = useState<string>("");
   let [namingOperation, setNamingOperation] = useState<boolean>(false);

   let {user, userLoaded} = useUserData();

   let setDefaultText = () => {
      if (!user) return;
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

   useEffect(
      () => {
         if (userLoaded) {
            if (!user){
               navigate("/login")
            } 
            else {
               setDefaultText();
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
      setShowAllRegions(true);
      setDefaultText();
   }

   let nameOperation = () => {
      setDrawing(false);
      setNamingOperation(true);
      setShownText("Upišite naziv nove operacije i stisnite gumb za potvrdu");
   }

   let noneSelected = () => {
      return !selectedBlockId && !selectedBuildingId && !selectedRegionId
   }

   let createOperation = () => {
      let client = new OperationClient('https://localhost:7270');
      client.createOperation({name: operationName, leaderOib: user?.oib ?? 0, regions: areasToRegions(areas)})
            .then(response => {
               setShownText("Uspješno stvorena operacija, osvježite stranicu da ju vidite na karti");
               setDrawing(false);
               setShowAllRegions(true);
               setNamingOperation(false);
               setPoints([]);
               setPoint(undefined);
            }).catch(err => alert(err))
   }

   let backToCreatingOperation = () => {
      setDrawing(true);
      setNamingOperation(false);
      setShownText("Označite početnu točku sljedećeg područja ili završite sa stvaranjem")
   }

   let unselectRegion = () => {
      setSelectedRegionId(undefined);
      setShowAllRegions(true);
      setDefaultText();
   }

   let showBlocksOfSelectedRegion = () => {
      if (!user) return
      setShownText("Označi željeni blok" + ((roles[user?.roleId] === "Kartograf" || roles[user?.roleId] === "Admin") ? " ili stvori nove blokove za operaciju" : ""))
      setShowChildrenBlocks(true);
   }

   let hideChildrenBlocks = () => {
      setShowChildrenBlocks(false);
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
      if (drawing) return;
      setShowAllRegions(false);
      if (type === "region") {
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
            selectionEnabled={!drawing}
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
               <Typography variant="h4" textAlign="center">
                  {shownText}
               </Typography>
               {namingOperation && <input type="text" className="form-input" onChange={(e:any) => setOperationName(e.target.value)}/>}
            </div>
            <div className="button-container">
               {user && (roles[user.roleId] === 'Voditelj' || roles[user.roleId] === 'Admin') && showAllRegions && noneSelected() && (
                  namingOperation ?
                  <>
                     <Button variant="contained" onClick={createOperation} color="success" disabled={!namingOperation || operationName.length < 4}>
                        Stvori operaciju
                     </Button>
                     <Button variant="outlined" onClick={backToCreatingOperation} color="error">
                        Nazad
                     </Button>
                  </>
                  :
                  (
                     drawing ?
                     <>
                     <Button variant="outlined" onClick={confirmPoint}>
                        Potvrdi novu točku
                     </Button>
                     <Button variant="outlined" onClick={addPolygon}>
                        Stvori regiju
                     </Button>
                     <Button variant="outlined" onClick={resetPoints} color="error">
                        Resetiraj trenutne točke
                     </Button>
                     <Button variant="outlined" onClick={giveUp} color="error">
                        Odustani
                     </Button>
                     <Button variant="outlined" onClick={nameOperation} color="success" disabled={point !== undefined || points.length > 0 || !drawing || areas.length < 1}>
                        Stvori operaciju
                     </Button>
                     </> :
                     <Button variant="outlined" onClick={startNewOperation}>
                        Započni stvaranje operacije
                     </Button>
                  ))
               }
               {
                  user && selectedRegionId && !showChildrenBlocks &&
                  <>
                     <Button variant="outlined" onClick={showBlocksOfSelectedRegion}>
                        Prikaži blokove regije
                     </Button>
                     <Button variant="outlined" onClick={unselectRegion} color="error">
                        Odznači regiju
                     </Button>
                  </>
               }
               {user && (roles[user.roleId] === 'Voditelj' || roles[user.roleId] === 'Admin') && selectedRegionId &&
                  <>
                  </>
               }
               {showChildrenBlocks && !showChildrenBuildings &&
                  <Button variant="outlined" onClick={hideChildrenBlocks} color="error">
                     Nazad na regije
                  </Button>
               }
            </div>
         </div>
      </div>
   );
}
 
export default Operations;