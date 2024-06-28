import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../Api/Axios.js";
import "../commonComponent/commonComponent.css";
import JoinComponent1 from "../Component/JoinComponent1";
import JoinComponent2 from "../Component/JoinComponent2";

function JoinPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [clauseContent, setClauseContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClauseContent() {
      try {
        const response = await Axios.get('https://api.likelion-crossover-team2.com/auth/sign-up', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = response.data;
          if (data.data && data.data.clauseDtos && data.data.clauseDtos.length > 0) {
            setClauseContent(data.data.clauseDtos[0].content);
          } else {
            alert('약관 내용을 찾을 수 없습니다.');
          }
        }
      } catch (error) {
        console.error('회원가입 페이지 조회 오류:', error);
        alert('회원가입 페이지 조회 중 오류가 발생했습니다.');
      }
    }

    fetchClauseContent();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!agree) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        agree: "약관에 동의해 주세요."
      }));
      return;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        agree: ""
      }));
    }

    try {
      const response = await Axios.post('https://api.likelion-crossover-team2.com/auth/sign-up', {
        id: id,
        email: email,
        password: password,
        name: name,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('회원가입 성공.');
        navigate('/');  // 메인 페이지로 이동
      } else {
        const errorData = response.data;
        alert(`회원가입 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="container" style={{ width: "900px" }}>
      <form onSubmit={handleSubmit}>
        <JoinComponent1
          id={id}
          setId={setId}
          password={password}
          setPassword={setPassword}
          email={email}
          setEmail={setEmail}
          name={name}
          setName={setName}
          errors={errors}
        />
        <JoinComponent2
          agree={agree}
          setAgree={setAgree}
          error={errors.agree}
          policyText={clauseContent}
        />
        <button type="submit" className="submit-btn">
          완료하기
        </button>
      </form>
    </div>
  );
}

export default JoinPage;
