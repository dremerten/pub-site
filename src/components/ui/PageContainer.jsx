import { cn } from "@/lib/utils";

const PageContainer = ({ fullHeight = false, children }) => {
  return (
    <div
      className={cn(
        "flex flex-row mx-auto px-[15px] w-full",
        // "sm:max-w-[600px]",
        // "min-[1000px]:flex-row min-[1000px]:flex-auto min-[1000px]:max-w-[970px]",
        // "min-[1200px]:max-w-[1140px]",
        fullHeight && "h-full",
        "p-1"
      )}
    >
      {children}
    </div>
  );
};

export default PageContainer;
