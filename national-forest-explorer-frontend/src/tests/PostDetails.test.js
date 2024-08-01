import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostDetails from './PostDetails';
import axios from '../services/axiosConfig';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('../services/axiosConfig');

const mockPost = {
  id: 1,
  location: 'Test Location',
  user: { username: 'user1' },
  photos: [{ url: 'photo1.jpg' }],
  rating: 4,
  reviewText: 'Great place!',
  comments: [],
};

describe('PostDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders PostDetails component', async () => {
    axios.get.mockResolvedValue({ data: mockPost });

    render(
      <MemoryRouter initialEntries={['/posts/1']}>
        <Routes>
          <Route path="/posts/:id" element={<PostDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Location')).toBeInTheDocument();
      expect(screen.getByText('Great place!')).toBeInTheDocument();
    });
  });

  it('handles submitting a comment', async () => {
    axios.get.mockResolvedValue({ data: mockPost });
    axios.post.mockResolvedValue({ data: { text: 'Nice!', user: { username: 'user2' } } });

    render(
      <MemoryRouter initialEntries={['/posts/1']}>
        <Routes>
          <Route path="/posts/:id" element={<PostDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Location')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Comment:'), { target: { value: 'Nice!' } });
    fireEvent.submit(screen.getByRole('button', { name: /submit comment/i }));

    await waitFor(() => {
      expect(screen.getByText('Nice!')).toBeInTheDocument();
      expect(screen.getByText('— user2')).toBeInTheDocument();
    });
  });
});