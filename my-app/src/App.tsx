import React from 'react';
import './App.css';
import MainPage from "./pages/MainPage";
import Mock from "./components/Mock";
import About from "./pages/About";
import UserList from "./pages/UserList";
import CompanyList from "./pages/CompanyList";
import UserRegistration from "./pages/UserRegistration";
import { Route, Routes } from "react-router-dom"
import UserAuthorization from "./pages/UserAuthorization";
import UserProfile from "./pages/UserProfile";
import CompanyProfile from "./pages/CompanyProfile";

function App() {
   
  return (

      <Mock>
          <Routes>
              <Route path="/" element={<MainPage />}/>
              <Route path="/about" element={ <About/>}/>
              <Route path="/userList" element={ <UserList/>}/>
              <Route path="/userProfile" element={ <UserProfile/>}/>
              <Route path="/companyList" element={ <CompanyList/>}/>
              <Route path="/companyProfile" element={ <CompanyProfile/>}/>
              <Route path="/userRegistration" element={ <UserRegistration/>}/>
              <Route path="/userAuthorization" element={ <UserAuthorization/>}/>
          </Routes>
      </Mock>
  );
}

export default App;
