import PageContainer from "./PageContainer.jsx";

const PageWrapper = ({ children }) => {
  return (
    <PageContainer fullHeight={true}>
      <div className="w-[95%] md:w-[90%] mx-auto pt-4 md:pt-8 pb-12 md:pb-20">
        {children}
      </div>
    </PageContainer>
  );
};

export default PageWrapper;
