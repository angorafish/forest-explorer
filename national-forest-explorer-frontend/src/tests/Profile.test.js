import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from './Profile';
import axios from '../services/axiosConfig';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('../services/axiosConfig');

const mockUser = {
  id: 1,
  username: 'user1',
  profilePhoto: 'profile.jpg',
  coverPhoto: 'cover.jpg',
  createdAt: '2023-01-01T00:00:00.000Z',
  friends: [{ id: 2, username: 'user2' }],
  posts: [{ id: 1, location: 'Location 1', rating: 4, picture: 'photo1.jpg', likes: [], comments: [] }],
};

describe('Profile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (currentUser) => {
    render(
      <MemoryRouter initialEntries={['/profile/user1']}>
        <Routes>
          <Route path="/profile/:username" element={<Profile currentUser={currentUser} />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders Profile component', async () => {
    axios.get.mockResolvedValue({ data: mockUser });

    renderComponent(mockUser);

    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
      expect(screen.getByText('Friends: 1')).toBeInTheDocument();
      expect(screen.getByText('Location 1')).toBeInTheDocument();
    });
  });

  it('handles editing profile', async () => {
    axios.get.mockResolvedValue({ data: mockUser });
    axios.put.mockResolvedValue({ data: mockUser });

    renderComponent(mockUser);

    await waitFor(() => {
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Edit Profile'));
    fireEvent.change(screen.getByLabelText('Profile Photo'), { target: { files: [new File([], 'profile.jpg')] } });
    fireEvent.click(screen.getByText('Save Changes'));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });
  });

  it('handles viewing friend list', async () => {
    axios.get.mockResolvedValue({ data: mockUser });

    renderComponent(mockUser);

    await waitFor(() => {
      expect(screen.getByText('Friends: 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Friends: 1'));

    await waitFor(() => {
      expect(screen.getByText('user2')).toBeInTheDocument();
    });
  });
});