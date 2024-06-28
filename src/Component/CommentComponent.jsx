import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const CommentComponent = ({ name, content, timeStamp, isMyPost }) => (
    <CommentItem isMyPost={isMyPost}>
        <CommentName>{name}</CommentName>
        <CommentContent>{content}</CommentContent>
        <CommentTime>{timeStamp}</CommentTime>
    </CommentItem>
);

CommentComponent.propTypes = {
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timeStamp: PropTypes.string.isRequired,
    isMyPost: PropTypes.bool.isRequired,
};

const CommentItem = styled.div`
    padding: 10px;
    background-color: ${(props) => (props.isMyPost ? '#e0f2fe' : '#f3f3f3')};
    border-radius: 10px;
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

export default CommentComponent;


