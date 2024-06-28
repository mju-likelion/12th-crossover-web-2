import PropTypes from "prop-types";
import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import styled from 'styled-components';

const PostComponent = ({ title, setTitle, content, setContent, handleSubmit, handleDelete, isReadOnly }) => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>
                        {isReadOnly ? title : ""}
                        <Count>({title.length} / 20)</Count>
                    </Label>
                    {!isReadOnly && (
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength="20"
                            required
                        />
                    )}
                </FormGroup>
                <FormGroup>
                    <TextArea
                        value={content}
                        onChange={isReadOnly ? null : (e) => setContent(e.target.value)}
                        maxLength="140"
                        readOnly={isReadOnly}
                        required
                    />
                    <Count>({content.length} / 140)</Count>
                </FormGroup>
                <Note>※ 작성된 게시글은 수정이 불가합니다.</Note>
                <ButtonGroup>
                    <BackButton
                        type="button"
                        onClick={() => navigate('/main')} // 뒤로가기 클릭 시 '/main' 페이지로 이동
                    >
                        뒤로가기
                    </BackButton>
                    {!isReadOnly ? (
                        <Button
                            type="submit"
                        >
                            작성하기
                        </Button>
                    ) : (
                        <Button
                            onClick={() => handleDelete(true)}
                        >
                            삭제하기
                        </Button>
                    )}
                </ButtonGroup>
            </Form>
        </Container>
    );
};

PostComponent.propTypes = {
    title: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    setContent: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    isReadOnly: PropTypes.bool.isRequired
};

export default PostComponent;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 794px;
    padding: 20px;
    border-radius: 10px;
`;

const FormGroup = styled.div`
    margin-bottom: 25px;
    position: relative;
    border-radius: 15px;
    border: 2px solid #717171;
    padding: 10px;
`;

const Label = styled.label`
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    height: 50px;
    color: #000;
    font-weight: bold;
    margin: 0 0 10px 10px;
    font-size: 20px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 15px;
`;

const TextArea = styled.textarea`
    width: 100%;
    font-size: 16px;
    border-radius: 15px;
    resize: none;
    height: 550px;
    padding: 10px;
    box-sizing: border-box;
    border: none;
`;

const Count = styled.span`
    position: absolute;
    bottom: 5px;
    right: 10px;
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
`;

const Note = styled.p`
    font-size: 12px;
    color: #999;
    text-align: left;
    width: 100%;
    margin-top: 10px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const Button = styled.button`
    width: 150px;
    height: 50px;
    background-color: #99CEFF;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: rgb(154, 154, 216);
    }
`;

const BackButton = styled.button`
    width: 150px;
    background-color: #888888;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #666666;
    }
    
`;
