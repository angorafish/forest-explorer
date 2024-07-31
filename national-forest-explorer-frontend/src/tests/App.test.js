import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import '@testing-library/jest-dom';
import axios from 'axios';

// Mock axios
jest.mock('axios');

afterEach(() => {
    jest.clearAllMocks();
});

const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(<MemoryRouter>{ui}</MemoryRouter>);
};

test('renders the Home component at the root path', async () => {
    renderWithRouter(<App />, { route: '/' });
    await waitFor(() => expect(screen.getByText(/Home/i)).toBeInTheDocument());
});

test('renders the LoginSignup component at /login', async () => {
    renderWithRouter(<App />, { route: '/login' });
    await waitFor(() => expect(screen.getByText(/Login/i)).toBeInTheDocument());
});

test('renders the Profile component at /profile/:username when authenticated', async () => {
    axios.get.mockResolvedValue({ data: { username: 'testuser' } }); // Mock data if needed

    renderWithRouter(<App />, { route: '/profile/testuser' });
    await waitFor(() => expect(screen.getByText(/Profile/i)).toBeInTheDocument());
});

test('renders the Settings component at /settings when authenticated', async () => {
    axios.get.mockResolvedValue({ data: { settings: true } }); // Mock data if needed

    renderWithRouter(<App />, { route: '/settings' });
    await waitFor(() => expect(screen.getByText(/Settings/i)).toBeInTheDocument());
});

test('renders the Notifications component at /notifications when authenticated', async () => {
    axios.get.mockResolvedValue({ data: { notifications: [] } }); // Mock data if needed

    renderWithRouter(<App />, { route: '/notifications' });
    await waitFor(() => expect(screen.getByText(/Notifications/i)).toBeInTheDocument());
});