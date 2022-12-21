import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { boolean } from 'yup';
import { UserClient } from '../Api/Api';
import { UserContext } from '../store/UserContextProvider';

export const useUserData = () => {
   const {user, setUser} = useContext(UserContext);
   const [userLoaded, setUserLoaded] = useState<boolean>(false);
   
   useEffect(
      () => {
         let client = new UserClient("https://localhost:7270");
         client.getUser2().then(
            user => {
               setUser(user);
               setUserLoaded(true);
            }
         )
      }, []
   )

   return {
      user,
      setUser,
      userLoaded,
   }
}