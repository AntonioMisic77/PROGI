import React, {useState, useEffect} from 'react';
import { useUserData } from '../../hooks/useUserData';
import { useNavigate } from 'react-router-dom';
import { MissingReportClient, MissingReport, MissingReportDto } from '../../Api/Api';
import { Card, CardContent, Typography } from '@mui/material';
import MissingReportCard from '../MissingReportCard/MissingReportCard';
import { date } from 'yup/lib/locale';

const MissingReports = () =>  {

    const navigate = useNavigate();

    let [missingReports, setMissingReports] = useState<MissingReportDto[]>([]);

    useEffect(
       () => {
        let client = new MissingReportClient(process.env.REACT_APP_API_URL);
        client.getAllMissingReports().then(missingReports => setMissingReports(missingReports));
       }, []
    )

    console.log(missingReports)

    let missingReport = {
        id: 123,
        oib: 67324678933,
        firstName: "Ana", 
        lastName: "Anic", 
        description: "white dress, blue shoes, blonde hair, brown eyes", 
        reportedAt: new Date(2022, 12, 5),
        photo: require("./dwayne-the-rock-.jpg")
    }


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
                <MissingReportCard missingReport={missingReport} />
            </div>
       </div>
    );
}

export default MissingReports;