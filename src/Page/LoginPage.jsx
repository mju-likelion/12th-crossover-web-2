import Cookies from "js-cookie"; // js-cookie 라이브러리 추가
import React, { useEffect, useState } from "react";
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

    try {
      const response = await fetch('https://api.likelion-crossover-team2.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, password: password }),
      });
      if (response.ok) {
        alert('로그인 성공.');
        const data = await response.json();
        Cookies.set('userToken', data.token);
        navigate('/main');
      } else {
        const errorData = await response.json();
        alert(`로그인 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 중 오류가 발생했습니다.');
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
          <SubmitButton type="submit" className="submit-btn" disabled={!isValid}>
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
  background-color: ${(props) => (props.disabled ? "var(--colorBlue1)" : "blue")};
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
  padding: 10px;
  margin-top: 10px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
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
