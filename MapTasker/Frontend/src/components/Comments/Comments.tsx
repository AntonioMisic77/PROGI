import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemButton, ListItemText, Collapse, ListItem, ListItemAvatar, Avatar, Typography, Divider } from '@mui/material';
import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CommentDto, UserClient, UserDto } from '../../Api/Api';

interface CommentProps {
    comment: CommentDto,

 }

const Comments = ({comment} : CommentProps) => {
    const[open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    const[user, setUser] = React.useState<UserDto>();

    /* za dohvacanje usera koji je komentirao
    dodati ako je userOib undefined, anonymous je komentirao objavu

    React.useEffect(
        () => {
         let client = new UserClient("https://localhost:7270");
         if(comment.userOib !== undefined) {
            client.getUser(comment.userOib).then(user => setUser(user));
         }
        }, []
     )*/
    console.log(comment)

    return(
       
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar />
                        </ListItemAvatar>
                        <ListItemText
                        primary={comment.userOib !== null ? comment.userOib : 'Anonymous'}
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
