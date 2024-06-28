import React from "react";
import PropTypes from "prop-types";
import "../commonComponent/commonComponent.css";
import cancelIcon from "../Img/cancelIcon.svg";
import styled from "styled-components";

function LoginComponent({ id, setId, password, setPassword }) {
  const handleClearId = () => setId("");
  const handleClearPassword = () => setPassword("");
  return (
    <div style={styles.loginContainer}>
      <h2 style={styles.h2}>로그인</h2>
      <div style={styles.formGroup}>
        <InputContainer>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디"
            required
            style={{ ...styles.input, ...styles.inputFocus }}
          />
          {id && (
            <img
              src={cancelIcon}
              alt="clear"
              style={InputContainer.img}
              onClick={handleClearId}
            />
          )}
        </InputContainer>
        <small style={styles.small}>
          영문과 숫자를 조합하여 5~10글자 미만으로 입력하여 주세요.
        </small>
      </div>
      <div style={styles.formGroup}>
        <InputContainer>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
            style={{ ...styles.input, ...styles.inputFocus }}
          />
          {password && (
            <img
              src={cancelIcon}
              alt="clear"
              style={InputContainer.img}
              onClick={handleClearPassword}
            />
          )}
        </InputContainer>

        <small style={styles.small}>
          영문과 숫자, 특수기호를 조합하여 8~14글자 미만으로 입력하여 주세요.
        </small>
      </div>
    </div>
  );
}

LoginComponent.propTypes = {
  id: PropTypes.any.isRequired,
  setId: PropTypes.any.isRequired,
  password: PropTypes.any.isRequired,
  setPassword: PropTypes.any.isRequired,
};

export default LoginComponent;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  padding: 0 2vh;
  font-size: 16px;
  border: 2px solid var(--colorGray);
  border-radius: 25px;
  box-sizing: border-box;
  img {
    height: 39%;
    cursor: pointer;
  }
`;

const styles = {
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50vh",
  },
  formGroup: {
    marginBottom: "10px",
    width: "100%",
    textAlign: "start",
  },
  input: {
    width: "90%",
    height: "33%",
    fontSize: "16px",
    border: "none",
  },
  inputFocus: {
    outline: "none",
    border: "none",
  },
  small: {
    display: "block",
    margin: "1vh",
    fontSize: "13px",
    color: "#999",
  },
  h2: {
    fontSize: "5vh",
    textAlign: "center",
    padding: "3vh 6vh",
    margin: "0 7vh 4vh",
  },
};
