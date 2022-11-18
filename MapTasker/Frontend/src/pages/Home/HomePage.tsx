import { Box, Button, CssBaseline } from "@mui/material";
import { env } from "process";
import Header from "../../components/Header/Header";

import "./homePage.css";
const earthquake =  require("./earthquake.jpg")

function HomePage() {

  return (
      <div>
        <CssBaseline />
        <div> 
            <Header />
        </div>
        <Box className="box">
            <div className="mask">
                <img className="backgroundImg" src={earthquake} 
                alt="backgroundImage"/>
            </div>
            <div className="content">
                <div className="textStyle">
                    Želite li prijaviti nestanak osobe?
                </div>
                <div className="textStyle">
                    {process.env.API_BASE_URL + " " + process.env.REACT_APP_API_URL}
                </div>
                <Button variant="contained" href="#prijava-nestale-osobe" color="secondary">
                    PRIJAVI
                </Button>
            </div>
        </Box>
        
      </div>
    );

    
}

export default HomePage;