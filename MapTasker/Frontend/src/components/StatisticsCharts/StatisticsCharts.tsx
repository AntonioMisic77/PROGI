import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { StatisticClient } from '../../Api/Api';
import { useUserData } from '../../hooks/useUserData';
import { roles } from '../../models/Role';
import BarChart from '../BarChart/BarChart';
 
import "./StatisticsCharts.css"

function getLast7Days() {
   let days = [];
   for (let i = 0; i < 7; i++) {
     let day = new Date();
     day.setDate(day.getDate() - i);
     let dayString = day.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
     days.push(dayString);
   }
   days.reverse();
   return days;
}

const StatisticsCharts = () => {

   const navigate = useNavigate();
   const {user, userLoaded} = useUserData();

   const [missingPeopleData, setMissingPeopleData] = useState<number[]>([]);
   const [foundPeopleData, setFoundPeopleData] = useState<number[]>([]);
   const [unsearchedBuildingsData, setUnsearchedBuildingsData] = useState<number[]>([]);
   const [searchedBuildingsData, setSearchedBuildingsData] = useState<number[]>([]);

   useEffect(
      () => {
         if (userLoaded) {
            if (!user || (roles[user.roleId] !== 'Admin' && roles[user.roleId] !== 'Voditelj' && roles[user.roleId] !== 'Kartograf')){
               navigate("/login")
            } 
            else {
               let client = new StatisticClient(process.env.REACT_APP_API_URL)
               client.getStatistics().then(stats => {
                  setMissingPeopleData(stats.missingPeople);
                  setFoundPeopleData(stats.foundPeople);
                  setUnsearchedBuildingsData(stats.unsearchedBuildings);
                  setSearchedBuildingsData(stats.searchedBuildings);
               });
            }
         }
      }, [userLoaded]
   )

   return (
      <div className="grid-2x1">
         <BarChart name="Podaci o osobama" data1={missingPeopleData} data2={foundPeopleData} name1="Nestali" name2="Pronađeni" labels={getLast7Days()}/>
         <BarChart name="Podaci o građevinama" data1={unsearchedBuildingsData} data2={searchedBuildingsData} name1="Nepretražene" name2="Pretražene" labels={getLast7Days()}/>
      </div> 
   );
}
 
export default StatisticsCharts;