import { Typography } from '@mui/material';
import * as React from 'react';
import Header from '../../components/Header/Header';
import Operations from '../../components/Operations/Operations';
import { UserContext } from '../../store/UserContextProvider';

const OperationsPage = () => {
   return (
      <div>
         <div>
            <Header />
         </div>
         <Operations/>
      </div>
      
   );
}
 
export default OperationsPage;