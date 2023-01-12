import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemButton, ListItemText, Collapse, ListItem, ListItemAvatar, Avatar, Typography, Divider, Button } from '@mui/material';
import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CommentClient, CommentDto, UserClient, UserDto } from '../../Api/Api';
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useUserData } from '../../hooks/useUserData';
import { roles } from '../../models/Role';

interface CommentProps {
    comment: CommentDto,
    removeComment: () => void,

 }

const Comments = ({comment, removeComment} : CommentProps) => {
    const[open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    const[user2, setUser] = useState<UserDto>();

    let {user, userLoaded} = useUserData();

    /* za dohvacanje usera koji je komentirao
    dodati ako je userOib undefined, anonymous je komentirao objavu*/

    React.useEffect(
        () => {
         let client = new UserClient(process.env.REACT_APP_API_URL);
         if(comment.userOib != null) {
            client.getUser(comment.userOib).then(user => setUser(user));
         }


        }, []
     )
    console.log(comment)




    return(
       
                <List sx={{ width: '100%', minWidth: 500, bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={user2?.userName} src={user2?.photo} />
                        </ListItemAvatar>
                        <ListItemText
                        primary={comment.userOib !== null ? user2?.userName : 'Anonymous'}
                        secondary={
                            <React.Fragment>
                            {comment.text}
                            </React.Fragment>
                        }
                        />
                        <Button
                            endIcon={<DeleteIcon/>}
                            sx={{
                                alignContent: "center",
                                marginTop: "10px", 
                                display: !user || (roles[user.roleId] !== 'Voditelj' && roles[user.roleId] !== 'Admin') ? "none" : 'block'
                                
                            }}
                            onClick={() => {
                                let client = new CommentClient(process.env.REACT_APP_API_URL);
                                client.deleteComment(comment.id).then(
                                resp => {
                                    removeComment();

                                }
                                ).catch(() => alert("Greška"));
                            }
                            }>
                        </Button>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List>
              
    );
}

export default Comments;
