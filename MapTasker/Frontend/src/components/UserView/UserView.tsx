import { Button, Typography, useRadioGroup } from '@mui/material';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserClient, UserDto } from '../../Api/Api';
import { useUserData } from '../../hooks/useUserData';
import { roles } from '../../models/Role';
import { UserContext } from '../../store/UserContextProvider';
import UserCard from '../UserCard/UserCard';
 
import "./UserView.css"

const UserView = () => {

   
   const navigate = useNavigate();

   let [users, setUsers] = useState<UserDto[]>([]);

   const removeCard = (oib: number) => {
      return () => {
         setUsers(oldUsers => oldUsers.filter(user => user.oib !== oib));
      }  
   }

   let {user, userLoaded} = useUserData();
   useEffect(
      () => {
         if (userLoaded) {
            if (!user || roles[user.roleId-1] !== 'Admin'){
               console.log(roles)
               navigate("/login")
            } 
            else {
               let client = new UserClient("https://localhost:7270")
               client.getAllUsers().then(users => setUsers(users));
            }
         }
      }, [userLoaded]
   )

   return ( 
      (user && roles[user.roleId-1] === 'Admin')  ?
         <>
            <Typography sx={{color: "white", margin: "0 0 1vh 1vw", paddingTop:"1vh"}} variant="h4"> Nepotvrđeni korisnici: </Typography>
            <div className="user-container">
               {
               users.filter(user => user.confirmed === false).
                  map(user => <UserCard user={user} removeSelf = {removeCard(user.oib)} key={user.oib}/>)}
            </div>
         </> : <div/>
      )
}
 
export default UserView;