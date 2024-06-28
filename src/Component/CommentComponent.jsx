import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const CommentComponent = ({ name, content, timeStamp, isMyPost, onDelete }) => (
    <CommentItem isMyPost={isMyPost}>
        <CommentName>{name}</CommentName>
        <CommentContent>{content}</CommentContent>
        <CommentTime>{timeStamp}</CommentTime>
        {isMyPost && <DeleteButton onClick={onDelete}>삭제</DeleteButton>}
    </CommentItem>
);

CommentComponent.propTypes = {
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timeStamp: PropTypes.string.isRequired,
    isMyPost: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
};

const CommentItem = styled.div`
    padding: 10px;
    background-color: ${(props) => (props.isMyPost ? '#e0f2fe' : '#f3f3f3')};
    border-radius: 10px;
    margin-bottom: 10px;
    position: relative;
`;

const CommentName = styled.p`
    font-weight: bold;
    margin-bottom: 5px;
`;

const CommentContent = styled.p`
    margin-bottom: 5px;
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
`;

export default CommentComponent;
