import React from 'react';
import {Link} from "react-router-dom";

const CompanyItem = (props: any) => {
    props = props.props
    console.log(props)
    return (
        <Link to='/companyProfile' key={props.id} state={{data: props.id}}>
            <div className="user-item-container">
                <img src={props.company_avatar} alt="company avatar"/>
                <div>
                    <h4>{props.company_name}</h4>
                    <p>Location: {props.company_city}</p>
                </div>
            </div>
        </Link>
    );
};

export default CompanyItem;