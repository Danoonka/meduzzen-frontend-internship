import React, {ReactNode, useEffect, useState} from 'react';
import {RootState} from "../../store/store";
import Button from "../../utils/Button";
import '../../utils/Input.css'
import {useNavigate} from "react-router-dom";
import './UserContainer.css'
import {useSelector} from "react-redux";
import {
    changeUserAvatarThunk,
    getGlobalRatingThunk,
    getLastAnswersCsvForUserThunk,
    getUserByIdThunk
} from "../../store/reduxThunk";
import UserProfileCompanyList from "./UserProfileCompanyList";
import UserProfileInvites from "./UserProfileInvites";
import UserProfileRequests from "./UserProfileRequests";
import SendRequestModal from "../modalWindows/SendRequestModal";
import {UserProps} from "../../types";
import UserProfileQuizzes from "./UserProfileQuizzes";
import UserProfileAnalytics from "./UserProfileAnalytics";


const UserContainer = ({user_id}: UserProps) => {
    const currentUser = useSelector((state: RootState) => state.currentUser);
    const user = useSelector((state: RootState) => state.userById);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const [starsCount, setStarsCount] = useState(0); // moved up

    useEffect(() => {
        const fetchData = async () => {
            await getUserByIdThunk(user_id);
            getGlobalRatingThunk(user_id).then(res => setStarsCount(res.result.rating))
        };

        fetchData();
    }, [user_id]);
    const [currentElement, setCurrentElement] = useState<ReactNode>(<></>)
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const isOwner = user.user_id === currentUser.user_id


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedFile) {
            await changeUserAvatarThunk(user.user_id, selectedFile)
        }
        window.location.reload();
    };

    const goToEditUser = () => {
        navigate('/editUser')
    }

    const download = () => {
        getLastAnswersCsvForUserThunk(user.user_id)
    }

    const menuHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const btn = event.target as HTMLButtonElement
        switch (btn.name) {
            case 'my-companies':
                setCurrentElement(<UserProfileCompanyList user_id={user.user_id}/>)
                return
            case 'invites':
                setCurrentElement(<UserProfileInvites user_id={user.user_id}/>)
                return
            case 'requests':
                setCurrentElement(<UserProfileRequests user_id={user.user_id}/>)
                return
            case 'quizzes':
                setCurrentElement(<UserProfileQuizzes user_id={user.user_id}/>)
                return
            case 'analytics':
                setCurrentElement(<UserProfileAnalytics user_id={user.user_id}/>)
                return
        }
    }

    const stars = [];

    for (let i = 0; i < Math.trunc(starsCount / 20); i++) {
        stars.push(<span className="star" key={i}>&#9733;</span>);
    }

    return (
        <div className="container">
            <div className="user-profile-container">
                <div className="user-profile-image-container">
                    <img src={user.user_avatar} alt="user avatar"/>
                    {isOwner &&
                    <form onSubmit={handleFormSubmit}>
                        <input type="file" onChange={handleFileChange}/>
                        <Button type="submit">Upload</Button>
                    </form>}
                </div>
                <div>
                    <h2>{user.user_firstname} {user.user_lastname}</h2>
                    <p>Email: {user.user_email}</p>
                    <p>Status: {user.user_status}</p>
                    <p>Location: {user.user_city}</p>
                    <p>Contacts: {user.user_phone}</p>
                    {(user.user_links !== null) &&
                    <div><p>Links:</p> {user.user_links.map((item, idx) => <p key={idx}>{item}</p>)}</div>
                    }
                    <div>
                        <p> {stars} {starsCount + `%`}</p>
                    </div>
                    {isOwner &&
                    <>
                        <Button onClick={goToEditUser}>Edit Info</Button>
                        <Button onClick={toggle}>Send Request</Button>
                        <Button onClick={download}>Download Answers</Button>
                    </>}
                </div>
            </div>
            {isOwner &&
            <>
                <div className='parent'>
                    <div>
                        <Button onClick={menuHandler} name='my-companies'>My Companies</Button>
                        <Button onClick={menuHandler} name='invites'>Invites</Button>
                        <Button onClick={menuHandler} name='requests'>Requests</Button>
                        <Button onClick={menuHandler} name='quizzes'>Quizzes</Button>
                        <Button onClick={menuHandler} name='analytics'>Analytics</Button>
                        <div>
                            {currentElement}
                        </div>
                    </div>
                </div>
                <SendRequestModal isOpen={isOpen} toggle={toggle}/>
            </>
            }
        </div>
    );
};

export default UserContainer;