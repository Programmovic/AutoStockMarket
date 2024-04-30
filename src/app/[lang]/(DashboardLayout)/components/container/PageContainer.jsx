import { Helmet, HelmetProvider } from "react-helmet-async";

const PageContainer = ({ title, description, children, params }) => {
console.log(params)
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
