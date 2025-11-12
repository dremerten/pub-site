import PageContainer from "./PageContainer.jsx";

const PageWrapper = ({ children }) => {
  return (
    <PageContainer fullHeight={true}>
      <div className="w-[90%] mx-auto">
        {children}
      </div>
    </PageContainer>
  );
};

export default PageWrapper;
