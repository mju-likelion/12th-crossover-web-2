import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Axios from "../Api/Axios";
import "../commonComponent/commonComponent.css";
import LoginComponent from "../Component/LoginComponent";
import { useAuth } from "../Component/AuthContext";

function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();
  const { logined } = useAuth();

  useEffect(() => {
    const idPattern = /^[a-zA-Z0-9]{5,10}$/;
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,14}$/;
    setIsValid(idPattern.test(id) && passwordPattern.test(password));
  }, [id, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post("/auth/login", { id, password });
      if (response.status === 200) {
        alert("로그인 성공!");
        Cookies.set("userToken", response.data.token);
        logined();
        navigate("/main");
      } else {
        alert(`로그인 실패: ${response.data.message}`);
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  const handleSignUp = () => {
    navigate("/join");
  };

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <LoginComponent
          id={id}
          setId={setId}
          password={password}
          setPassword={setPassword}
        />
        <div style={styles.footer}>
          <SubmitButton
            type="submit"
            className="submit-btn"
            disabled={!isValid}
          >
            로그인
          </SubmitButton>
          <SignUpButton onClick={handleSignUp}>회원가입</SignUpButton>
        </div>
      </form>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const SignUpButton = styled.button`
  font-size: 16px;
  color: var(--colorGray);
  font-weight: 600;
  border: none;
  background: none;
  margin-top: 2vh;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background-color: ${(props) =>
    props.disabled ? "var(--colorBlue1)" : "#59A4FB"};
  color: white;
  font-size: 3vh;
  font-weight: bold;
  border: none;
  margin-top: 3vh;
`;

const styles = {
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
  },
  submitButton: {
    flex: 1,
    marginBottom: "10px",
  },
};

export default LoginPage;
