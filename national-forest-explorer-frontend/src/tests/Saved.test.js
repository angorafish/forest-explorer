import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Saved from './Saved';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

jest.mock('axios');

const mockSavedLocations = [
  { locationId: 1, locationType: 'forest', name: 'Forest 1' },
  { locationId: 2, locationType: 'trail', name: 'Trail 1' },
];

describe('Saved', () => {
  const currentUser = { id: 1 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Saved component', async () => {
    axios.get.mockResolvedValue({ data: mockSavedLocations });

    render(
      <AuthContext.Provider value={{ currentUser }}>
        <MemoryRouter>
          <Saved />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Forest 1')).toBeInTheDocument();
      expect(screen.getByText('Trail 1')).toBeInTheDocument();
    });
  });

  it('handles unsave location', async () => {
    axios.get.mockResolvedValue({ data: mockSavedLocations });
    axios.delete.mockResolvedValue({});

    render(
      <AuthContext.Provider value={{ currentUser }}>
        <MemoryRouter>
          <Saved />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Forest 1')).toBeInTheDocument();
      expect(screen.getByText('Trail 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Unsave', { selector: 'button' }));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/api/savedLocations/unsave', expect.anything());
    });
  });
});