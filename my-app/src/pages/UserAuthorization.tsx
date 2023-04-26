import React from 'react';
import Input from "../utils/Input";

const UserAuthorization = () => {
    return (
        <div className="input-container">
            <h2>Log in</h2>
            <form action="submit">
                <label>Email</label>
                <Input/>
                <label>Password</label>
                <Input/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};

export default UserAuthorization;