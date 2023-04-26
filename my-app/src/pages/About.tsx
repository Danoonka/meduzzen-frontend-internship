import React from 'react';
import './About.css'
import Main from "../components/Main";
import aboutPageUsersImg from '../assets/about-page-users-img.png'
import aboutPageCompanyImg from '../assets/about-page-company-img.png'


const About = () => {
    return (
        <div>
            <Main>
                <h1 className="main-page-heading">About US!</h1>
                <p className="about-page-description">Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
                    not only five centuries, but also the leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
                    Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum.
                </p>
            </Main>
            <div className='about-page-users'>
                <h2>Base of employees</h2>
                <div className="about-page-users-container">
                    <img src={aboutPageUsersImg} alt="about-page-users-img" className='about-page-users-img'/>
                    <div className="about-page-users-description">
                        <p>More then 5 000 of candidates</p>
                        <p>With their rate and points. Let`s study and work with us!</p>
                    </div>
                </div>
            </div>
            <div className='about-page-companies'>
                <h2>Base of companies</h2>
                <div className="about-page-users-container">
                   <div className="about-page-companies-description">
                       <p>More then 800 potential employers</p>
                       <p>Let`s find one for you!</p>
                   </div>
                    <img src={aboutPageCompanyImg} alt="about-page-company-img" className='about-page-companies-img'/>
                </div>
                
            </div>
        </div>

    );
};

export default About;