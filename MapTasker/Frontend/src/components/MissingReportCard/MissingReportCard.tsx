import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { CommentClient, MissingReportDto } from '../../Api/Api';
import Comments from '../Comments/Comments';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { MissingReportClient } from '../../Api/Api';
import "./MissingReportCard.css"
import { useUserData } from '../../hooks/useUserData';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface ReportsProps {
    missingReport: MissingReportDto,

 }

const MissingReportCard = ({missingReport} : ReportsProps) => {
    
    const [message, setMessage] = React.useState('');

    let {user, userLoaded} = useUserData();

    const addComment = async () => {
       
                let client = new CommentClient("https://localhost:7270");
                client.createComment({
                    id: 0,
                    reportId: missingReport.id,
                    text: message,
                    userOib: user?.oib
                }).then(user => {
                    alert("Uspješno dodan komentar")})

    }

    const handleChange = (event : any) => {
        setMessage(event.target.value);
      };

    const[open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

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
                <form className="comment-form" onSubmit={addComment}>
                    <TextField  size="small"
                                variant= "outlined"
                                className="post-input"
                                placeholder="add comment" 
                                value={message}
                                onChange={handleChange}
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
            <div style={{
                float: "right"
            }}>
                <List>
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Pogledaj sve komentare">
                            {open ? <ExpandLess /> : <ExpandMore />}
                            
                        </ListItemText>
                        <ExpandMoreIcon />
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        { missingReport.comments !== undefined ? missingReport.comments.map(comment => <Comments comment={comment} key={comment.id}/>) : ''}
                    </Collapse>
                </List>
            </div>
        </Card>
    )
}

export default MissingReportCard;
