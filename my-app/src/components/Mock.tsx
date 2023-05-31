import React from 'react';
import NavBar from "./NavBar";
import Footer from "./Footer";

const Mock = ({ children }: { children: React.ReactNode }) => {

    return (
        <div>
            <NavBar/>
            {children}
            <Footer/>
        </div>
    );
};

export default Mock;