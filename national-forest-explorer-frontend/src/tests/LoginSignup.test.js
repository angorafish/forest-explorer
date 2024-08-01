import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginSignup from './LoginSignup';
import axios from '../services/axiosConfig';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../services/axiosConfig');

describe('LoginSignup', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props) => {
    return render(
      <MemoryRouter>
        <LoginSignup {...props} />
      </MemoryRouter>
    );
  };

  it('should render the login form by default', () => {
    renderComponent({ setCurrentUser: jest.fn() });
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should switch to signup form when signup button is clicked', () => {
    renderComponent({ setCurrentUser: jest.fn() });
    fireEvent.click(screen.getByText('Signup'));
    expect(screen.getByText('Signup')).toBeInTheDocument();
  });

  it('should display an error when passwords do not match during signup', () => {
    renderComponent({ setCurrentUser: jest.fn() });
    fireEvent.click(screen.getByText('Signup'));
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'different' } });
    fireEvent.click(screen.getByText('Signup'));

    expect(screen.getByText('Passwords do not match!')).toBeInTheDocument();
  });

  it('should call the login API and set the current user on successful login', async () => {
    axios.post.mockResolvedValue({ data: { token: 'fake-token', user: { username: 'user1' } } });
    const setCurrentUserMock = jest.fn();

    renderComponent({ setCurrentUser: setCurrentUserMock });
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user1' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/auth/login', { username: 'user1', password: 'password' });
      expect(setCurrentUserMock).toHaveBeenCalledWith({ username: 'user1' });
    });
  });

  it('should call the signup API and set the current user on successful signup', async () => {
    axios.post.mockResolvedValue({ data: { token: 'fake-token', user: { username: 'newuser' } } });
    const setCurrentUserMock = jest.fn();

    renderComponent({ setCurrentUser: setCurrentUserMock });
    fireEvent.click(screen.getByText('Signup'));
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Signup'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/auth/signup', { username: 'newuser', email: 'test@example.com', password: 'password' });
      expect(setCurrentUserMock).toHaveBeenCalledWith({ username: 'newuser' });
    });
  });

  it('should display an error message on failed login', async () => {
    axios.post.mockRejectedValue({ response: { data: { error: 'Invalid credentials' } } });
    renderComponent({ setCurrentUser: jest.fn() });

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user1' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('should display an error message on failed signup', async () => {
    axios.post.mockRejectedValue({ response: { data: { error: 'Email already in use' } } });
    renderComponent({ setCurrentUser: jest.fn() });

    fireEvent.click(screen.getByText('Signup'));
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Signup'));

    await waitFor(() => {
      expect(screen.getByText('Email already in use')).toBeInTheDocument();
    });
  });
});