import * as React from 'react';
import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FunctionComponent, PropsWithChildren, ReactNode, useEffect } from 'react';
import { MapContainer, Polygon, TileLayer } from 'react-leaflet';
import { boolean } from 'yup';
import { GetBlockDto, GetBuildingDto, GetOperationDto, GetRegionDto, OperationClient, PointDto } from '../../Api/Api';
import "./Map.css"

interface MapProps {
   selectedRegionId: number | undefined;
   selectedBlockId: number | undefined;
   selectedBuildingId: number | undefined;
   showChildrenBlocks: boolean;
   showChildrenBuildings: boolean;
   showAllRegions: boolean;
   regions: GetRegionDto[];
   blocks: GetBlockDto[];
   buildings: GetBuildingDto[];
   onAreaClick: (id: number, type: "region" | "block" | "building") => void;
   children: ReactNode;
   selectionEnabled: boolean;
}

const pointsToLatLngArray = (points: PointDto[]) : LatLng[] => {
   let latLngArray : LatLng[] = [];
   points.forEach((p) => latLngArray.push(new LatLng(p.latitude, p.longitude)))
   return latLngArray
}

const getBlockColor = (status: string) => {
   if (status === "Nezapočeto") return "red";
   if (status === "Aktivan") return "blue";
   if (status === "Provjera") return "yellow";
   if (status === "Završen") return "green";
   return "black"
}

const Map = ({selectedBlockId, selectedRegionId, showAllRegions, showChildrenBlocks, showChildrenBuildings, onAreaClick, regions, blocks, buildings, children, selectedBuildingId, selectionEnabled} : MapProps) => {

   return ( 
      <MapContainer center={[45.33, 14.445]} zoom={13} scrollWheelZoom={true}>
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         {showAllRegions && regions &&
            regions.map(region => 
               <Polygon positions={pointsToLatLngArray(region.points)}
                        eventHandlers={{click: (e) => {onAreaClick(region.id, "region")}}}
                        fillColor="blue"
                        color="blue"
                        interactive={selectionEnabled}
                        key={region.id + +selectionEnabled}/>
                        )
         }
         {
            selectedRegionId !== undefined && (
               showChildrenBlocks ?
                  regions.find(r => r.id === selectedRegionId) && 
                     <>
                        <Polygon positions={pointsToLatLngArray(regions.find(r => r.id === selectedRegionId)?.points!)}
                           color="white"
                           fillColor="white"
                           interactive={false}/>
                        {!showChildrenBuildings && blocks &&
                           blocks.filter(b => b.regionId === selectedRegionId).map(
                              b => <Polygon positions={pointsToLatLngArray(b.points)}
                                          fillColor = {getBlockColor(b.status)}
                                          eventHandlers={{click: (e) => {onAreaClick(b.id, "block")}}}
                                          color = {b.id === selectedBlockId ? "green" : "orange"}
                                          key = {b.id + (selectedBlockId ?? 0) + +selectionEnabled + b.status}
                                          interactive={selectionEnabled}
                                    />
                           )
                        }
                     </>
                  :
                  regions.filter(r => r.operationId === regions.find(r => r.id === selectedRegionId)?.operationId)
                     .map(r => 
                        <Polygon positions={pointsToLatLngArray(r.points)}
                              eventHandlers={{click: (e) => {onAreaClick(r.id, "region")}}}
                              fillColor = "blue"
                              color = {r.id === selectedRegionId ? "green" : "blue"}
                              key = {r.id + selectedRegionId + +selectionEnabled}
                              interactive={selectionEnabled}
                        />
                     )
            )
         }
         {
            selectedBlockId !== undefined && showChildrenBuildings && blocks.find(b => b.id === selectedBlockId) &&
                  <>
                     <Polygon positions={pointsToLatLngArray(blocks.find(b => b.id === selectedBlockId)?.points!)}
                        color="white"
                        fillColor="white"
                        interactive={false}/>
                     {
                        buildings.filter(b => b.blockId === selectedBlockId).map(
                           b => <Polygon positions={pointsToLatLngArray(b.points)}
                                       eventHandlers={{click: (e) => {onAreaClick(b.id, "building")}}}
                                       fillColor = {b.status === "Pretraženo" ? "green" : "yellow"}
                                       color = {b.id === selectedBuildingId ? "green" : "yellow"}
                                       key = {b.id + (selectedBuildingId ?? 0) + +selectionEnabled + b.status}
                                       interactive={selectionEnabled}
                                 />
                        )
                     }
                  </>
         }
         {children}
      </MapContainer> 
   );
}
 
export default Map;