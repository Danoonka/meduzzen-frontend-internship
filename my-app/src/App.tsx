import React from 'react';
import './App.css';
import MainPage from "./pages/MainPage";
import Mock from "./components/Mock";
import About from "./pages/About";
import UserList from "./pages/UserList";
import CompanyList from "./pages/CompanyList";
import UserRegistration from "./pages/UserRegistration";
import { Route, Routes, Navigate } from "react-router-dom"
import UserAuthorization from "./pages/UserAuthorization";
import UserProfile from "./pages/UserProfile";
import CompanyProfile from "./pages/CompanyProfile";
import NotFound from "./pages/NotFound";

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
              <Route path="/404" element={ <NotFound/>}/>
              <Route path="/*" element={ <Navigate to="/404"/>}/>

          </Routes>
      </Mock>
  );
}

export default App;
