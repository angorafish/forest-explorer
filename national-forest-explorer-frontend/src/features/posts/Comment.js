import React from 'react';

const Comment = ({ comment }) => {
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