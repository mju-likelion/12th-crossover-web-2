import React from 'react';
import '../commonComponent/commonComponent.css';

function LoginComponent({ id, setId, password, setPassword }) {
    return (
        <div style={styles.loginContainer}>
            <h2 style={styles.h2}>로그인</h2>
            <div style={styles.formGroup}>
                <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="아이디"
                    required
                    style={styles.input}
                />
                <small style={styles.small}>영문과 숫자를 조합하여 5~10글자 미만으로 입력하여 주세요.</small>
            </div>
            <div style={styles.formGroup}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    required
                    style={styles.input}
                />
                <small style={styles.small}>영문과 숫자, 특수기호를 조합하여 8~14글자 미만으로 입력하여 주세요.</small>
            </div>
        </div>
    );
}

export default LoginComponent;

const styles = {
    loginContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        width: '400px',
        borderRadius: '10px',
    },
    formGroup: {
        marginBottom: '20px',
        width: '100%',
    },
    input: {
        width: '100%',
        height: '60px',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid var(--colorGray)',
        borderRadius: '15px',
        boxSizing: 'border-box',
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
    }
};
