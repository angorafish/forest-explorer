import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Trails from './Trails';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

const mockTrails = [
  { id: 1, name: 'Trail 1', description: 'Description 1' },
  { id: 2, name: 'Trail 2', description: 'Description 2' },
];

describe('Trails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Trails component', async () => {
    axios.get.mockResolvedValue({ data: mockTrails });

    render(<Trails />);

    await waitFor(() => {
      expect(screen.getByText('Trail 1')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('Trail 2')).toBeInTheDocument();
      expect(screen.getByText('Description 2')).toBeInTheDocument();
    });
  });
});