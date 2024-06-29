import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import cancelIcon from "../Img/cancelIcon.svg";
import errorIcon from "../Img/errorIcon.svg";
import successIcon from "../Img/successIcon.svg";

function JoinComponent1({
  id,
  setId,
  password,
  setPassword,
  email,
  setEmail,
  name,
  setName,
  errors,
}) {
  const [idValid, setIdValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);

  const validateId = (value) => {
    const isValid = /^[a-zA-Z]+[a-zA-Z0-9]{4,9}$/.test(value);
    setIdValid(isValid);
    return isValid;
  };

  const validatePassword = (value) => {
    const isValid =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,14}$/.test(
        value,
      );
    setPasswordValid(isValid);
    return isValid;
  };

  const validateEmail = (value) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailValid(isValid);
    return isValid;
  };

  const validateName = (value) => {
    const isValid = value.trim().length >= 2;
    setNameValid(isValid);
    return isValid;
  };

  const clearInput = (setter) => {
    setter("");
  };

  const renderValidationIcon = (isValid, value) => {
    if (value === "") {
      return null;
    }
    return (
      <img
        src={isValid ? successIcon : errorIcon}
        alt={isValid ? "check-icon" : "error-icon"}
        style={styles.validationIcon}
      />
    );
  };

  const renderValidationMessage = (isValid, type, value) => {
    let description = "";
    switch (type) {
      case "아이디":
        description =
          "영문과 숫자를 조합하여 5~10글자 미만으로 입력하여 주세요.";
        break;
      case "비밀번호":
        description =
          "영문과 숫자, 특수기호를 조합하여 8~14글자 미만으로 입력하여 주세요.";
        break;
      case "이메일":
        description = "사용하실 이메일을 입력해주세요.";
        break;
      case "이름":
        description = "이름을 입력해주세요.";
        break;
      default:
        description = "입력해 주세요.";
        break;
    }

    if (value === "") {
      return (
        <small style={{ ...styles.small, visibility: "visible" }}>
          {description}
        </small>
      );
    }
    return (
      <small
        style={{
          ...styles.small,
          color: isValid ? "green" : "red",
          visibility: "visible",
        }}
      >
        {isValid ? `사용 가능한 ${type} 입니다.` : description}
      </small>
    );
  };

  return (
    <div style={styles.joinContainer}>
      <h2 style={styles.h2}>회원가입</h2>
      <div style={styles.formGroup}>
        <InputContainer
          style={{
            borderColor: idValid ? "gray" : "red",
          }}
        >
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디"
            required
            style={{
              ...styles.input,
              ...styles.inputFocus,
              borderColor: idValid ? "gray" : "red",
            }}
            onBlur={(e) => {
              validateId(e.target.value);
            }}
          />
          {renderValidationIcon(idValid, id)}
          <img
            src={cancelIcon}
            alt="cancel-icon"
            style={styles.cancelIcon}
            onClick={() => clearInput(setId)}
          />
        </InputContainer>
        {renderValidationMessage(idValid, "아이디", id)}
        {errors.id && <div style={styles.error}>{errors.id}</div>}
      </div>
      <div style={styles.formGroup}>
        <InputContainer
          style={{
            borderColor: passwordValid ? "gray" : "red",
          }}
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
            style={{
              ...styles.input,
              ...styles.inputFocus,
              borderColor: passwordValid ? "gray" : "red",
            }}
            onBlur={(e) => {
              validatePassword(e.target.value);
            }}
          />
          {renderValidationIcon(passwordValid, password)}
          <img
            src={cancelIcon}
            alt="cancel-icon"
            style={styles.cancelIcon}
            onClick={() => clearInput(setPassword)}
          />
        </InputContainer>
        {renderValidationMessage(passwordValid, "비밀번호", password)}
        {errors.password && <div style={styles.error}>{errors.password}</div>}
      </div>
      <div style={styles.formGroup}>
        <InputContainer
          style={{
            borderColor: emailValid ? "gray" : "red",
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            required
            style={{
              ...styles.input,
              ...styles.inputFocus,
              borderColor: emailValid ? "gray" : "red",
            }}
            onBlur={(e) => {
              validateEmail(e.target.value);
            }}
          />
          {renderValidationIcon(emailValid, email)}
          <img
            src={cancelIcon}
            alt="cancel-icon"
            style={styles.cancelIcon}
            onClick={() => clearInput(setEmail)}
          />
        </InputContainer>
        {renderValidationMessage(emailValid, "이메일", email)}
        {errors.email && <div style={styles.error}>{errors.email}</div>}
      </div>
      <div style={styles.formGroup}>
        <InputContainer
          style={{
            borderColor: nameValid ? "gray" : "red",
          }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            required
            style={{
              ...styles.input,
              ...styles.inputFocus,
              borderColor: nameValid ? "gray" : "red",
            }}
            onBlur={(e) => {
              validateName(e.target.value);
            }}
          />
          {renderValidationIcon(nameValid, name)}
          <img
            src={cancelIcon}
            alt="cancel-icon"
            style={styles.cancelIcon}
            onClick={() => clearInput(setName)}
          />
        </InputContainer>
        {renderValidationMessage(nameValid, "이름", name)}
        {errors.name && <div style={styles.error}>{errors.name}</div>}
      </div>
    </div>
  );
}

JoinComponent1.propTypes = {
  id: PropTypes.string.isRequired,
  setId: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

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
  transition: border-color 0.3s ease-in-out;
  border-radius: 25px;
  box-sizing: border-box;
`;

const styles = {
  joinContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    width: "50vh",
    borderRadius: "10px",
  },
  formGroup: {
    position: "relative",
    width: "100%",
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
    textAlign: "left",
    fontSize: "12px",
    color: "#999",
    visibility: "hidden",
  },
  h2: {
    fontSize: "5vh",
    textAlign: "center",
    padding: "3vh 6vh",
    margin: "2vh 7vh",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
  cancelIcon: {
    height: "39%",
    cursor: "pointer",
  },
  validationIcon: {
    margin: "2%",
    height: "39%",
    cursor: "pointer",
  },
};

export default JoinComponent1;
