import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import CompanyContainer from '../components/companyProfile/CompanyContainer';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../store/store";

describe('CompanyContainer', () => {
    test('renders company information correctly', () => {
        const companyProps = {
            company_id: 1,
        };

        const {getByText} = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CompanyContainer {...companyProps} />
                </BrowserRouter>
            </Provider>
        );

        expect(getByText('Company Title:')).toBeInTheDocument();
        expect(getByText('Company description:')).toBeInTheDocument();
        expect(getByText('Location:')).toBeInTheDocument();
        expect(getByText('Contacts:')).toBeInTheDocument();
    });

    test('renders CompanyProfileInvites when "Invites" button is clicked', () => {
        const companyProps = {
            company_id: 1,
        };

        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CompanyContainer {...companyProps} />
                </BrowserRouter>
            </Provider>
        );

        const invitesButton = getByText('Invites');
        fireEvent.click(invitesButton);

        const invitesComponent = getByTestId('company-profile-invites');
        expect(invitesComponent).toBeInTheDocument();
    });

    test('renders CompanyProfileMembers when "Members" button is clicked', () => {
        const companyProps = {
            company_id: 1,
        };

        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CompanyContainer {...companyProps} />
                </BrowserRouter>
            </Provider>
        );

        const membersButton = getByText('Members');
        fireEvent.click(membersButton);

        const membersComponent = getByTestId('company-profile-members');
        expect(membersComponent).toBeInTheDocument();
    });

    test('renders CompanyProfileRequests when "Requests" button is clicked', () => {
        const companyProps = {
            company_id: 1,
        };

        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CompanyContainer {...companyProps} />
                </BrowserRouter>
            </Provider>
        );

        const requestsButton = getByText('Requests');
        fireEvent.click(requestsButton);

        const requestsComponent = getByTestId('company-profile-requests');
        expect(requestsComponent).toBeInTheDocument();
    });

    test('renders CompanyProfileRequests when "blockList" button is clicked', () => {
        const companyProps = {
            company_id: 1,
        };

        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CompanyContainer {...companyProps} />
                </BrowserRouter>
            </Provider>
        );

        const blockListButton = getByText('Block List');
        fireEvent.click(blockListButton);

        const blockListComponent = getByTestId('company-profile-blockList');
        expect(blockListComponent).toBeInTheDocument();
    });

    test('renders CompanyProfileRequests when "admins" button is clicked', () => {
        const companyProps = {
            company_id: 1,
        };

        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CompanyContainer {...companyProps} />
                </BrowserRouter>
            </Provider>
        );

        const adminsButton = getByText('Admins');
        fireEvent.click(adminsButton);

        const adminsComponent = getByTestId('company-profile-admins');
        expect(adminsComponent).toBeInTheDocument();
    });

    test('renders CompanyProfileRequests when "Quizzes" button is clicked', () => {
        const companyProps = {
            company_id: 1,
        };

        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CompanyContainer {...companyProps} />
                </BrowserRouter>
            </Provider>
        );

        const quizzesButton = getByText('Quizzes');
        fireEvent.click(quizzesButton);

        const quizzesComponent = getByTestId('company-profile-quizzes');
        expect(quizzesComponent).toBeInTheDocument();
    });

    test('renders CompanyProfileRequests when "Analytics" button is clicked', () => {
        const companyProps = {
            company_id: 1,
        };

        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CompanyContainer {...companyProps} />
                </BrowserRouter>
            </Provider>
        );

        const analyticsButton = getByText('Analytics');
        fireEvent.click(analyticsButton);

        const analyticsComponent = getByTestId('company-profile-analytics');
        expect(analyticsComponent).toBeInTheDocument();
    });

    test('opens Send Invite modal when "Send Invite" button is clicked', () => {
        const companyProps = {
            company_id: 1,
        };

        const {getByText, getByTestId} = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CompanyContainer {...companyProps} />
                </BrowserRouter>
            </Provider>);

        const sendInviteButton = getByText('Send Invite');
        const modal = getByTestId("send-invite-modal")
        fireEvent.click(sendInviteButton);

        expect(modal).toBeInTheDocument();
    });

});
