import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TripDetails from './TripDetails';
import axios from '../services/axiosConfig';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import moment from 'moment';

jest.mock('../services/axiosConfig');

const mockTrip = {
  id: 1,
  name: 'Test Trip',
  description: 'Trip Description',
  startDate: moment().toISOString(),
  endDate: moment().add(1, 'days').toISOString(),
  creator: { username: 'creator' },
  invitedMembers: [{ username: 'user1' }, { username: 'user2' }],
  forest: { name: 'Test Forest' },
  items: [
    { date: moment().toISOString(), time: '10:00', note: 'Item Note', forestId: 1, trailId: 1, campsiteId: 1 },
  ],
  forestCoordinates: [{ lat: 37.7749, lng: -122.4194 }],
};

describe('TripDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders TripDetails component', async () => {
    axios.get.mockResolvedValue({ data: mockTrip });

    render(
      <MemoryRouter initialEntries={['/trip-details/1']}>
        <Routes>
          <Route path="/trip-details/:id" element={<TripDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Trip')).toBeInTheDocument();
      expect(screen.getByText('Trip Description')).toBeInTheDocument();
      expect(screen.getByText('Test Forest')).toBeInTheDocument();
      expect(screen.getByText('Item Note')).toBeInTheDocument();
    });
  });

  it('handles editing trip', async () => {
    axios.get.mockResolvedValue({ data: mockTrip });
    axios.put.mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={['/trip-details/1']}>
        <Routes>
          <Route path="/trip-details/:id" element={<TripDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Edit Trip')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Edit Trip'));

    await waitFor(() => {
      expect(screen.getByText('Create New Trip')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Updated Trip' } });
    fireEvent.submit(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledTimes(1);
    });
  });

  it('handles deleting trip', async () => {
    axios.get.mockResolvedValue({ data: mockTrip });
    axios.delete.mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={['/trip-details/1']}>
        <Routes>
          <Route path="/trip-details/:id" element={<TripDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Delete Trip')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Delete Trip'));

    await waitFor(() => {
      expect(screen.getByText('Are you sure you want to delete this trip?')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /yes/i }));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledTimes(1);
    });
  });
});