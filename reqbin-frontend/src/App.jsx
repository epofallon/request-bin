import { Routes, Route, Navigate } from "react-router-dom";
import "./css/main.css";
import Layout from "./components/Layout";
import BinList from "./components/BinList";
import Bin from "./components/Bin";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/bins" />} />
        <Route path="/bins" element={<BinList />} />
        <Route path="/bins/:binId" element={<Bin />} />
      </Routes>
    </Layout>
  );
};

export default App;
