import React from 'react';
import './MainPage.css'
import Main from "../components/Main";
import Button from "../utils/Button";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "../store/actions";


interface RootState {
    testNumber: number;
}

const MainPage = () => {

    const testNumber = useSelector<RootState, number>(state => state.testNumber);
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
            <p>Test Number: {testNumber}</p>
        </Main>


    );
};

export default MainPage;