import React, {useState, useEffect} from 'react';
import { useUserData } from '../../hooks/useUserData';
import { useNavigate } from 'react-router-dom';
import { MissingReportClient, MissingReportDto } from '../../Api/Api';
import { Button, Card, CardContent, Typography } from '@mui/material';
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

    const removeCard = (id: number) => {
        return () => {
           setMissingReports(oldMissingReports => oldMissingReports.filter(missingReport => missingReport.id !== id));
        }  
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
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <Typography sx={{
                    textAlign: "center",
                    fontFamily: 'Work Sans, sans-serif', 
                    color: '#616161', 
                    fontSize: "22px"
                }}>
                    Želite li prijaviti nestalu osobu?
                </Typography>
                <Button 
                    variant="contained"
                    size="medium"
                    sx={{
                        marginLeft: '20px'
                    }}
                    href="/missing-person"
                >
                    PRIJAVI
                </Button>
            </div>
            <div className="card-container">
                {missingReports.map(missingReport => <MissingReportCard missingReport={missingReport} removeCard={removeCard(missingReport.id)} key={missingReport.id}/>)}
            </div>
       </div>

    );
}

export default MissingReports;
