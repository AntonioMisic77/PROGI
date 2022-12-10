import { Button, Typography, useRadioGroup } from '@mui/material';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserClient, UserDto } from '../../Api/Api';
import { UserContext } from '../../store/UserContextProvider';
import UserCard from '../UserCard/UserCard';
 
import "./UserView.css"

const UserView = () => {

   const navigate = useNavigate();

   let [users, setUsers] = useState<UserDto[]>([]);
   let [isAdmin, setIsAdmin] = useState<boolean>(false);

   let {user} = useContext(UserContext);

   const removeCard = (oib: number) => {
      return () => {
         setUsers(oldUsers => oldUsers.filter(user => user.oib !== oib));
      }  
   }

   useEffect(
      () => {
         if (!user || user.roleId !== 0) navigate("/login")
         else {
            let client = new UserClient(process.env.REACT_APP_API_URL)
            client.getAllUsers().then(users => setUsers(users));
         }
      } , []
   )

   return ( 
      (user && user.roleId === 0)  ?
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