import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import { Link as RouterLink } from "react-router-dom";


 const headersData = [
    {
        label: "Prijava", 
        href: "/login",
    }, 
    {
        label: "Registracija", 
        href: "/register",
    },
 ];

export default function Header() {

    const displayDesktop = () => {
        return (
            <Toolbar>
                {mapTaskerLogo}
                {getMenuButtons()}
            </Toolbar>
        );
    };

    const mapTaskerLogo = (
        <Typography variant="h6" component="h1"
        sx = {{
            fontFamily: "Work Sans, sans-serif",
            fontWeight: 750,
            flexGrow: 1,
            color: "#fff",
            marginLeft: "2rem",
        }}>
            Maptasker
        </Typography>
    );

    const getMenuButtons = () => {
        return headersData.map(({label, href}) => {
            return (
                <Button 
                {...{
                    key: label,
                    color: "inherit", 
                    to: href, 
                    component: RouterLink, 
                }}
                sx = {{
                    fontFamily: "Open Sans, sans-serif",
                    fontWeight: 500,
                    size: "18px",
                    marginRight: "2px",
                    '&:hover': {
                       backgroundColor: "#9500ae",
                       color: "#fff",
                    },
                }}>
                    {label}
                </Button>
                
            )
        })
    }


    return (
        <header>
            <AppBar sx={{
                backgroundColor: "transparent",
                flexGrow: 1,
            }}
            >{displayDesktop()}</AppBar>
        </header>
 
    );
}