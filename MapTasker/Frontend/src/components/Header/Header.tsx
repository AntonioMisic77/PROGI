import styled from "@emotion/styled";
import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useUserData } from "../../hooks/useUserData";

import "./Header.css"

 const headersDataNotLoggedIn = [
    {
        label: "Nestale osobe",
        href: "/missing-reports"
    },
    {
        label: "Prijava", 
        href: "/login",
    }, 
    {
        label: "Registracija", 
        href: "/register",
    }, 
    
 ];

 const headersDataLoggedIn = [
    {
        label: "Nestale osobe",
        href: "/missing-reports"
    },
    {
        label: "Uredi profil",
        href: "/profile", 
        className: "not-visible",
        
    },
    {
        label: "Odjava", 
        href: ""
    },
    
 ];


export default function Header() {

    const [show, setShow] = useState(true);

    let {user, userLoaded} = useUserData();

    console.log(userLoaded)

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
        if(!userLoaded){
            return headersDataNotLoggedIn.map(({label, href}) => {
                
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
                        }}
                        >
                            {label}
                        </Button>
                        
                    )
            })
        } else {
            return headersDataLoggedIn.map(({label, href}) => {
                
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
                    }}
                    >
                        {label}
                    </Button>
                    
                )
            })
        }
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