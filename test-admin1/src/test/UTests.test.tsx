//imports from react-admin,jest and react
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import {MyAppBar} from '../components/MyAppBar'; 
import { AdminContext } from 'react-admin';
import MyLayout from '../Layout/MyLayout';
import userEvent from '@testing-library/user-event'


//test for the MyLayout component
test.todo ("Revisar Logout "), () => {
    render(
        <AdminContext>
            <MyLayout/>
        </AdminContext>
    );
        const logoutButton = screen.getByTestId('Logout');
        userEvent.click(logoutButton);
        expect(logoutButton).toBeInTheDocument();

}



