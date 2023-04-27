import React from 'react';
import {useLocation} from "react-router-dom";
import './UserProfile.css'
import aboutPageCompanyImg from "../assets/about-page-company-img.png";
import UserContainer from "../components/UserContainer";

const userList = [
    {id: 0,  "user_email": "string", "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string", "user_phone": "string"},
    {id: 1,  "user_email": "string", "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string", "user_phone": "string"},
    {id: 2,  "user_email": "string", "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string", "user_phone": "string"},
    {id: 3,  "user_email": "string", "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string", "user_phone": "string"},
    {id: 4,  "user_email": "string", "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string", "user_phone": "string"},
    {id: 5,  "user_email": "string", "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string", "user_phone": "string"},
    {id: 6,  "user_email": "string", "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string", "user_phone": "string"},
]

const UserProfile = () => {
    const location = useLocation()
    const {data} = location.state

    const userData =  userList.find(obj => obj.id === data);

    return(
        <div>
            {userData && <UserContainer userData={userData}/>}
        </div>
    )

};

export default UserProfile;