// CommentComponent.jsx

import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const CommentComponent = ({ comments, onDelete }) => (
    <>
        {comments.map(comment => (
            <CommentItem key={comment.id}>
                <CommentName>{comment.name}</CommentName>
                <CommentContent>{comment.content}</CommentContent>
                <CommentTime>{comment.timeStamp}</CommentTime>
                {comment.isMyPost && (
                    <DeleteButton onClick={() => onDelete(comment.id)}>삭제</DeleteButton>
                )}
            </CommentItem>
        ))}
    </>
);

CommentComponent.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        timeStamp: PropTypes.string.isRequired,
        isMyPost: PropTypes.bool.isRequired,
    })).isRequired,
    onDelete: PropTypes.func.isRequired,
};

const CommentItem = styled.div`
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 10px;
    margin-bottom: 15px;
    position: relative;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentName = styled.p`
    font-weight: bold;
    margin-bottom: 5px;
`;

const CommentContent = styled.p`
    margin-bottom: 8px;
`;

const CommentTime = styled.span`
    font-size: 12px;
    color: #888;
`;

const DeleteButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: #ff0000;
    cursor: pointer;
    font-size: 14px;
`;

export default CommentComponent;
