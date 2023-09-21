import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MyLoginPage from './MyLoginPage'; // Asegúrate de que esta importación sea correcta

test('redirige al usuario al hacer clic en el botón con campos llenos', () => {
  const { getByLabelText, getByText } = render(<MyLoginPage />);

  // Rellenar el formulario
  const emailInput = getByLabelText(/email/i);
  const passwordInput = getByLabelText(/password/i);

  fireEvent.change(emailInput, { target: { value: 'correo@falso.com' } });
  fireEvent.change(passwordInput, { target: { value: 'contraseña-falsa' } });

  // Hacer clic en el botón
  const loginButton = getByText(/login/i);
  fireEvent.click(loginButton);

  // Aquí puedes realizar una aserción para verificar la redirección, por ejemplo:
  // expect(window.location.pathname).toBe('/dashboard');
});

test('no redirige al usuario si los campos están vacíos', () => {
  const { getByText } = render(<MyLoginPage />);

  // Dejar los campos vacíos

  // Hacer clic en el botón
  const loginButton = getByText(/login/i);
  fireEvent.click(loginButton);

  // Aquí puedes realizar una aserción para verificar que no ocurra una redirección, por ejemplo:
  // expect(window.location.pathname).toBe('/');
});
