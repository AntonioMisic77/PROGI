import { Typography } from "@mui/material";
import React from "react";
import StatisticsCharts from "../../components/StatisticsCharts/StatisticsCharts";

import "./StatisticsPage.css"

const StatisticsPage = () => {
   return (
      <div className="statistics-page">
         <Typography variant="h4" style={{marginTop:"5vh"}}>Statistika o nestalima</Typography>
         <StatisticsCharts/>
      </div>
   );
}
 
export default StatisticsPage;