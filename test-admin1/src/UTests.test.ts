import {describe, expect, test} from '@jest/globals';
import {sum} from './sum';
import {render, fireEvent, screen} from '@testing-library/react'
import {AdminContext} from "react-admin";
import MyLayout from './MyLayout';
import React from 'react';
import { renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";


describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe('my layout',() => {
  test('Logout button', async () => {
  // render(<MyLayout>);
  // fireEvent.click(screen.getByText('Click me'))
  //   expect();
})});

