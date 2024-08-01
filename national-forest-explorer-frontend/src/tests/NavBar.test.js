import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NavBar from './NavBar';
import { MemoryRouter } from 'react-router-dom';
import axios from '../services/axiosConfig';
import socket from '../services/socketConfig';

jest.mock('../services/axiosConfig');
jest.mock('../services/socketConfig');

const mockCurrentUser = {
  username: 'user1',
  profilePicture: '/profile.jpg'
};

describe('NavBar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props) => {
    return render(
      <MemoryRouter>
        <NavBar {...props} />
      </MemoryRouter>
    );
  };

  it('should render the NavBar component', () => {
    renderComponent({ currentUser: null, setCurrentUser: jest.fn(), logout: jest.fn(), notificationCount: 0, setNotificationCount: jest.fn() });
    expect(screen.getByText('Login/Signup')).toBeInTheDocument();
  });

  it('should display profile picture and dropdown menu for logged in user', async () => {
    renderComponent({ currentUser: mockCurrentUser, setCurrentUser: jest.fn(), logout: jest.fn(), notificationCount: 0, setNotificationCount: jest.fn() });

    fireEvent.click(screen.getByAltText('Profile'));
    await waitFor(() => {
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Notifications')).toBeInTheDocument();
      expect(screen.getByText('Saved')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });
  });

  it('should handle logout correctly', async () => {
    const setCurrentUserMock = jest.fn();
    const navigateMock = jest.fn();
    renderComponent({ currentUser: mockCurrentUser, setCurrentUser: setCurrentUserMock, logout: jest.fn(), notificationCount: 0, setNotificationCount: jest.fn(), navigate: navigateMock });

    fireEvent.click(screen.getByAltText('Profile'));
    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => {
      expect(setCurrentUserMock).toHaveBeenCalledWith(null);
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });

  it('should fetch notifications count for logged in user', async () => {
    axios.get.mockResolvedValue({ data: [{ status: 'unread' }, { status: 'unread' }] });
    const setNotificationCountMock = jest.fn();
    renderComponent({ currentUser: mockCurrentUser, setCurrentUser: jest.fn(), logout: jest.fn(), notificationCount: 0, setNotificationCount: setNotificationCountMock });

    await waitFor(() => {
      expect(setNotificationCountMock).toHaveBeenCalledWith(2);
    });
  });

  it('should update notifications count on new notification', async () => {
    const setNotificationCountMock = jest.fn();
    renderComponent({ currentUser: mockCurrentUser, setCurrentUser: jest.fn(), logout: jest.fn(), notificationCount: 0, setNotificationCount: setNotificationCountMock });

    socket.emit('new_notification', { type: 'friend_request' });

    await waitFor(() => {
      expect(setNotificationCountMock).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});