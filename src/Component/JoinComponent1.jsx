import React, { useState } from 'react';

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
                        borderColor: idValid ? '#ccc' : 'red',
                    }}
                    onBlur={(e) => {
                        const isValid = validateId(e.target.value);
                        if (isValid) {
                            e.target.style.borderColor = 'green';
                            e.target.nextSibling.innerText = '사용 가능한 아이디 입니다.';
                            e.target.nextSibling.style.color = 'green';
                        } else {
                            e.target.nextSibling.innerText = '영문과 숫자를 조합하여 5~10글자 미만으로 입력하여 주세요.';
                            e.target.nextSibling.style.color = '#999';
                        }
                    }}
                />
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
                        borderColor: passwordValid ? '#ccc' : 'red',
                    }}
                    onBlur={(e) => {
                        const isValid = validatePassword(e.target.value);
                        if (isValid) {
                            e.target.style.borderColor = 'green';
                            e.target.nextSibling.innerText = '사용 가능한 비밀번호 입니다.';
                            e.target.nextSibling.style.color = 'green';
                        } else {
                            e.target.nextSibling.innerText = '영문과 숫자, 특수기호를 조합하여 8~14글자 미만으로 입력하여 주세요.';
                            e.target.nextSibling.style.color = '#999';
                        }
                    }}
                />
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
                        borderColor: emailValid ? '#ccc' : 'red',
                    }}
                    onBlur={(e) => {
                        const isValid = validateEmail(e.target.value);
                        if (isValid) {
                            e.target.style.borderColor = 'green';
                            e.target.nextSibling.innerText = '사용 가능한 이메일 입니다.';
                            e.target.nextSibling.style.color = 'green';
                        } else {
                            e.target.nextSibling.innerText = '사용하실 이메일을 입력해주세요.';
                            e.target.nextSibling.style.color = '#999';
                        }
                    }}
                />
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
                        borderColor: nameValid ? '#ccc' : 'red',
                    }}
                    onBlur={(e) => {
                        const isValid = validateName(e.target.value);
                        if (isValid) {
                            e.target.style.borderColor = 'green';
                            e.target.nextSibling.innerText = '유효한 이름 입니다.';
                            e.target.nextSibling.style.color = 'green';
                        } else {
                            e.target.nextSibling.innerText = '이름을 입력해주세요.';
                            e.target.nextSibling.style.color = '#999';
                        }
                    }}
                />
                <small style={styles.small}>이름을 입력해주세요.</small>
                {errors.name && <div style={styles.error}>{errors.name}</div>}
            </div>
        </div>
    );
}

export default JoinComponent1;

const styles = {
    joinContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        width: '600px',
        borderRadius: '10px',
    },
    formGroup: {
        marginBottom: '20px',
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
        borderColor: '#ccc',
        transition: 'border-color 0.3s ease-in-out',
    },
    small: {
        display: 'block',
        marginTop: '5px',
        fontSize: '12px',
        color: '#999',
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
};
