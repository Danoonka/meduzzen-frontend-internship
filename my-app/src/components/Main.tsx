import React from 'react';

const Main = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className="main-page">
                {children}
                <svg className='main-page-wave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#ffffff"
                          fillOpacity="1"
                          d="M0,224L80,186.7C160,149,320,75,480,74.7C640,75,800,149,960,197.3C1120,245,1280,267,1360,277.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Main;