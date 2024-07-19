import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Campsites from './Campsites';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

const mockCampsites = [
  { id: 1, name: 'Campsite A', location: 'Location A' },
  { id: 2, name: 'Campsite B', location: 'Location B' }
];

describe('Campsites', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockCampsites });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Campsites component', () => {
    render(<Campsites />);
    expect(screen.getByText('Campsites')).toBeInTheDocument();
  });

  it('should fetch and display campsites', async () => {
    render(<Campsites />);

    await waitFor(() => {
      expect(screen.getByText('Campsite A')).toBeInTheDocument();
      expect(screen.getByText('Campsite B')).toBeInTheDocument();
    });

    expect(screen.getByText('Location A')).toBeInTheDocument();
    expect(screen.getByText('Location B')).toBeInTheDocument();
  });

  it('should handle error in fetching campsites', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching campsites'));
    render(<Campsites />);

    await waitFor(() => {
      expect(screen.queryByText('Campsite A')).not.toBeInTheDocument();
      expect(screen.queryByText('Campsite B')).not.toBeInTheDocument();
    });
  });
});
