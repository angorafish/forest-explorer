import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewTripForm from './NewTripForm';
import axios from '../services/axiosConfig';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../services/axiosConfig');

describe('NewTripForm', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders NewTripForm component', () => {
    render(
      <MemoryRouter>
        <NewTripForm isOpen={true} onClose={onClose} />
      </MemoryRouter>
    );
    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('handles trip submission correctly', async () => {
    axios.post.mockResolvedValue({ data: { id: 1 } });
    render(
      <MemoryRouter>
        <NewTripForm isOpen={true} onClose={onClose} />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Trip' } });
    fireEvent.submit(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalled();
    });
  });
});