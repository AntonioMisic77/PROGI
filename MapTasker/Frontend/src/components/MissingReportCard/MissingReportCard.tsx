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
import { roles } from '../../models/Role';



interface ReportsProps {
    missingReport: MissingReportDto,
    removeCard: () => void,

 }

const MissingReportCard = ({missingReport, removeCard} : ReportsProps) => {
    
    const [message, setMessage] = React.useState('');

    let {user, userLoaded} = useUserData();

    let [comments, setComments] = React.useState(missingReport.comments);

    

    const addComment = async () => {
       
                let client = new CommentClient(process.env.REACT_APP_API_URL);
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


    const removeComment = (id: number, missingReport : MissingReportDto) => {
        return () => {
            missingReport.comments?.filter(comment => comment.id !== id);
            //setComments(oldComments => oldComments?.filter(comment => comment.id !== id));
            window.location.reload();
        }  
     }

    if (missingReport.foundAt === null) {

    return(
        <Card sx={{
            height:"auto",
            width:"100%",
            marginBottom: "1px",

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
                    {"Zadnje viđen/a: " + missingReport.reportedAt.toString().split('T')[0]}
                </Typography>
            </CardContent>
            <CardActions  sx={{
                display: 'flex',
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
                            type="submit" 
                            sx = {{
                               
                            }}> 
                       POST
                    </Button>
                </form>
                <Button
                    sx={{
                        display: !user || roles[user.roleId] === 'Kartograf' ? "none" : 'block',
                        float: 'right'
                    }}
                    onClick={() => {
                        let client = new MissingReportClient(process.env.REACT_APP_API_URL);
                        client.markPersonAsFound(missingReport.id).then(
                            resp => {
                               removeCard();
                            }
                         ).catch(() => alert("Greška"));
                    }}>
                    PRONAĐEN/A
                </Button>
            </CardActions>
            <div style={{
                
            }}>
                <List sx={{width: "100%"}}>
                    <ListItemButton onClick={handleClick} sx={{ float:"right"}}>
                        <ListItemText primary="Pogledaj sve komentare">
                            {open ? <ExpandLess /> : <ExpandMore />}
                            
                        </ListItemText>
                        <ExpandMoreIcon />
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {missingReport.comments !== undefined ? missingReport.comments.map(comment => <Comments comment={comment} removeComment={removeComment(comment.id, missingReport)} key={comment.id}/>) : <List sx={{ width: '100%', bgcolor: 'background.paper' }}/> }
                    </Collapse>
                </List>
            </div>
        </Card>
    )
    } else {
        return(
            <div>

            </div>
        )
    }
}

export default MissingReportCard;
