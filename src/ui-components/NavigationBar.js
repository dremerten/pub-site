import React from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";

const NavigationBar = () => {
  const Flex = styled("div")`
    display: flex;
    align-items: center;
    padding: 2rem 1.5rem;
    border-bottom: 1px solid ${({theme}) => theme.navigationBorder};
    gap: 1.5rem;
  `;

  const LogoText = styled("span")`
    font-weight: 600;
    font-size: 2rem;
    padding-right: 2.5rem;
  `;

  return (
    <Flex>
      <LogoText>Andre Merten</LogoText>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/resume">Resume</NavLink>
      <NavLink to="/bookstack">BookStack</NavLink>
    </Flex>
  );
};

export default NavigationBar;
