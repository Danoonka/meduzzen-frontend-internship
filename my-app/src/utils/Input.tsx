import React, {ChangeEvent, FC, InputHTMLAttributes} from 'react';
import './Input.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    label: string;
    value: string;
    type: string;
    id: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;

}


const Input: FC<InputProps> = ({name, label, value, id, type, onChange, ...rest}) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input id={id} className="default-input" onChange={onChange} name={name} {...rest}/>
        </>
    );
};

export default Input;