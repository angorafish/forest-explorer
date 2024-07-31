import React from 'react';
import { Link } from 'react-router-dom';

// Display a single comment
const Comment = ({ comment }) => {
    // If user is not found, display a message
    if (!comment.user) {
        return <div>User not found</div>;
    }

    return (
        <div className="comment">
            <p>{comment.text}</p>
            <p>— <Link to={`/profile/${comment.user.username}`} className="comment-username">{comment.user.username}</Link></p>
        </div>
    );
};

export default Comment;