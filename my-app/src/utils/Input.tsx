import React from 'react';
import './Input.css'

const Input = (props: any) => {
    return (
        <>
            <label>{props.props}</label>
            <input className="default-input" type="text"/>
        </>
    );
};

export default Input;