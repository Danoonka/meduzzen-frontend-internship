import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://3.75.186.163',
    timeout: 1000,
});



