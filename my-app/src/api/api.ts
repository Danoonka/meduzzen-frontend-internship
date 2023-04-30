import axios from "axios";
import {toast} from "react-toastify";

const instance = axios.create({
    baseURL: 'http://3.75.186.163',
    timeout: 1000,
});

export const HealthCheck = () => {
    setInterval(()=>
    instance.get('/')
        .then(function (response) {
            return ("Server with us now")
        })
        .catch(function (error) {
            let er
            if (error.response) {
                er ="Server feel sick, wait a second"
            } else if (error.request) {
                er = "Wow! Our server is not as fast as you!"
            } else {
                er = "Oops! Some technical troubles"
            }
            toast.error(er, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }), 60000);
};


