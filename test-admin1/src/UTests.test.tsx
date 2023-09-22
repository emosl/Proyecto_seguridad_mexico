import {sum} from './sum';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import {MyAppBar} from './MyAppBar'; 
import { AdminContext } from 'react-admin';
import MyLayout from './MyLayout';



// describe('sum module', () => {
//   test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
//   });
// });



// describe("my app bar si esta plis ya",  () => {
//   test("appbar appear ", async () => {
//     const { container } = render(
//         <AdminContext>
//           <MyAppBar />
//       </AdminContext>
//       );
    

//   });

//   const div = screen.getBy
//   expect(div).toBeInTheDocument();

// });

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



