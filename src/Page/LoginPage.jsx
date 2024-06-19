import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../commonComponent/commonComponent.css';
import LoginComponent from '../Component/LoginComponent';

function LoginPage() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
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
        }
    };

    return (
        <div className="container" style={{ width: '600px' }}>
            <form onSubmit={handleSubmit}>
                <LoginComponent id={id} setId={setId} password={password} setPassword={setPassword} />
                <button
                    type="submit"
                    className="submit-btn"
                >
                    로그인
                </button>
            </form>
        </div>
    );
}

export default LoginPage;