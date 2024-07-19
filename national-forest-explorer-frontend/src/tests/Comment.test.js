import React from 'react';
import { render, screen } from '@testing-library/react';
import Comment from './Comment';
import '@testing-library/jest-dom/extend-expect';

const mockCommentWithUser = {
    text: 'This is a comment',
    User: {
        username: 'user1'
    }
};

const mockCommentWithoutUser = {
    text: 'This is a comment'
};

describe('Comment', () => {
    it('should render the comment with user', () => {
        render(<Comment comment={mockCommentWithUser} />);
        expect(screen.getByText('This is a comment')).toBeInTheDocument();
        expect(screen.getByText('— user1')).toBeInTheDocument();
    });

    it('should render "User not found" when user is missing', () => {
        render(<Comment comment={mockCommentWithoutUser} />);
        expect(screen.getByText('User not found')).toBeInTheDocument();
    });
});