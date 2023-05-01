import React from 'react';
import Input from "../utils/Input";

const UserAuthorization = () => {
    const authorisationFields = ["Email", "Password"]
    const fields = authorisationFields.map(item =>
        <Input name={item} key={item} label={item}/>
    )
    return (
        <div className="input-container">
            <h2>Log in</h2>
            <form action="submit">
                {fields}
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};

export default UserAuthorization;