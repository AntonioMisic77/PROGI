import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import UserContextProvider from "../../store/UserContextProvider";

import "./LoginPage.css"

const LoginPage = () => {
   return (
      <div className="login-page">
         <LoginForm/>
      </div>
   );
}
 
export default LoginPage;