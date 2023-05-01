import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button className="universal-button" {...props}>
            {children}
        </button>
    );
};

export default Button;