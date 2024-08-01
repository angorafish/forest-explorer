import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Explore from './Explore';

jest.mock('axios');

const mockSuggestions = ['Forest A', 'Campsite B', 'Trail C'];
const mockSearchResults = [
  { id: 1, name: 'Forest A', type: 'Forest', state: 'CA', forest: 'Sierra' },
  { id: 2, name: 'Campsite B', type: 'Campsite', state: 'CA', forest: 'Sierra' },
  { id: 3, name: 'Trail C', type: 'Trail', state: 'CA', forest: 'Sierra' }
];

describe('Explore', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Explore component', () => {
    render(
      <MemoryRouter>
        <Explore />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('Search for forests, campsites, trails...')).toBeInTheDocument();
  });

  it('should fetch and display suggestions', async () => {
    axios.get.mockResolvedValue({ data: mockSuggestions });
    render(
      <MemoryRouter>
        <Explore />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText('Search for forests, campsites, trails...'), { target: { value: 'Fo' } });

    await waitFor(() => {
      expect(screen.getByText('Forest A')).toBeInTheDocument();
    });
  });

  it('should fetch and display search results', async () => {
    axios.get.mockResolvedValue({ data: mockSearchResults });
    render(
      <MemoryRouter>
        <Explore />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Search for forests, campsites, trails...'), { target: { value: 'Forest' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('Forest A')).toBeInTheDocument();
      expect(screen.getByText('Campsite B')).toBeInTheDocument();
      expect(screen.getByText('Trail C')).toBeInTheDocument();
    });
  });

  it('should navigate to details page on result click', async () => {
    axios.get.mockResolvedValue({ data: mockSearchResults });
    const navigateMock = jest.fn();
    render(
      <MemoryRouter>
        <Explore navigate={navigateMock} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      fireEvent.click(screen.getByText('Forest A'));
    });

    expect(navigateMock).toHaveBeenCalledWith('/details/forest/1');
  });
});