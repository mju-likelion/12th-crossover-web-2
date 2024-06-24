import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../commonComponent/commonComponent.css";
import LoginComponent from "../Component/LoginComponent";

function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    const idPattern = /^[a-zA-Z0-9]{5,10}$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,14}$/;
    setIsValid(idPattern.test(id) && passwordPattern.test(password));
  }, [id, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid) {
      alert("아이디와 비밀번호를 올바르게 입력해주세요.");
      return;
    }
    else {
    try {
          const response = await fetch('likelion-crossover-team2.com/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: id, password: password }),
            });
            const data = await response.json();

            if (data.success) {
                navigate('/main');
            } else {
              alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
      }
  };

  const handleSignUp = () => {
    navigate("/join");
  };

  return (
    <div className="container" style={{ width: "400px" }}>
      <form onSubmit={handleSubmit}>
        <LoginComponent
          id={id}
          setId={setId}
          password={password}
          setPassword={setPassword}
        />
        <div style={styles.footer}>
          <SubmitButton type="submit" className="submit-btn">
            로그인
          </SubmitButton>
          <SignUpButton onClick={handleSignUp}>회원가입</SignUpButton>
        </div>
      </form>
    </div>
  );
}

const SignUpButton = styled.button`
  font-size: 14px;
  color: var(--colorGray);
  font-weight: bold;
  border: none;
  background: none;
  margin-top: 10px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background-color: ${(props) => (props.isValid ? "blue" : "var(--colorBlue1)")};
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
  padding: 10px;
  margin-top: 10px;
  cursor: ${(props) => (props.isValid ? "pointer" : "not-allowed")};
`;

const styles = {
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    margin: "20px",
  },
  submitButton: {
    flex: 1,
    marginBottom: "10px",
  },
};

export default LoginPage;
