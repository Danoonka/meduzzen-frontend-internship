import React from 'react';
import './Button.css'


const Button = ({children}: { children: React.ReactNode }) => {
    return (
        <button className="universal-button">{children}</button>
    );
};

export default Button;