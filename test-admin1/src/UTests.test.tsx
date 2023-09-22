import {describe, expect, test} from '@jest/globals';
import {sum} from './sum';
import {render, fireEvent, screen, waitFor} from '@testing-library/react'
import {AdminContext , testDataProvider} from "react-admin";
import MyLayout from './MyLayout';
import React from 'react';

import { BrowserRouter } from "react-router-dom"; 
import MyLoginPage from './MyLoginPage';
import  MyLogoutButton from './MyLayout';
import {MyAppBar } from './MyAppBar';
import '@testing-library/jest-dom'
// import userEvent from '@testing-library/user-event'

// Mock the useLogout hook
// jest.mock('react-admin', () => ({
//   ...jest.requireActual('react-admin'),
//   useLogout: jest.fn(),
// }));

// import userEvent from '@testing-library/user-event'
// import { createMemoryHistory } from 'history'
// import '@testing-library/jest-dom';


describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});



describe("my app bar si esta plis ya", () => {
  test("appbar appear ", async () => {
    const { container } = render(
        <AdminContext>
          <MyAppBar />
      </AdminContext>
      );
    

  });

  const div = screen.getByText("MyAppBar");
  expect(div).toBeInTheDocument();

});


