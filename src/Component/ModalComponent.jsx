// ModalComponent.jsx

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

    const handleSubmitComment = async () => {
        try {
            await axios.post(`/boards/${boardId}/comments`, { text: newComment });
            setNewComment("");
            fetchComments();
        } catch (error) {
            console.error("Failed to submit comment", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`/boards/${boardId}/comments/${commentId}`);
            fetchComments();
        } catch (error) {
            console.error(`Failed to delete comment with ID ${commentId}`, error);
        }
    };

    return (
        showModal && (
            <ModalWrapper>
                <ModalContent>
                    <CloseButton onClick={closeModal}>닫기</CloseButton>
                    {children}
                
                    <CommentWrapper>
                        <CommentInput
                            placeholder="댓글을 입력하세요..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <SubmitButton onClick={handleSubmitComment}>등록</SubmitButton>
                    
                        <CommentList>
                            <CommentComponent comments={comments} onDelete={handleDeleteComment} />
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
    z-index: 1000; /* Ensure modal is on top */
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    width: 500px;
    height: 600px;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
    align-self: flex-end;
    color: #ffffff;
    border: none;
    background-color: #2186fc;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
`;

const CommentWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const CommentInput = styled.textarea`
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: vertical;
    min-height: 80px;
`;

const SubmitButton = styled.button`
    align-self: flex-end;
    color: #ffffff;
    border: none;
    background-color: #2186fc;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
`;

const CommentList = styled.div`
    overflow-y: auto;
    max-height: 200px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export default ModalComponent;
