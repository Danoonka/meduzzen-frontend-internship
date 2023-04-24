import React from 'react';
import './MainPage.css'

const MainPage = () => {
    return (
        <main>
            <div className="main-page">
                <h1 className="main-page-heading">{process.env.REACT_APP_NAME}</h1>
                <p className="main-page-greeting">Hello intern! Are you ready to check your skills?</p>
                <p className="main-page-greeting">Let`s go started!</p>
            </div>
            <svg className='main-page-wave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#ffffff"
                      fillOpacity="1"
                      d="M0,224L80,186.7C160,149,320,75,480,74.7C640,75,800,149,960,197.3C1120,245,1280,267,1360,277.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                />
            </svg>
        </main>

    );
};

export default MainPage;