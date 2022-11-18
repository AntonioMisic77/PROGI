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
      let client = new UserClient(process.env.REACT_APP_API_URL);
      client.confirmUser(user.oib).then(
         resp => {
            alert("Korisnik uspješno potvrđen")
            removeSelf();
         }
      ).catch(() => alert("Greška"));
   }

   const deleteRequest = () => {
      let client = new UserClient(process.env.REACT_APP_API_URL);
      client.deleteUser(user.oib).then(
         resp => {
            alert("Zahtjev uspješno izbrisan")
            removeSelf();
         }
      ).catch(() => alert("Greška"));
   }

   return (
      <Card sx={{width:"100%", height:"auto"}} variant="outlined">
          <CardContent sx={{height:"auto"}}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
               {"Uloga: " + roles[user.roleId]}
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
               {user.firstName + ' ' + user.lastName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
               {"Username: " + user.userName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
               {"E-mail: " + user.email}
            </Typography>
            <Typography color="text.secondary">
               {"Broj mobitela: " + user.phoneNumber}
            </Typography>
         </CardContent>
         <CardActions sx={{pt:"0"}}>
            <Button size="small" onClick={confirmUser}>Potvrdi korisnika</Button>
            <Button size="small" color="error" onClick={deleteRequest}>Izbriši zahtjev</Button>
         </CardActions>
      </Card>
   );
}
 
export default UserCard;