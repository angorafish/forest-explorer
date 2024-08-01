import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { AuthContext } from '../features/authentication/AuthContext';
import mockAxiosInstance from '../services/axiosConfig';

jest.mock('../services/axiosConfig');

afterEach(() => {
    jest.clearAllMocks();
});

const renderWithRouter = (ui, { route = '/' } = {}) => {
    return render(
        <MemoryRouter initialEntries={[route]}>
            <AuthContext.Provider value={{ currentUser: { id: 1, username: 'testuser' }, setCurrentUser: jest.fn(), setNotificationCount: jest.fn() }}>
                {ui}
            </AuthContext.Provider>
        </MemoryRouter>
    );
};

describe('App Routing', () => {
    test('renders the OtherProfile component at /profile/:username when authenticated', async () => {
        mockAxiosInstance.get.mockResolvedValueOnce({ data: { username: 'otheruser' } });

        renderWithRouter(<App />, { route: '/profile/otheruser' });
        await waitFor(() => expect(screen.getByText(/Profile/i)).toBeInTheDocument());
    });

    test('renders the PostDetails component at /posts/:id', () => {
        renderWithRouter(<App />, { route: '/posts/1' });
        expect(screen.getByText(/Post Details/i)).toBeInTheDocument(); 
    });

    test('renders the Explore component at /explore', () => {
        renderWithRouter(<App />, { route: '/explore' });
        expect(screen.getByText(/Explore/i)).toBeInTheDocument(); 
    });

    test('renders the Settings component at /settings when authenticated', async () => {
        mockAxiosInstance.get.mockResolvedValueOnce({ data: { settings: true } });

        renderWithRouter(<App />, { route: '/settings' });
        await waitFor(() => expect(screen.getByText(/Settings/i)).toBeInTheDocument());
    });
});
