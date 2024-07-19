import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from './Details';
import { AuthContext } from '../context/AuthContext';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

const mockDetails = {
  name: 'Mock Location',
  state: 'Mock State',
  forest: 'Mock Forest',
  description: 'Mock description',
  posts: [
    { id: 1, title: 'Post 1', reviewText: 'Review 1' },
    { id: 2, title: 'Post 2', reviewText: 'Review 2' }
  ]
};

const mockSavedLocations = [
  { locationId: 1, locationType: 'forest' }
];

const mockCurrentUser = { id: 1 };

describe('Details', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url.includes('/api/forests/')) {
        return Promise.resolve({ data: mockDetails });
      }
      if (url.includes('/api/savedLocations/user/')) {
        return Promise.resolve({ data: mockSavedLocations });
      }
      return Promise.reject(new Error('not found'));
    });

    axios.post.mockResolvedValue({});
    axios.delete.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithAuth = (ui, { providerProps, ...renderOptions }) => {
    return render(
      <AuthContext.Provider {...providerProps}>
        {ui}
      </AuthContext.Provider>,
      renderOptions
    );
  };

  it('should render the Details component and fetch details', async () => {
    const providerProps = { value: { currentUser: mockCurrentUser } };
    renderWithAuth(
      <MemoryRouter initialEntries={['/details/forest/1']}>
        <Routes>
          <Route path="/details/:type/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>,
      { providerProps }
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Mock Location')).toBeInTheDocument();
      expect(screen.getByText('Type: forest')).toBeInTheDocument();
      expect(screen.getByText('Mock description')).toBeInTheDocument();
    });
  });

  it('should handle save and unsave location', async () => {
    const providerProps = { value: { currentUser: mockCurrentUser } };
    renderWithAuth(
      <MemoryRouter initialEntries={['/details/forest/1']}>
        <Routes>
          <Route path="/details/:type/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>,
      { providerProps }
    );

    await waitFor(() => {
      expect(screen.getByText('Mock Location')).toBeInTheDocument();
    });

    const saveButton = screen.getByText('Unsave Location');
    fireEvent.click(saveButton);
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/api/savedLocations/unsave', {
        data: { userId: 1, locationId: 1, locationType: 'forest' }
      });
    });

    fireEvent.click(screen.getByText('Save Location'));
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/api/savedLocations/save', {
        userId: 1, locationId: 1, locationType: 'forest'
      });
    });
  });

  it('should handle no reviews/photos state', async () => {
    axios.get.mockImplementationOnce((url) => {
      if (url.includes('/api/forests/')) {
        return Promise.resolve({
          ...mockDetails,
          posts: []
        });
      }
      return Promise.reject(new Error('not found'));
    });

    const providerProps = { value: { currentUser: mockCurrentUser } };
    renderWithAuth(
      <MemoryRouter initialEntries={['/details/forest/1']}>
        <Routes>
          <Route path="/details/:type/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>,
      { providerProps }
    );

    await waitFor(() => {
      expect(screen.getByText('Mock Location')).toBeInTheDocument();
      expect(screen.getByText('No recent reviews/photos available.')).toBeInTheDocument();
    });
  });
});