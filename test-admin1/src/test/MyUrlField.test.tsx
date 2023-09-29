import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { AdminContext } from 'react-admin';
import MyUrlField from '../Layout/MyUrlField';

test("Se verifica que el componente URL field este bien definido", () => {
    const { container } = render(
      <AdminContext>
        <MyUrlField source="titulo"/>
    </AdminContext>
    );
  
    const link = container.querySelector('#link')
    expect(link).toBeDefined();
  });