import TopBar from "./TopBar";

const Layout = ({ children }) => {
  return (
    <>
      <TopBar />
      {children}
    </>
  );
};

export default Layout;
