import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CommentComponent from '../Component/CommentComponent.jsx';

const ModalComponent = ({ showModal, closeModal, boardId, children }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        if (showModal) {
            fetchComments();
        }
    }, [showModal]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/boards/${boardId}/comments?page=0`);
            const { commentList } = response.data.data;
            setComments(commentList);
        } catch (error) {
            console.error("Failed to fetch comments", error);
        }
    };

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post(`/boards/${boardId}/comments`, { content: newComment });
            if (response.data.statusCode === "201") {
                setNewComment("");
                fetchComments();
            } else {
                console.error("Failed to submit comment", response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error("404 error: Not Found - Check if the endpoint is correct.");
            } else {
                console.error("Failed to submit comment", error);
            }
        }
    };

    const handlePostDelete = async () => {
        try {
            const response = await axios.delete(`/boards/${boardId}`);
            if (response.data.statusCode === "200") {
                closeModal();
            } else {
                console.error("Failed to delete post", response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error("404 error: Not Found - Check if the endpoint is correct.");
            } else {
                console.error("Failed to delete post", error);
            }
        }
    };

    return (
        showModal && (
            <ModalWrapper>
                <ModalContent>
                    <CloseButton onClick={closeModal}>닫기</CloseButton>
                    {children}
                    <DeletePostButton onClick={handlePostDelete}>게시글 삭제</DeletePostButton>
                    <CommentWrapper>
                        <CommentInput
                            placeholder="댓글을 입력하세요..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <SubmitButton onClick={handleCommentSubmit}>작성</SubmitButton>
                        <CommentList>
                            <CommentComponent comments={comments} />
                        </CommentList>
                    </CommentWrapper>
                </ModalContent>
            </ModalWrapper>
        )
    );
};

ModalComponent.propTypes = {
    showModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
    children: PropTypes.node,
};

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    width: 500px;
    height: 500px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const CloseButton = styled.button`
    align-self: flex-end;
    color: #2186fc;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
`;

const DeletePostButton = styled.button`
    padding: 10px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    background-color: red;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
`;

const CommentWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const CommentInput = styled.input`
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SubmitButton = styled.button`
    padding: 10px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    background-color: #2186fc;
    color: white;
    cursor: pointer;
`;

const CommentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export default ModalComponent;
