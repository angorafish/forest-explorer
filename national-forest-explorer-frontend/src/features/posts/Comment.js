import React from 'react';

// Display a single comment
const Comment = ({ comment }) => {
    // If user is not found, display a message
    if (!comment.user) {
        return <div>User not found</div>;
    }

    return (
        <div className="comment">
            <p>{comment.text}</p>
            <p>— {comment.user.username}</p>
        </div>
    );
};

export default Comment;