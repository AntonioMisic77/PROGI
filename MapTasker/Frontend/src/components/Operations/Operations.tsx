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
import { GetBlockDto, GetBuildingDto, GetOperationDto, GetRegionDto, OperationClient, RegionDto, PointDto, BlockClient, CreateBlockDto, BuildingClient, CreateBuildingDto } from '../../Api/Api';
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

const areasToBlocks = (areas: LatLng[][]) : CreateBlockDto[] => {
   let blocks : CreateBlockDto[] = [];
   areas.forEach(area => {
      let block : CreateBlockDto = {points: []};
      area.forEach(latLng => {
         block.points.push({latitude: latLng.lat, longitude: latLng.lng});
      })
      blocks.push(block);
   })
   return blocks;
}

const areasToBuildings = (areas: LatLng[][]) : CreateBuildingDto[] => {
   let buildings : CreateBuildingDto[] = [];
   areas.forEach(area => {
      let building : CreateBuildingDto = {points: []};
      area.forEach(latLng => {
         building.points.push({latitude: latLng.lat, longitude: latLng.lng});
      })
      buildings.push(building);
   })
   return buildings;
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

   let giveUpRegions = () => {
      setPoints([]);
      setPoint(undefined);
      setAreas([]);
      setDrawing(false);
      setShowAllRegions(true);
      setDefaultText();
   }

   let giveUpBlocks = () => {
      if (!user) return;
      setPoints([]);
      setPoint(undefined);
      setAreas([]);
      setDrawing(false);
      setShownText("Označi željeni blok" + ((roles[user?.roleId] === "Kartograf" || roles[user?.roleId] === "Admin") ? " ili stvorite nove blokove za operaciju" : ""))
   }

   let giveUpBuildings = () => {
      if (!user) return;
      setPoints([]);
      setPoint(undefined);
      setAreas([]);
      setDrawing(false);
      setShownText("Kliknite na građevinu" + ((roles[user?.roleId] === "Kartograf" || roles[user?.roleId] === "Admin") ? " ili stvorite nove građevine u bloku" : ""))
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
               setAreas([]);
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
      setShownText("Označi željeni blok" + ((roles[user?.roleId] === "Kartograf" || roles[user?.roleId] === "Admin") ? " ili stvorite nove blokove za operaciju" : ""))
      setShowChildrenBlocks(true);
   }

   let hideChildrenBlocks = () => {
      setDefaultText();
      setShowChildrenBlocks(false);
      setSelectedBlockId(undefined);
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

   let startBlockCreation = () => {
      setDrawing(true);
      setSelectedBlockId(undefined);
      setShownText("Označite blokove počevši od prve točke")
   }

   let createBlocks = () => {
      let client = new BlockClient('https://localhost:7270');
      client.createBlock(selectedRegionId, areasToBlocks(areas))
            .then(response => {
               setShownText("Blokovi uspješno stvoreni");
               setPoints([]);
               setPoint(undefined);
               setDrawing(false);
               setAreas([]);
               setBlocks(oldBlocks => {
                  response.forEach(block => oldBlocks.push(block))
                  return oldBlocks;
               })
            }).catch(err => alert(err))
   }

   let showBuildingsOfSelectedBlock = () => {
      if (!user) return
      setSelectedRegionId(undefined);
      setShowChildrenBuildings(true);
      setShownText("Kliknite na građevinu" + ((roles[user?.roleId] === "Kartograf" || roles[user?.roleId] === "Admin") ? " ili stvorite nove građevine u bloku" : ""))
   }

   let unselectBlock = () => {
      if (!user) return
      setSelectedBlockId(undefined);
      setShownText("Označi željeni blok" + ((roles[user?.roleId] === "Kartograf" || roles[user?.roleId] === "Admin") ? " ili stvorite nove blokove za operaciju" : ""))
   }

   let startBuildingCreation = () => {
      setDrawing(true);
      setSelectedBuildingId(undefined);
      setShownText("Označite građevine počevši od prve točke")
   }

   let ableToCreateBuilding = () => {
      if (selectedBlockId === undefined) return false;
      let block = blocks.find(b => b.id === selectedBlockId)
      if (!block) return false;
      if (block.status !== "Aktivan") return false;
      if (block.activeForOIB !== user?.oib) return false;
      return true;
   }

   let blockStatus = () => {
      return blocks.find(b => b.id === selectedBlockId)?.status ?? "Greška"
   }

   let buildingStatus = () => {
      return buildings.find(b => b.id === selectedBuildingId)?.status ?? "Greška"
   }

   let hideChildrenBuildings = () => {
      if (!user) return;
      setSelectedBuildingId(undefined);
      setShowChildrenBuildings(false);
      setSelectedRegionId(blocks.find(b => b.id === selectedBlockId)?.regionId);
      setShownText("Označi željeni blok" + ((roles[user?.roleId] === "Kartograf" || roles[user?.roleId] === "Admin") ? " ili stvorite nove blokove za operaciju" : ""))
   }

   let createBuildings = () => {
      let client = new BuildingClient('https://localhost:7270');
      client.createBuilding(selectedBlockId, areasToBuildings(areas))
            .then(response => {
               setShownText("Građevine uspješno stvorene");
               setPoints([]);
               setPoint(undefined);
               setDrawing(false);
               setAreas([]);
               setBuildings(oldBuildings => {
                  response.forEach(building => oldBuildings.push(building))
                  return oldBuildings;
               })
            }).catch(err => alert(err))
   }

   let markBlockAsActive = () => {
      if (!selectedBlockId) return;
      let client = new BlockClient('https://localhost:7270');
      client.updateBlockStatus({status: "Aktivan", blockId: selectedBlockId})
            .then((response) => {
               setBlocks(
                  oldBlocks => {
                     let index = oldBlocks.findIndex(b => b.id === selectedBlockId);
                     oldBlocks[index].status = "Aktivan";
                     oldBlocks[index].activeForOIB = user?.oib;
                     return oldBlocks;
                  })
               setShownText("Uspješno promijenjen status bloku na: Aktivan")
            }).catch(err => alert(err))
   }

   let markBlockForCheck = () => {
      if (!selectedBlockId) return;
      let block = blocks.find(b => b.id === selectedBlockId);
      if (!block || block.status !== "Aktivan") return;

      let client = new BlockClient('https://localhost:7270');
      client.updateBlockStatus({status: "Provjera", blockId: selectedBlockId})
            .then((response) => {
               setBlocks(
                  oldBlocks => {
                     let index = oldBlocks.findIndex(b => b.id === selectedBlockId);
                     oldBlocks[index].status = "Provjera";
                     return oldBlocks;
                  })
               setShownText("Uspješno promijenjen status bloku na: Provjera. Pričekajte drugog kartografa za provjeru.")
            }).catch(err => alert(err))
   }

   let markBlockAsDone = () => {
      if (!selectedBlockId) return;
      let block = blocks.find(b => b.id === selectedBlockId);
      if (!block || block.status !== "Provjera") return;

      let client = new BlockClient('https://localhost:7270');
      client.updateBlockStatus({status: "Završen", blockId: selectedBlockId})
            .then((response) => {
               setBlocks(
                  oldBlocks => {
                     let index = oldBlocks.findIndex(b => b.id === selectedBlockId);
                     oldBlocks[index].status = "Završen";
                     return oldBlocks;
                  })
               setShownText("Uspješno promijenjen status bloku na: Završen")
            }).catch(err => setShownText("Ne možete sami sebi napraviti provjeru"))
   }

   let markBuildingAsChecked = () => {
      if (!selectedBuildingId) return;
      let building = buildings.find(b => b.id === selectedBuildingId);
      if (!building) return;
      
      let client = new BuildingClient('https://localhost:7270');
      client.updateBuildingStatus({status: "Pretraženo", buildingId: selectedBuildingId})
            .then((response) => {
               setBuildings(
                  oldBuildings => {
                     let index = oldBuildings.findIndex(b => b.id === selectedBuildingId);
                     oldBuildings[index].status = "Pretraženo";
                     return oldBuildings;
                  })
               setShownText("Uspješno promijenjen status građevini na: Pretraženo")
            }).catch(err => setShownText("Neočekivana pogreška"))
   }

   let onAreaClick = (id: number, type: "region" | "block" | "building") => {
      setShowAllRegions(false);
      if (type === "region") {
         setSelectedRegionId(id);
         let region = regions.find(r => r.id === id);
         let operation = operations.find(op => op.id === region?.operationId);
         setShownText("Označena regija s ID-jem " + region?.id + " operacije " + operation?.name)
      }
      if (type === "block"){
         setSelectedBlockId(id);
         let block = blocks.find(b => b.id === id)
         setShownText("Označen blok s ID-jem " + block?.id + " sa statusom: " + block?.status)
      }
      if (type === "building"){
         let building = buildings.find(b => b.id === id)
         setShownText("Označena građevina s ID-jem " + building?.id + " sa statusom: " + building?.status)
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
               <Typography fontSize="1.5rem" textAlign="center">
                  {shownText}
               </Typography>
               {namingOperation && <input type="text" className="form-input" onChange={(e:any) => setOperationName(e.target.value)}/>}
            </div>
            <div className="button-container">
               {user && (roles[user.roleId] === 'Voditelj' || roles[user.roleId] === 'Admin') && showAllRegions && noneSelected() && (
                  namingOperation ?
                  <>
                     <Button variant="contained" onClick={createOperation} color="success" disabled={!namingOperation || operationName.length < 4} style={{height:"18%"}}>
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
                        Spremi regiju
                     </Button>
                     <Button variant="outlined" onClick={resetPoints} color="error">
                        Resetiraj trenutne točke
                     </Button>
                     <Button variant="outlined" onClick={giveUpRegions} color="error">
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
                  <> {/* ovdje gumb za brisanje regije/operacije */}
                  </>
               }
               {showChildrenBlocks && !showChildrenBuildings && !drawing &&
                  <Button variant="outlined" onClick={hideChildrenBlocks} color="error">
                     Nazad na regije
                  </Button>
               }
               {user && showChildrenBlocks && !showChildrenBuildings && (roles[user.roleId] === 'Kartograf' || roles[user.roleId] === 'Admin') && (
                  drawing ?
                  <>
                     <Button variant="outlined" onClick={confirmPoint}>
                        Potvrdi novu točku
                     </Button>
                     <Button variant="outlined" onClick={addPolygon}>
                        Spremi blok
                     </Button>
                     <Button variant="outlined" onClick={resetPoints} color="error">
                        Resetiraj trenutne točke
                     </Button>
                     <Button variant="outlined" onClick={giveUpBlocks} color="error">
                        Odustani
                     </Button>
                     <Button variant="outlined" onClick={createBlocks} color="success" disabled={point !== undefined || points.length > 0 || !drawing || areas.length < 1}>
                        Stvori blokove
                     </Button>
                  </>
                  :
                  <Button variant="outlined" onClick={startBlockCreation}>
                     Započni stvaranje blokova
                  </Button>
               )}
               {user && showChildrenBlocks && !showChildrenBuildings && selectedBlockId && selectedRegionId &&
                  <>
                     <Button variant="outlined" onClick={showBuildingsOfSelectedBlock}>
                        Prikaži građevine bloka
                     </Button>
                  </>
               }
               {user && showChildrenBuildings && selectedBlockId && (roles[user.roleId] === 'Kartograf' || roles[user.roleId] === 'Admin') && ableToCreateBuilding() && (
                  drawing ?
                  <>
                     <Button variant="outlined" onClick={confirmPoint}>
                        Potvrdi novu točku
                     </Button>
                     <Button variant="outlined" onClick={addPolygon}>
                        Spremi građevinu
                     </Button>
                     <Button variant="outlined" onClick={resetPoints} color="error">
                        Resetiraj trenutne točke
                     </Button>
                     <Button variant="outlined" onClick={giveUpBuildings} color="error">
                        Odustani
                     </Button>
                     <Button variant="outlined" onClick={createBuildings} color="success" disabled={point !== undefined || points.length > 0 || !drawing || areas.length < 1}>
                        Stvori građevine
                     </Button>
                  </>
                  :
                  <Button variant="outlined" onClick={startBuildingCreation}>
                     Započni stvaranje građevina
                  </Button>
               )}
               {showChildrenBuildings && !drawing &&
                  <Button variant="outlined" onClick={hideChildrenBuildings} color="error">
                     Nazad na blokove
                  </Button>
               }
               {selectedBlockId && (blockStatus() === "Nezapočeto" || blockStatus() === "Provjera") && !drawing && !showChildrenBuildings &&
                  <Button variant="outlined" color={blockStatus() === "Nezapočeto" ? "success" : "error"} onClick={markBlockAsActive}>
                     Označi blok aktivnim
                  </Button>
               }
               {selectedBlockId && blockStatus() === "Aktivan" && !drawing && !showChildrenBuildings &&
                  <Button variant="outlined" color="success" onClick={markBlockForCheck}>
                     Označi blok za provjeru
                  </Button>
               }
               {selectedBlockId && blockStatus() === "Provjera" && !drawing && !showChildrenBuildings &&
                  <Button variant="outlined" color="success" onClick={markBlockAsDone}>
                     Označi blok gotovim
                  </Button>
               }
               {user && selectedBuildingId && buildingStatus() === "Nepretraženo" && (roles[user.roleId] === 'Spasioc' || roles[user.roleId] === 'Admin') && !drawing &&
                  <Button variant="outlined" color="success" onClick={markBuildingAsChecked}>
                     Označi građevinu pretraženom
                  </Button>
               }
            </div>
         </div>
      </div>
   );
}
 
export default Operations;