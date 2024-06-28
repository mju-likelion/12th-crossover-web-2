import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../Img/logoImge.svg";
import logout from "../Img/logoutIcon.svg";
import { useAuth } from "./AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isLogined, logouted } = useAuth();

  const handleLogoClick = () => {
    if (isLogined) {
      navigate("/main");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    logouted();
    navigate("/");
  };

  return (
    <HeaderContent>
      <LogoImage src={logo} alt="헤더 로고" onClick={handleLogoClick} />
      <LogoutButton
        src={logout}
        alt="로그아웃 버튼"
        onClick={handleLogout}
        isLogined={isLogined}
      />
    </HeaderContent>
  );
};

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10vh;
  width: 100%;
  border-bottom: 1px solid #717171;
`;

const LogoImage = styled.img`
  height: 30%;
  margin: 0 18%;
  cursor: pointer;
`;

const LogoutButton = styled.img`
  height: 30%;
  margin: 0 18%;
  opacity: ${(props) => (props.isLogined ? 1 : 0)};
  cursor: ${(props) => (props.isLogined ? "pointer" : "default")};
`;

export default Header;
