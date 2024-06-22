import PropTypes from "prop-types";
import React, { useState } from 'react';
import cancelIcon from '../Img/cancelIcon.svg';
import errorIcon from '../Img/errorIcon.svg';
import successIcon from '../Img/successIcon.svg';

function JoinComponent1({ id, setId, password, setPassword, email, setEmail, name, setName, errors }) {
    const [idValid, setIdValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [nameValid, setNameValid] = useState(true);

    const validateId = (value) => {
        const isValid = /^[a-zA-Z0-9]{5,10}$/.test(value);
        setIdValid(isValid);
        return isValid;
    };

    const validatePassword = (value) => {
        const isValid = /^[a-zA-Z0-9!@#$%^&*()_+]{8,14}$/.test(value);
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
        setter('');
    };

    const renderValidationIcon = (isValid, value) => {
        if (value === '') {
            return null; // 값이 비어 있으면 아이콘 숨김
        }
        if (isValid === true) {
            return <img src={successIcon} alt="check-icon" style={styles.validationIcon} />;
        } else if (isValid === false) {
            return <img src={errorIcon} alt="error-icon" style={styles.validationIcon} />;
        }
        return null;
    };

    const renderValidationMessage = (isValid, type, value) => {
        if (value === '') {
            return <small style={{ ...styles.small, visibility: 'visible' }}>영문과 숫자를 조합하여 5~10글자 미만으로 입력하여 주세요.</small>;
        }
        if (isValid === true) {
            return <small style={{ ...styles.small, color: 'green', visibility: 'visible' }}>사용 가능한 {type} 입니다.</small>;
        } else if (isValid === false) {
            return <small style={{ ...styles.small, color: 'red', visibility: 'visible' }}>{type}를 잘못 입력하셨습니다. 다시 입력해주세요.</small>;
        }
        return null;
    };
    

    return (
        <div style={styles.joinContainer}>
            <h2 style={styles.h2}>회원가입</h2>
            <div style={styles.formGroup}>
                <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="아이디"
                    required
                    style={{
                        ...styles.input,
                        ...(idValid ? styles.validInput : styles.invalidInput),
                    }}
                    onBlur={(e) => {
                        const isValid = validateId(e.target.value);
                        setIdValid(isValid);
                    }}
                />
                <img
                    src={cancelIcon}
                    alt="cancel-icon"
                    style={styles.cancelIcon}
                    onClick={() => clearInput(setId)}
                />
                {renderValidationIcon(idValid, id)}
                {renderValidationMessage(idValid, '아이디', id)}
                <small style={styles.small}>영문과 숫자를 조합하여 5~10글자 미만으로 입력하여 주세요.</small>
                {errors.id && <div style={styles.error}>{errors.id}</div>}
            </div>
            <div style={styles.formGroup}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    required
                    style={{
                        ...styles.input,
                        ...(passwordValid ? styles.validInput : styles.invalidInput),
                    }}
                    onBlur={(e) => {
                        const isValid = validatePassword(e.target.value);
                        setPasswordValid(isValid);
                    }}
                />
                <img
                    src={cancelIcon}
                    alt="cancel-icon"
                    style={styles.cancelIcon}
                    onClick={() => clearInput(setPassword)}
                />
                {renderValidationIcon(passwordValid, password)}
                {renderValidationMessage(passwordValid, '비밀번호', password)}
                <small style={styles.small}>영문과 숫자, 특수기호를 조합하여 8~14글자 미만으로 입력하여 주세요.</small>
                {errors.password && <div style={styles.error}>{errors.password}</div>}
            </div>
            <div style={styles.formGroup}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                    required
                    style={{
                        ...styles.input,
                        ...(emailValid ? styles.validInput : styles.invalidInput),
                    }}
                    onBlur={(e) => {
                        const isValid = validateEmail(e.target.value);
                        setEmailValid(isValid);
                    }}
                />
                <img
                    src={cancelIcon}
                    alt="cancel-icon"
                    style={styles.cancelIcon}
                    onClick={() => clearInput(setEmail)}
                />
                {renderValidationIcon(emailValid, email)}
                {renderValidationMessage(emailValid, '이메일', email)}
                <small style={styles.small}>사용하실 이메일을 입력해주세요.</small>
                {errors.email && <div style={styles.error}>{errors.email}</div>}
            </div>
            <div style={styles.formGroup}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름"
                    required
                    style={{
                        ...styles.input,
                        ...(nameValid ? styles.validInput : styles.invalidInput),
                    }}
                    onBlur={(e) => {
                        const isValid = validateName(e.target.value);
                        setNameValid(isValid);
                    }}
                />
                <img
                    src={cancelIcon}
                    alt="cancel-icon"
                    style={styles.cancelIcon}
                    onClick={() => clearInput(setName)}
                />
                {renderValidationIcon(nameValid, name)}
                {renderValidationMessage(nameValid, '이름', name)}
                <small style={styles.small}>이름을 입력해주세요.</small>
                {errors.name && <div style={styles.error}>{errors.name}</div>}
            </div>
        </div>
    );
}

JoinComponent1.propTypes = {
    id: PropTypes.any.isRequired,
    setId: PropTypes.any.isRequired,
    password: PropTypes.any.isRequired,
    setPassword: PropTypes.any.isRequired,
    email: PropTypes.any.isRequired,
    setEmail: PropTypes.any.isRequired,
    name: PropTypes.any.isRequired,
    setName: PropTypes.any.isRequired,
    errors: PropTypes.any.isRequired
};

const styles = {
    joinContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        width: '600px',
        borderRadius: '10px',
        marginLeft: '140px',
    },
    formGroup: {
        position: 'relative',
        width: '100%',
    },
    input: {
        width: '330px',
        height: '50px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '15px',
        boxSizing: 'border-box',
        borderWidth: '2px',
        borderStyle: 'solid',
        transition: 'border-color 0.3s ease-in-out',
        marginBottom: '5px',
    },
    invalidInput: {
        borderColor: 'red',
    },
    validInput: {
        borderColor: 'green',
    },
    small: {
        display: 'block',
        marginTop: '5px',
        fontSize: '12px',
        color: '#999',
        visibility: 'hidden',
    },
    h2: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    error: {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px',
    },
    cancelIcon: {
        position: 'absolute',
        right: '150px',
        top: '10px',
        width: '25px',
        height: '25px',
        cursor: 'pointer',
    },
    validationIcon: {
        position: 'absolute',
        right: '180px',
        top: '10px',
        width: '25px',
        height: '25px',

    },
};

export default JoinComponent1;
