import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OtherProfile from './OtherProfile';
import axios from '../services/axiosConfig';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('../services/axiosConfig');

const mockUser = {
  id: 2,
  username: 'user2',
  profilePhoto: 'profile.jpg',
  coverPhoto: 'cover.jpg',
  createdAt: '2023-01-01T00:00:00.000Z',
  posts: [],
  receivedRequests: [],
  sentRequests: [],
};

describe('OtherProfile', () => {
  const currentUser = { id: 1, username: 'user1' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders OtherProfile component', async () => {
    axios.get.mockResolvedValue({ data: mockUser });

    render(
      <MemoryRouter initialEntries={['/profile/user2']}>
        <Routes>
          <Route path="/profile/:username" element={<OtherProfile currentUser={currentUser} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('user2')).toBeInTheDocument();
      expect(screen.getByText('Member since January 2023')).toBeInTheDocument();
    });
  });

  it('handles adding and removing friend', async () => {
    axios.get.mockResolvedValue({ data: mockUser });
    axios.post.mockResolvedValue({});
    axios.delete.mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={['/profile/user2']}>
        <Routes>
          <Route path="/profile/:username" element={<OtherProfile currentUser={currentUser} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Add Friend')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Add Friend'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(screen.getByText('Cancel Friend Request')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Cancel Friend Request'));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalled();
      expect(screen.getByText('Add Friend')).toBeInTheDocument();
    });
  });
});