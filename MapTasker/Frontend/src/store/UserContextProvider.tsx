import * as React from 'react';
import { PropsWithChildren, useState } from 'react';
import { UserClient, UserDto } from '../Api/Api';
import { UserContextObject } from './UserContextObject';

interface UserContextProviderProps {

}

export const UserContext = React.createContext<UserContextObject>({user: undefined, setUser: (user) => {}});

const UserContextProvider = (props: PropsWithChildren<UserContextProviderProps>) => {

   const [user, setUser] = useState<UserDto | undefined>(undefined);

   React.useEffect(
      () => {
         let client = new UserClient(process.env.REACT_APP_API_URL);
         client.getUser2().then(
            user => {
               setUser(user);
            }
         )
      }, []
   )

   return ( 
      <UserContext.Provider value = {{user: user, setUser: setUser}}>
         {props.children}
      </UserContext.Provider>
   );
}
 
export default UserContextProvider;