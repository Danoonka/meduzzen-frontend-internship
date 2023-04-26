import React, {useState} from 'react';
import Input from "../utils/Input";
import './UserRegistration.css'

const UserRegistration = () => {
    const [newUser, setNewUser] = useState({})
    return (
        <div className="input-container">
            <h2>Create account</h2>
            <form action="submit">
                <label>Email</label>
                <Input/>
                <label>Password</label>
                <Input/>
                <label>Repeat Password</label>
                <Input/>
                <label>First Name</label>
                <Input/>
                <label>Last Name</label>
                <Input/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};

export default UserRegistration;