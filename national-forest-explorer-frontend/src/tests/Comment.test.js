import React from 'react';
import { render, screen } from '@testing-library/react';
import Comment from '../features/posts/Comment';

const mockCommentWithUser = {
    text: 'This is a comment',
    user: {
        username: 'user1'
    }
};

const mockCommentWithoutUser = {
    text: 'This is a comment',
    user: null
};

describe('Comment', () => {
    it('should render the comment with user', () => {
        const { debug } = render(<Comment comment={mockCommentWithUser} />);
        debug(); // Print the rendered output
        expect(screen.getByText('This is a comment')).toBeInTheDocument();
        expect(screen.getByText('— user1')).toBeInTheDocument();
    });

    it('should render "User not found" when user is missing', () => {
        const { debug } = render(<Comment comment={mockCommentWithoutUser} />);
        debug(); // Print the rendered output
        expect(screen.getByText('User not found')).toBeInTheDocument();
    });
});