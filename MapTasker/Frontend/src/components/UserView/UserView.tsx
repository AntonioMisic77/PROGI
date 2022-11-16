import { Button } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { UserClient, UserDto } from '../../Api/Api';

interface UserViewProps {
   
}
 
const UserView = () => {

   let [users, setUsers] = useState<UserDto[]>([]);

   useEffect(
      () => {
         let client = new UserClient("https://localhost/7270")
         client.getAllUsers().then(users => setUsers(users));
      } , [users]
   )

   return ( 
      <Button onClick={() => console.log(users)}>
         Svi korisnici
      </Button>
   );
}
 
export default UserView;