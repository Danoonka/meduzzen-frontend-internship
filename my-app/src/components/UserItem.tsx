import React from 'react';
import {Link} from "react-router-dom";

const UserItem = (props: any) => {
    props = props.props

    return (
        <Link to='/userProfile' key={props.id} state={{data: props.id}}>
            <div className="user-item-container">
                <img src={props.user_avatar} alt="user avatar"/>
                <div>
                    <h4>{props.user_firstname} {props.user_lastname}</h4>
                    <p>Status: {props.user_status}</p>
                    <p>Location: {props.user_city}</p>
                </div>
            </div>
        </Link>
    );
};

export default UserItem;