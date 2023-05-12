import React from 'react';
import './App.css';
import MainPage from "./pages/MainPage";
import Mock from "./components/Mock";
import About from "./pages/About";
import UserList from "./pages/UserList";
import CompanyList from "./pages/CompanyList";
import UserRegistration from "./pages/UserRegistration";
import {Route, Routes} from "react-router-dom"
import UserAuthorization from "./pages/UserAuthorization";
import UserProfile from "./pages/UserProfile";
import CompanyProfile from "./pages/CompanyProfile";
import {RootState, store} from "./store/store";
import {Navigate} from "react-router-dom";
import EditUser from "./components/EditUser";
import NotFound from "./pages/NotFound";
import {authTrue} from "./store/userActionCreators";
import {useSelector} from "react-redux";
import EditCompany from "./components/EditCompany";
import {checkAuthThunk} from "./store/reduxThunk";


function App() {
    const isAuthenticated = useSelector((state: RootState) => state.isAuthorised.isAuthorised);

    const afterUpdate = async () =>{
        if (await checkAuthThunk()){
            store.dispatch(authTrue())
        }
    }


    afterUpdate()

    return (

        <Mock>
            {(isAuthenticated)
                ?
                (<Routes>
                    <Route path="/meduzzen-demo" element={<MainPage/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/userList" element={<UserList/>}/>
                    <Route path="/userProfile" element={<UserProfile/>}/>
                    <Route path="/companyList" element={<CompanyList/>}/>
                    <Route path="/companyProfile" element={<CompanyProfile/>}/>
                    <Route path="/editUser" element={<EditUser/>}/>
                    <Route path="/editCompany" element={<EditCompany/>}/>
                    <Route path="/404" element={<NotFound/>}/>
                    <Route path="/" element={<Navigate to="/meduzzen-demo"/>}/>
                </Routes>)
                :
                (<Routes>
                    <Route path="/meduzzen-demo" element={<MainPage/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/userRegistration" element={<UserRegistration/>}/>
                    <Route path="/userAuthorization" element={<UserAuthorization/>}/>
                    <Route path="/404" element={<NotFound/>}/>
                    {/*<Route path="/*" element={ <Navigate to="/meduzzen-demo"/>}/>*/}
                    <Route path="/" element={<Navigate to="/meduzzen-demo"/>}/>
                </Routes>)
            }

        </Mock>)
};

export default App;
