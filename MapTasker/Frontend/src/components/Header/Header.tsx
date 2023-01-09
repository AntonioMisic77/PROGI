import styled from "@emotion/styled";
import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import { useState } from "react";
import { Link, Link as RouterLink, Navigate, useLocation } from "react-router-dom";
import { useUserData } from "../../hooks/useUserData";
import { useNavigate } from 'react-router-dom';



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
        label: "Karta", 
        href: "/operations"
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

    let {user, setUser, userLoaded} = useUserData();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    console.log(userLoaded)
    console.log(user)

    const displayDesktop = () => {
        return (
            <Toolbar>
                {mapTaskerLogo}
                {getMenuButtons()}
            </Toolbar>
        );
    };

    const logout = () => {

    }

    const mapTaskerLogo = (
        <Typography variant="h6" component="h1"
        sx = {{
            fontFamily: "Work Sans, sans-serif",
            fontWeight: 750,
            flexGrow: 1,
            color: '#fff',
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
                            backgroundColor: pathname === "/" ? "#9500ae" : "#039be5",
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
                        onClick = {() => {
                            if(label === "Odjava") {
                                localStorage.removeItem('Bearer token');
                                navigate("/");
                                window.location.reload();
                            }
                        }}
                        sx = {{
                            fontFamily: "Open Sans, sans-serif",
                            fontWeight: 500,
                            size: "18px",
                            marginRight: "2px",
                            '&:hover': {
                            backgroundColor: pathname === "/" ? "#9500ae" : "#039be5",
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
                backgroundColor: pathname === '/' ? 'transparent' : '#01579b',
                flexGrow: 1,
                height: pathname === '/' ? 'default' : '50px',
                justifyContent: "center"

            }}
            >{displayDesktop()}</AppBar>
        </header>
 
    );
}