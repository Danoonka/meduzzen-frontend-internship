import React from 'react';
import './MainPage.css'
import Main from "../components/Main";
import Button from "../utils/Button";
import {useDispatch} from "react-redux";
import {decrement, increment} from "../store/actions";
import {store} from "../store/store";






const MainPage = () => {

    const testNumber = store.getState().counter.testNumber
    const dispatch = useDispatch();

    return (
        <Main>
            <h1 className="main-page-heading">{process.env.REACT_APP_NAME}</h1>
            <p className="main-page-greeting">Hello intern! Are you ready to check your skills?</p>
            <p className="main-page-greeting">Let`s go started!</p>
            <div className="button-click">
                <Button onClick={() => dispatch(increment())}>Increment</Button>
                <Button onClick={() => dispatch(decrement())}>Decrement</Button>
            </div>
            <h2>Test Number: {testNumber}</h2>
        </Main>


    );
};

export default MainPage;