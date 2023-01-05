import React from "react";
import styled from "styled-components";

const Title = ({title}) => {
  const HeaderText = styled("h1")`
    font-size: 2.125rem;
    font-weight: 800;
  `;

  return (
    <HeaderText>{ title }</HeaderText>
  );
};

export default Title;
