import { Button, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { UserClient, UserDto } from '../../Api/Api';
import UserCard from '../UserCard/UserCard';
 
const UserView = () => {

   let [users, setUsers] = useState<UserDto[]>([]);
   let [isAdmin, setIsAdmin] = useState<boolean>(false);

   useEffect(
      () => {
         let client = new UserClient(process.env.REACT_APP_API_URL)
         client.getRole().then(
            roleId => {
               if (roleId === 0) {
                  setIsAdmin(true);
                  client.getAllUsers().then(users => setUsers(users));
               }
            }
         )       
      } , []
   )

   const removeCard = (oib: number) => {
      return () => {
         setUsers(oldUsers => oldUsers.filter(user => user.oib !== oib));
      }  
   }

   return ( 
      <div className="user-container">
         
         {  isAdmin ?
            users.map(user => <UserCard user={user} removeSelf = {removeCard(user.oib)} key={user.oib}/>)
            :
            <Typography>Samo za admine!</Typography>
         }
      </div>
   );
}
 
export default UserView;