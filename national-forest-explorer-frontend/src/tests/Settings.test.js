import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Settings from '../features/settings/Settings';
import axios from '../services/axiosConfig';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../services/axiosConfig');

describe('Settings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Settings component', () => {
    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('handles update settings', async () => {
    axios.put.mockResolvedValue({});

    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'newusername' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'newemail@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'newpassword' } });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), { target: { value: 'newpassword' } });

    fireEvent.submit(screen.getByRole('button', { name: /update/i }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Settings updated successfully.')).toBeInTheDocument();
    });
  });

  it('handles delete account', async () => {
    axios.delete.mockResolvedValue({});

    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    window.confirm = jest.fn().mockImplementation(() => true);

    fireEvent.click(screen.getByRole('button', { name: /delete account/i }));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledTimes(1);
    });
  });
});