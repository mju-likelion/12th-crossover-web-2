import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../commonComponent/commonComponent.css";
import LoginComponent from "../Component/LoginComponent";

function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 임시 로그인 검증 로직
    if (id === "asdf" && password === "asdf") {
      navigate("/main");
    } else {
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
    /*try {
            const response = await fetch('API_ENDPOINT_HERE', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, password }),
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
        }*/
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
          <button type="submit" className="submit-btn">
            로그인
          </button>
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
