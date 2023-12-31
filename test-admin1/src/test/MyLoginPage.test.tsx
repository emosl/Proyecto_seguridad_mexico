//imports from react-admin,jest and react
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import MyLoginPage from '../Pages/MyLoginPage'; 
import { AdminContext } from 'react-admin';

//test for the MyLoginPage component
test('se revisa que el input de email y de password esten definidos en el componente MyLoginPage', () => {
  const { container } = render(
    <AdminContext>
      <MyLoginPage />
  </AdminContext>
  );

  // Rellenar el formulario
  const emailInput = container.querySelector('.input-email')
  const passwordInput = container.querySelector('.input-pw')

  expect(emailInput).toBeDefined();
  expect(passwordInput).toBeDefined();


});

//test for the MyLoginPage component
test('Se revisa que se despleiga el componente MyloginPage', () => {
    render(
    <AdminContext>
      <MyLoginPage />
  </AdminContext>
  );


  const div = screen.getByText('My Login Page')
  expect(div).toBeInTheDocument();


});


