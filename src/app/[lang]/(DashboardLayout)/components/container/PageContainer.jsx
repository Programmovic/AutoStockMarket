import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRouter } from "next/navigation";

const PageContainer = ({ title, description, children }) => {
  const router = useRouter();

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>{`ASM ${title ? `| ${title}` : ""}`}</title>
          <meta name="description" content={description || ""} />
        </Helmet>
        {children}
      </div>
    </HelmetProvider>
  );
};

export default PageContainer;
