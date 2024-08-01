import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from '../services/axiosConfig';
import Forest from './Forest';

jest.mock('../services/axiosConfig');

const mockForest = {
  fullName: 'Mock Forest',
  description: 'A mock description',
  trails: [
    { id: 1, name: 'Trail 1' },
    { id: 2, name: 'Trail 2' }
  ]
};

describe('Forest', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Forest component and fetch forest details', async () => {
    axios.get.mockResolvedValue({ data: mockForest });

    render(
      <MemoryRouter initialEntries={['/forests/nps/1']}>
        <Routes>
          <Route path="/forests/nps/:id" element={<Forest />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Mock Forest')).toBeInTheDocument();
      expect(screen.getByText('A mock description')).toBeInTheDocument();
      expect(screen.getByText('Trail 1')).toBeInTheDocument();
      expect(screen.getByText('Trail 2')).toBeInTheDocument();
    });
  });

  it('should display error message on fetch failure', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch forest details. Please try again later.'));

    render(
      <MemoryRouter initialEntries={['/forests/nps/1']}>
        <Routes>
          <Route path="/forests/nps/:id" element={<Forest />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch forest details. Please try again later.')).toBeInTheDocument();
    });
  });

  it('should display "No forest details available." when forest data is null', async () => {
    axios.get.mockResolvedValue({ data: null });

    render(
      <MemoryRouter initialEntries={['/forests/nps/1']}>
        <Routes>
          <Route path="/forests/nps/:id" element={<Forest />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No forest details available.')).toBeInTheDocument();
    });
  });
});