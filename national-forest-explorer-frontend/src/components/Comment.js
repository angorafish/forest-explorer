import React from 'react';

const Comment = ({ comment }) => {
    if (!comment.User) {
        return <div>User not found</div>;
    }

    return (
        <div className="comment">
            <p>{comment.text}</p>
            <p>— {comment.User.username}</p>
        </div>
    );
};

export default Comment;
