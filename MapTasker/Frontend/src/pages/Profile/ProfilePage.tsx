import * as React from 'react';
import "./ProfilePage.css"
import EditProfile from "../../components/EditProfile/EditProfile";


const ProfilePage = () => {
    return (
       <div className="profile-page">
          <EditProfile/>
       </div>
    );
 }
  
 export default ProfilePage;

