import React, {ReactNode, useState} from 'react';
import {CompanyItemProps} from '../../types';
import SummaryForCompany from "./SummaryForCompany";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import SummaryForEveryMember from "./SummaryForEveryMember";
import SummaryForEveryQuiz from "./SummaryForEveryQuiz";

const CompanyProfileAnalytics = ({companyData}: CompanyItemProps) => {
    const [type, setType] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

    const [currentElement, setCurrentElement] =
        useState<ReactNode>(<></>);

    const menuHandler = (value: string) => {
        switch (value) {
            case 'summary':
                setCurrentElement(<SummaryForCompany companyData={companyData}/>);
                return;
            case 'members':
                setCurrentElement(<SummaryForEveryMember companyData={companyData}/>);
                return;
            case 'quizzes':
                setCurrentElement(<SummaryForEveryQuiz companyData={companyData}/>);
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
                        <MenuItem value={'summary'} onClick={handleMenuItemClick}>Users</MenuItem>
                        <MenuItem value={'members'} onClick={handleMenuItemClick}>User</MenuItem>
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

export default CompanyProfileAnalytics;

export function generateColors(count: number) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const color = `rgb(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()})`;
        colors.push(color);
    }
    return colors;
}

function getRandomValue() {
    return Math.floor(Math.random() * 256);
}
