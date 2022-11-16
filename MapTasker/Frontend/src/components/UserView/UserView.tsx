import { Button } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { UserClient, UserDto } from '../../Api/Api';
import UserCard from '../UserCard/UserCard';
 
const UserView = () => {

   let [users, setUsers] = useState<UserDto[]>([]);
   let [isAdmin, setIsAdmin] = useState<boolean>(false);

   useEffect(
      () => {
         let client = new UserClient("https://localhost:7270")
         let roleId = /*await client.getRole();*/ 1;
         if (roleId === 1) {
            setIsAdmin(true);
            client.getAllUsers().then(users => setUsers(users));
         }
      } , []
   )

   const removeCard = (oib: number) => {
      return () => {
         setUsers(oldUsers => oldUsers.filter(user => user.oib !== oib));
      }  
   }

   return ( 
      <div className="user-container">
         {users.map(user => <UserCard user={user} removeSelf = {removeCard(user.oib)}/>)}
      </div>
   );
}
 
export default UserView;