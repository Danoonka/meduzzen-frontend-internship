import React from 'react';
import Input from "../utils/Input";

const UserAuthorization = () => {
    return (
        <div>
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