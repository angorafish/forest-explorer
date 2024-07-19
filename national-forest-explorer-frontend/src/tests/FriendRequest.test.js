import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from '../services/axiosConfig';
import socket from '../services/socketConfig';
import FriendRequests from './FriendRequests';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../services/axiosConfig');
jest.mock('../services/socketConfig');

const mockFriendRequests = [
  { id: 1, requester: { username: 'user1' } },
  { id: 2, requester: { username: 'user2' } }
];

describe('FriendRequests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the FriendRequests component and fetch friend requests', async () => {
    axios.get.mockResolvedValue({ data: mockFriendRequests });

    render(<FriendRequests />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
      expect(screen.getByText('user2')).toBeInTheDocument();
    });
  });

  it('should handle friend request accept and ignore', async () => {
    axios.get.mockResolvedValue({ data: mockFriendRequests });
    axios.put.mockResolvedValue({});

    render(<FriendRequests />);

    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
      expect(screen.getByText('user2')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Accept', { selector: 'button' }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('/friend-requests/1/accept');
    });

    fireEvent.click(screen.getByText('Ignore', { selector: 'button' }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('/friend-requests/1/reject');
    });
  });

  it('should display "No friend requests" when there are no friend requests', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(<FriendRequests />);

    await waitFor(() => {
      expect(screen.getByText('No friend requests')).toBeInTheDocument();
    });
  });

  it('should update friend requests on new notification', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(<FriendRequests />);

    socket.emit('new_notification', { type: 'friend_request', friendRequest: { id: 3, requester: { username: 'user3' } } });

    await waitFor(() => {
      expect(screen.getByText('user3')).toBeInTheDocument();
    });
  });
});