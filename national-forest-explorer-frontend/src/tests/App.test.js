import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, AuthContext } from '../features/authentication/AuthContext';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import socket from '../services/socketConfig';
import axios from '../services/axiosConfig';

// Mock axios module
jest.mock('../services/axiosConfig', () => ({
  get: jest.fn(),
}));

// Mock the socketConfig module
jest.mock('../services/socketConfig', () => ({
  emit: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
}));

describe('App Component', () => {
  test('renders Home page by default', () => {
    render(
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    );
    const homeElement = screen.getByText(/home/i);
    expect(homeElement).toBeInTheDocument();
  });

  test('renders LoginSignup component when navigating to /login', () => {
    render(
      <Router initialEntries={['/login']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    );
    const loginElement = screen.getByText(/login/i);
    expect(loginElement).toBeInTheDocument();
  });

  test('redirects to login when accessing a protected route without authentication', () => {
    render(
      <Router initialEntries={['/profile/testuser']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    );
    const loginElement = screen.getByText(/login/i);
    expect(loginElement).toBeInTheDocument();
  });

  test('renders Profile component when authenticated and navigating to /profile/:username', () => {
    const mockAuthContext = {
      currentUser: { username: 'testuser' },
      setCurrentUser: jest.fn(),
      notificationCount: 0,
      setNotificationCount: jest.fn(),
    };

    render(
      <Router initialEntries={['/profile/testuser']}>
        <AuthContext.Provider value={mockAuthContext}>
          <App />
        </AuthContext.Provider>
      </Router>
    );
    const profileElement = screen.getByText(/testuser/i);
    expect(profileElement).toBeInTheDocument();
  });

  test('renders Explore component when navigating to /explore', () => {
    render(
      <Router initialEntries={['/explore']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    );
    const exploreElement = screen.getByText(/explore/i);
    expect(exploreElement).toBeInTheDocument();
  });

  test('renders PostDetails component when navigating to /posts/:id', () => {
    render(
      <Router initialEntries={['/posts/1']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    );
    const postDetailsElement = screen.getByText(/post details/i);
    expect(postDetailsElement).toBeInTheDocument();
  });

  test('renders Saved component when authenticated and navigating to /saved', () => {
    const mockAuthContext = {
      currentUser: { username: 'testuser' },
      setCurrentUser: jest.fn(),
      notificationCount: 0,
      setNotificationCount: jest.fn(),
    };

    render(
      <Router initialEntries={['/saved']}>
        <AuthContext.Provider value={mockAuthContext}>
          <App />
        </AuthContext.Provider>
      </Router>
    );
    const savedElement = screen.getByText(/saved/i);
    expect(savedElement).toBeInTheDocument();
  });

  test('increments notification count when new notification is received', () => {
    const mockAuthContext = {
      currentUser: { username: 'testuser' },
      setCurrentUser: jest.fn(),
      notificationCount: 0,
      setNotificationCount: jest.fn(),
    };

    render(
      <Router initialEntries={['/']}>
        <AuthContext.Provider value={mockAuthContext}>
          <App />
        </AuthContext.Provider>
      </Router>
    );

    // Simulate receiving a new notification
    socket.on.mock.calls[0][1]();

    expect(mockAuthContext.setNotificationCount).toHaveBeenCalledWith(expect.any(Function));
  });
});