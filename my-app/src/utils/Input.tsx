import React, {FC, InputHTMLAttributes} from 'react';
import './Input.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    label: string;
}


const Input: FC<InputProps> = ({name, label, ...rest}) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input id={name} className="default-input" type="text"{...rest}/>
        </>
    );
};

export default Input;