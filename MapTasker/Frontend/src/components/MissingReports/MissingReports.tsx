import React, {useState, useEffect} from 'react';
import { useUserData } from '../../hooks/useUserData';
import { useNavigate } from 'react-router-dom';
import { MissingReportClient, MissingReportDto } from '../../Api/Api';
import { Card, CardContent, Typography } from '@mui/material';
import MissingReportCard from '../MissingReportCard/MissingReportCard';
import { date } from 'yup/lib/locale';

const MissingReports = () =>  {

    const navigate = useNavigate();

    let [missingReports, setMissingReports] = useState<MissingReportDto[]>([]);

    useEffect(
       () => {
        let client = new MissingReportClient("https://localhost:7270");
        client.getAllMissingReports().then(missingReports => setMissingReports(missingReports));
       }, []
    )

    console.log(missingReports)


    return(
       <div>
            <Typography variant="h2" sx={{
                textAlign: "center",
                padding: "10px",
                fontFamily: 'Work Sans, sans-serif',
            }}>
                Nestale osobe
            </Typography>
            <div className="card-container">
                {missingReports.map(missingReport => <MissingReportCard missingReport={missingReport} key={missingReport.id}/>)}
            </div>
       </div>

    );
}

export default MissingReports;
