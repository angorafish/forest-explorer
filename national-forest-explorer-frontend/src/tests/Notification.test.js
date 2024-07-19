import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Notifications from './Notifications';
import axios from '../services/axiosConfig';
import '@testing-library/jest-dom/extend-expect';
import socket from '../services/socketConfig';

jest.mock('../services/axiosConfig');
jest.mock('../services/socketConfig');

const mockNotifications = [
  { id: 1, type: 'like', fromUser: { username: 'user1' }, status: 'unread' },
  { id: 2, type: 'comment', fromUser: { username: 'user2' }, status: 'read' },
];

describe('Notifications', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Notifications component', async () => {
    axios.get.mockResolvedValue({ data: mockNotifications });

    render(<Notifications />);
    expect(screen.getByText('Notifications')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('user1 liked your post')).toBeInTheDocument();
      expect(screen.getByText('user2 commented on your post')).toBeInTheDocument();
    });
  });

  it('updates notifications on new notification', async () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<Notifications />);

    socket.emit('new_notification', { id: 3, type: 'like', fromUser: { username: 'user3' }, status: 'unread' });

    await waitFor(() => {
      expect(screen.getByText('user3 liked your post')).toBeInTheDocument();
    });
  });

  it('handles marking notification as read', async () => {
    axios.get.mockResolvedValue({ data: mockNotifications });
    axios.put.mockResolvedValue({});
    render(<Notifications />);

    await waitFor(() => {
      expect(screen.getByText('user1 liked your post')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Mark as read'));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('/notifications/1/read');
      expect(screen.queryByText('user1 liked your post')).not.toHaveClass('unread');
    });
  });
});