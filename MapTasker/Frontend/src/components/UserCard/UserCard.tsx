import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import * as React from 'react';
import { UserClient, UserDto } from '../../Api/Api';
import { roles } from '../../models/Role';

interface UserCardProps {
   user: UserDto,
   removeSelf: () => void,
}

const UserCard = ({user, removeSelf} : UserCardProps) => {

   const confirmUser = () => {
      let client = new UserClient("https://localhost:7270");
      client.confirmUser(user.oib).then(
         resp => {
            alert("Korisnik uspješno potvrđen")
            removeSelf();
         }
      ).catch(() => alert("Greška"));
   }

   const deleteRequest = () => {
      let client = new UserClient("https://localhost:7270");
      client.deleteUser(user.oib).then(
         resp => {
            alert("Zahtjev uspješno izbrisan")
            removeSelf();
         }
      ).catch(() => alert("Greška"));
   }

   return (
      <Card sx={{width:"20%"}} variant="outlined">
          <CardContent sx={{height:"4rem"}}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
               {roles[user.roleId]}
            </Typography>
            <Typography variant="h5" component="div">
               {user.firstName + ' ' + user.lastName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
               {user.userName}
            </Typography>
         </CardContent>
         <CardActions sx={{height:"3rem"}}>
            <Button size="small" onClick={confirmUser}>Potvrdi korisnika</Button>
            <Button size="small" color="error" onClick={deleteRequest}>Izbriši zahtjev</Button>
         </CardActions>
      </Card>
   );
}
 
export default UserCard;