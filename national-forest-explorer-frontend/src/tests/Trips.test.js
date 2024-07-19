import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Trips from './Trips';
import axios from '../services/axiosConfig';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import moment from 'moment';

jest.mock('../services/axiosConfig');

const mockItineraries = [
  { id: 1, name: 'Upcoming Trip', startDate: moment().add(1, 'days').toISOString(), endDate: moment().add(2, 'days').toISOString(), forest: 'Forest 1' },
  { id: 2, name: 'Previous Trip', startDate: moment().subtract(2, 'days').toISOString(), endDate: moment().subtract(1, 'days').toISOString(), forest: 'Forest 2' },
];

describe('Trips', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Trips component', async () => {
    axios.get.mockResolvedValue({ data: mockItineraries });

    render(
      <MemoryRouter>
        <Trips />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Upcoming Trip')).toBeInTheDocument();
      expect(screen.getByText('Previous Trip')).toBeInTheDocument();
    });
  });

  it('handles creating new trip', async () => {
    axios.get.mockResolvedValue({ data: mockItineraries });

    render(
      <MemoryRouter>
        <Trips />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Create New Trip')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Create New Trip'));

    await waitFor(() => {
      expect(screen.getByText('Create New Trip')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'New Trip' } });
    fireEvent.submit(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });

  it('handles selecting a trip event', async () => {
    axios.get.mockResolvedValue({ data: mockItineraries });

    render(
      <MemoryRouter>
        <Trips />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Upcoming Trip')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Upcoming Trip'));

    await waitFor(() => {
      expect(screen.getByText('Trip Details')).toBeInTheDocument();
    });
  });
});