import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        const response = await fetch('likelion-crossover-team2.com/auth/sign-up', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          if (data.data && data.data.clauseDtos && data.data.clauseDtos.length > 0) {
            setClauseContent(data.data.clauseDtos[0].content);
          }
        } else {
          alert('회원가입 페이지 조회에 실패했습니다.');
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
      const response = await fetch('likelion-crossover-team2.com/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id,
          email: email,
          password: password,
          name: name,
        }),
      });

      if (response.status === 201) {
        alert('회원가입에 성공하였습니다.');
        navigate("/");
      } else {
        const data = await response.json();
        alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
        setErrors(data.errors || {});
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
          clauseContent={clauseContent}
        />
        <button type="submit" className="submit-btn">
          완료하기
        </button>
      </form>
    </div>
  );
}

export default JoinPage;
