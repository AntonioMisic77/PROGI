import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemButton, ListItemText, Collapse, ListItem, ListItemAvatar, Avatar, Typography, Divider } from '@mui/material';
import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CommentDto, UserClient, UserDto } from '../../Api/Api';
import { useState } from "react";

interface CommentProps {
    comment: CommentDto,

 }

const Comments = ({comment} : CommentProps) => {
    const[open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    const[user, setUser] = useState<UserDto>();

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
                            <Avatar alt={user?.userName} src={user?.photo} />
                        </ListItemAvatar>
                        <ListItemText
                        primary={comment.userOib !== null ? user?.userName : 'Anonymous'}
                        secondary={
                            <React.Fragment>
                            {comment.text}
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List>
              
    );
}

export default Comments;
