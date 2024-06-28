
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const ModalComponenet = ({ showModal, closeModal }) => {
    return (
        showModal && (
            <ModalWrapper>
                <ModalContent>
                    <CloseButton onClick={closeModal}>닫기</CloseButton>
                </ModalContent>
            </ModalWrapper>
        )
    );
};

ModalComponenet.propTypes = {
    showModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
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

export default ModalComponenet;
