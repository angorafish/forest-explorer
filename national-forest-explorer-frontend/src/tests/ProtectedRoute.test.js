import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import '@testing-library/jest-dom/extend-expect';
import jwtDecode from 'jwt-decode';

jest.mock('jwt-decode');

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders element when authenticated', () => {
    const token = 'valid.token';
    localStorage.setItem('token', token);
    jwtDecode.mockReturnValue({ user: 'test' });

    render(
      <MemoryRouter>
        <ProtectedRoute element={<div>Protected Content</div>} />
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    jwtDecode.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <ProtectedRoute element={<div>Protected Content</div>} />
      </MemoryRouter>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});