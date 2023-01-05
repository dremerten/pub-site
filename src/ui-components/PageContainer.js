import React from "react";
import styled from "styled-components";

const PageContainer = ({fullHeight=false, children}) => {
  const Container = styled("div")`
    display: flex;
    flex-flow: row;
    margin-left: auto;
    margin-right: auto;
    padding: 0 15px;
    width: 100%;
    
    ${() =>
      fullHeight &&
      `
        height: 100%;
      `
    };
    
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

  return (
    <Container>{ children }</Container>
  );
};

export default PageContainer;
