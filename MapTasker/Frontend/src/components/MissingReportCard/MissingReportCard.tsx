import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { MissingReportDto } from '../../Api/Api';
import Comments from '../Comments/Comments';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import "./MissingReportCard.css"

interface ReportsProps {
    missingReport: MissingReportDto,

 }

const MissingReportCard = ({missingReport} : ReportsProps) => {

    return(
        <Card sx={{
            height:"auto",
            width:"100%",

        }}>
            <CardContent>
                <img className="imgPerson" src={missingReport.photo} />
                <Typography sx={{
                    color:"black", 
                    fontSize: "25px",
                }}>
                    {missingReport.firstName + ' ' + missingReport.lastName}
                </Typography>
                <Typography>
                    {"Opis: " + missingReport.description}
                </Typography>
                <Typography>
                    {"Zadnje viđen/a: " + missingReport.reportedAt}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{
                
            }}>
                <form className="comment-form">
                    <TextField  size="small"
                                variant= "outlined"
                                className="post-input"
                                placeholder="add comment" 
                                sx={{
                                    width:"30rem",
                                    marginLeft: "120px"
                                }}/>
                    <Button variant="contained"
                            size="medium"
                            endIcon={<SendRoundedIcon/>}
                            type="submit"> 
                       POST
                    </Button>
                </form>
            </CardActions>
            <Comments />
            
        </Card>
    )
}

export default MissingReportCard;
