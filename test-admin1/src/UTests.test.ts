import {describe, expect, test} from '@jest/globals';
import {sum} from './sum';
import {render, fireEvent, screen} from '@testing-library/react'
import {AdminContext} from "react-admin";
import MyLayout from './MyLayout';
import React from 'react';
import { renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom"; 

// Mock the useLogout hook
// jest.mock('react-admin', () => ({
//   ...jest.requireActual('react-admin'),
//   useLogout: jest.fn(),
// }));


describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});



// describe("my layout", () => {
//   it("Logout button", async () => {
//     render(
//       <AdminContext>
//         <MyLayout />
//       </AdminContext>
//     );
//   });
// });


