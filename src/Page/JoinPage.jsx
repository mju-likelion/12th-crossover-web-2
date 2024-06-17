import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../commonComponent/commonComponent.css';
import JoinComponent1 from '../Component/JoinComponent1';
import JoinComponent2 from '../Component/JoinComponent2';

function JoinPage() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [agree, setAgree] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!agree) {
            alert('약관에 동의해 주세요.');
            return;
        }
        alert(`ID: ${id}, Password: ${password}, Email: ${email}`);
        navigate('/Main');
    };

    return (
        <div className="container" style={{ width: '600px' }}>
            <form onSubmit={handleSubmit}>
                <JoinComponent1 
                    id={id} 
                    setId={setId} 
                    password={password} 
                    setPassword={setPassword} 
                    email={email} 
                    setEmail={setEmail} 
                />
                <JoinComponent2 
                    agree={agree} 
                    setAgree={setAgree} 
                />
                <button
                    type="submit"
                    className="submit-btn"
                >
                    완료하기
                </button>
            </form>
        </div>
    );
}

export default JoinPage;
