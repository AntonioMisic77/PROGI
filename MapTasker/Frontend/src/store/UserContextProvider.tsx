import * as React from 'react';
import { PropsWithChildren, useState } from 'react';
import { UserClient, UserDto } from '../Api/Api';
import { UserContextObject } from './UserContextObject';

interface UserContextProviderProps {

}

export const UserContext = React.createContext<UserContextObject>({user: undefined, setUser: (user) => {}});

const UserContextProvider = (props: PropsWithChildren<UserContextProviderProps>) => {

   const [user, setUser] = useState<UserDto | undefined>(undefined);

   return ( 
      <UserContext.Provider value = {{user: user, setUser: setUser}}>
         {props.children}
      </UserContext.Provider>
   );
}
 
export default UserContextProvider;