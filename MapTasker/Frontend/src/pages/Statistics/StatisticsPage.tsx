import { Typography } from "@mui/material";
import React from "react";
import Header from "../../components/Header/Header";
import StatisticsCharts from "../../components/StatisticsCharts/StatisticsCharts";

import "./StatisticsPage.css"

const StatisticsPage = () => {
   return (
      <div className="statistics-page">
         <div>
            <Header />
         </div>
         <Typography variant="h4" style={{marginTop:"5vh"}}>Statistika o nestalima</Typography>
         <StatisticsCharts/>
      </div>
   );
}
 
export default StatisticsPage;