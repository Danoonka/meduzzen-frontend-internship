import React, {useEffect, useState} from 'react';
import {AllCompaniesState, initialAllCompaniesState, Rating, UserProps} from "../../types";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {
    getCompanyByIdThunk,
    getRatingAnalyticInCompanyThunk, getUserByIdThunk,
    myCompanyListThunk
} from "../../store/reduxThunk";
import Chart from "../../utils/Chart";


const CompanyForUser = ({user_id}: UserProps) => {
    const [company, setCompany] = React.useState('');
    const [ratingCompany, setRatingCompany] = useState<AllCompaniesState>(initialAllCompaniesState);
    const [rating, setRating] = useState<Rating[]>([])
    const [companyNameArr, setCompanyNameArr] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setCompany(event.target.value as string);
    };

    useEffect(() => {
        const companyIDs = ratingCompany.companies.map((entry) => entry.company_id);
        getCompaniesNames(companyIDs);
    }, [ratingCompany]);

    const getCompaniesNames = async (companyIDs: number[]) => {
        const namePromises = companyIDs.map((id) => {
                if (id >= 0) {
                    return getCompanyByIdThunk(id).then(res => res.result.company_name)
                }
            }
        );
        const names = await Promise.all(namePromises);
        setCompanyNameArr(names);
    };

    useEffect(() => {
        myCompanyListThunk(user_id).then((res) => {
            setRatingCompany(res.result);
        });
    }, [ratingCompany.companies.length]);


    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
        const company_id = event.currentTarget.getAttribute('data-value')
        getRatingAnalyticInCompanyThunk(user_id, Number(company_id))
            .then((res) => {
                setRating(res.result.rating);
            });
    }


    return (
        <div>
            <Box sx={{minWidth: 120,  mt: 5}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Company</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={company}
                        label="User"
                        onChange={handleChange}
                    >
                        {ratingCompany.companies.map((item, index) => {
                            return (
                                <MenuItem value={item.company_id} key={index}
                                          onClick={handleMenuItemClick}>{companyNameArr[index]}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Box>
            <Chart rating={rating} chartName="Rating for user in Company"/>
        </div>
    );
};

export default CompanyForUser;