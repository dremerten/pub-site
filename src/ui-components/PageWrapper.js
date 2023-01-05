import React from "react";
import styled from "styled-components";
import PageContainer from "./PageContainer";

const PageWrapper = ({children}) => {
  const Page = styled("div")`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  `;

  return (
    <PageContainer fullHeight={true}>
      <Page>
        { children }
      </Page>
    </PageContainer>
  );
};

export default PageWrapper;
