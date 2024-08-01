import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Posts from './Posts';
import axios from '../services/axiosConfig';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../services/axiosConfig');

const mockPosts = [
  { id: 1, location: 'Location 1', reviewText: 'Review 1', rating: 4, photos: [], user: { username: 'user1' } },
  { id: 2, location: 'Location 2', reviewText: 'Review 2', rating: 5, photos: [], user: { username: 'user2' } },
];

describe('Posts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Posts component', async () => {
    axios.get.mockResolvedValue({ data: mockPosts });

    render(
      <MemoryRouter>
        <Posts />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Location 1')).toBeInTheDocument();
      expect(screen.getByText('Location 2')).toBeInTheDocument();
    });
  });
});