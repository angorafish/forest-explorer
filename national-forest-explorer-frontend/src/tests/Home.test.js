import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from '../services/axiosConfig';
import Home from '../components/Home';
import PostDetails from '../components/PostDetails';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../services/axiosConfig');

const mockPosts = [
  {
    id: 1,
    photos: ['photo1.jpg'],
    location: 'Photo Location',
    User: { username: 'user1' }
  },
  {
    id: 2,
    photos: [],
    location: 'National Park',
    User: { username: 'user2' },
    rating: 5,
    reviewText: 'Great hike!'
  }
];

const mockPostDetails = {
  id: 2,
  photos: [],
  location: 'National Park',
  user: { username: 'user2' },
  rating: 5,
  reviewText: 'Great hike!',
  comments: [
    { id: 1, text: 'Awesome!', user: { username: 'commenter1' } }
  ]
};

describe('Home', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url === '/posts') {
        return Promise.resolve({ data: mockPosts });
      } else if (url === '/posts/2') {
        return Promise.resolve({ data: mockPostDetails });
      }
      return Promise.reject(new Error('not found'));
    });
  });

  it('should display a grid of recent posts', async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('Recent Posts')).toBeInTheDocument());

    const photoPost = screen.getByAltText('Photo Location');
    expect(photoPost).toBeInTheDocument();
    expect(photoPost.src).toContain('photo1.jpg');

    const reviewPost = screen.getByText('National Park');
    expect(reviewPost).toBeInTheDocument();
    expect(screen.getByText('Posted by user2')).toBeInTheDocument();
  });

  it('should display navbar', async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Recent Posts')).toBeInTheDocument());

    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
  });

  it('should redirect to post details when clicked', async () => {
    render(
      <Router>
        <Home />
        <PostDetails />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Recent Posts')).toBeInTheDocument());

    const reviewPost = screen.getByText('National Park');
    fireEvent.click(reviewPost);

    await waitFor(() => expect(screen.getByText('Great hike!')).toBeInTheDocument());
    expect(screen.getByText('Rating: 5 stars')).toBeInTheDocument();
    expect(screen.getByText('Posted by user2')).toBeInTheDocument();
    expect(screen.getByText('Awesome!')).toBeInTheDocument();
  });
});
