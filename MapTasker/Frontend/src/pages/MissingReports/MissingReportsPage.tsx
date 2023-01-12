import React from 'react';
import Header from '../../components/Header/Header';
import MissingReports from '../../components/MissingReports/MissingReports';


const MissingReportsPage = () =>  {

    return(
        <div>
            <div >
                <Header />
            </div>
            <div style={{
                marginTop: "60px"
            }}>
                <MissingReports/>
            </div>
        </div>
    );
}

export default MissingReportsPage;
