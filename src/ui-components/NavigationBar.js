import React from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";

const NavigationBar = () => {
  const Header = styled("header")`
    padding: 40px 0;
    transition: all 0.5s ease 0s;
  `;

  const NavBox = styled("div")`
    align-items: center;
    padding: 0.5rem 1rem;
  `;

  const Container = styled("div")`
    display: flex;
    flex-flow: row;
    margin-left: auto;
    margin-right: auto;
    padding: 0 15px;
    width: 100%;
    
    @media (min-width: 640px) {
      max-width: 600px;
    }

    @media (min-width: 1000px) {
      flex-direction: row;
      flex-basis: auto;
      max-width: 970px;
    }

    @media (min-width: 1200px) {
      max-width: 1140px;
    }
  `;

  const LogoText = styled("span")`
    font-family: Blorado, sans-serif;
    font-weight: 600;
    font-size: 2rem;
    padding-right: 2.5rem;
  `;

  const HeaderLinks = styled("div")`
    display: flex;
    align-items: center;
    margin-left: auto;
    gap: 1.25rem;
    
    @media (min-width: 640px) {
      flex-direction: column;
    }
    
    @media (min-width: 1000px) {
      flex-direction: row;
    }
  `;

  const Link = styled(NavLink)`
    position: relative;
    padding: 8px 12px;
    color: ${({theme}) => theme.navigationLinkColor};
    
    &::before {
      bottom: 1.5px;
      height: 1px;
      left: 51%;
      right: 51%;
      z-index: -1;
      content: "";
      background: ${({theme}) => theme.navigationLinkHover};
      position: absolute;
      transition: left,right 0.3s ease-out;
    }
    
    &:hover::before {
      left: 0;
      right: 0;
    }
  `;

  return (
    <Header>
      <NavBox>
        <Container>
          <LogoText>Andre Merten</LogoText>
          <HeaderLinks>
            <Link to="/about">About</Link>
            <Link to="/resume">Resume</Link>
            <Link to="/bookstack">BookStack</Link>
          </HeaderLinks>
        </Container>
      </NavBox>
    </Header>
  );
};

export default NavigationBar;
