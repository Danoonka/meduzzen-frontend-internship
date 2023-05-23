import React, {ReactNode, useState} from 'react';
import {UserProps} from '../../types';
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import GlobalForUser from "./GlobalForUser";
import CompanyForUser from "./CompanyForUser";
import QuizzesForUser from "./QuizzesforUser";


const UserProfileAnalytics = ({user_id}: UserProps) => {
    const [type, setType] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

    const [currentElement, setCurrentElement] =
        useState<ReactNode>(<></>);

    const menuHandler = (value: string) => {
        switch (value) {
            case 'global':
                setCurrentElement(<GlobalForUser user_id={user_id}/>);
                return;
            case 'company':
                setCurrentElement(<CompanyForUser user_id={user_id}/>);
                return;
            case 'quizzes':
                setCurrentElement(<QuizzesForUser user_id={user_id}/>);
                return;
        }
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {

        const menuItemValue = event.currentTarget.getAttribute('data-value');
        if (menuItemValue) {
            menuHandler(menuItemValue);
        }
    };

    return (
        <>
            <Box sx={{minWidth: 120,  mt: 5}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Type"
                        onChange={handleChange}
                    >
                        <MenuItem value={'global'} onClick={handleMenuItemClick}>Global</MenuItem>
                        <MenuItem value={'company'} onClick={handleMenuItemClick}>Company</MenuItem>
                        <MenuItem value={'quizzes'} onClick={handleMenuItemClick}>Quiz</MenuItem>
                    </Select>
                </FormControl>
                {currentElement && (
                    <div>
                        {currentElement}
                    </div>
                )}
            </Box>
        </>
    );
};

export default UserProfileAnalytics;


