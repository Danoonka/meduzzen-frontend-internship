import React, {useEffect, useState} from 'react';
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
import {useAuth0} from "@auth0/auth0-react";
import {store} from "./store/store";
import {getTokenFromLocalStorage} from "./utils/authorizaton";
import {authTrue, checkAuth} from "./store/actions";
import {useDispatch} from "react-redux";



function App() {
    const {isAuthenticated} = useAuth0()
    const [isAuthenticatedLog, setIsAuthenticatedLog] = useState(store.getState().isAuthorised.isAuthorised);
    const dispatch = useDispatch()
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setIsAuthenticatedLog(store.getState().isAuthorised.isAuthorised);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const afterUpdate = async () =>{
        const token = getTokenFromLocalStorage()
        if (token){
            await checkAuth(token)
            store.dispatch(authTrue())
        }
    }

    afterUpdate()

    console.log(isAuthenticatedLog)
    return (

        <Mock >
            {(isAuthenticated || isAuthenticatedLog)
                ?
                    (<Routes>
                        <Route path="/meduzzen-demo" element={<MainPage />}/>
                        <Route path="/about" element={ <About/>}/>
                        <Route path="/userList" element={ <UserList/>}/>
                        <Route path="/userProfile" element={ <UserProfile/>}/>
                        <Route path="/companyList" element={ <CompanyList/>}/>
                        <Route path="/companyProfile" element={ <CompanyProfile/>}/>
                        <Route path="/404" element={ <NotFound/>}/>
                        <Route path="/*" element={ <Navigate to="/meduzzen-demo"/>}/>
                    </Routes>)
                    :
                    (<Routes>
                        <Route path="/meduzzen-demo" element={<MainPage />}/>
                        <Route path="/about" element={ <About/>}/>
                        <Route path="/userRegistration" element={ <UserRegistration/>}/>
                        <Route path="/userAuthorization" element={ <UserAuthorization/>}/>
                        <Route path="/404" element={ <NotFound/>}/>
                        <Route path="/*" element={ <Navigate to="/meduzzen-demo"/>}/>
                    </Routes>)
            }

      </Mock>);
}

export default App;
