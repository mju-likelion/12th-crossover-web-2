import React from "react";
import styled from "styled-components";
import logo from "../Img/logoImge.svg";
import logout from "../Img/logoutIcon.svg";

const Header = () => {
  return (
    <HeaderContent>
      <LogoImage src={logo} alt="헤더 로고" />
      <LogoutButton src={logout} />
    </HeaderContent>
  );
};

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 10%;
  width: 100%;
  border-bottom: 1px solid #717171;
`;

const LogoImage = styled.img`
  height: 25px;
  margin: 10px 50px;
  cursor: pointer;
`;

const LogoutButton = styled.img`
  height: 20px;
  margin: 10px 50px;
  cursor: pointer;
`;

export default Header;
