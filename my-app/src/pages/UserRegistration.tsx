import React, {useState} from 'react';
import Input from "../utils/Input";
import './UserRegistration.css'

const UserRegistration = () => {
    const registrationFields = ["Email", "Password", "Repeat Password", "First Name", "Last Name"]

    const fields = registrationFields.map(item =>
        <Input name={item} label={item}/>
    )
    return (
        <div className="input-container">
            <h2>Create account</h2>
            <form action="submit">
                {fields}
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};

export default UserRegistration;