import { Layout } from "antd";
import { useState, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";

import Header from "./Header";
import Sider from "./Sider";
import CreateRoutePage from "../pages/CreateRoutePage";
import RoutesListPage from "../pages/RoutesListPage";
import RouteInfoPage from "../pages/RouteInfoPage";
import FindPlacesPage from "../pages/FindPlacesPage";

const { Content } = Layout;

const HomepageLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const isMobile = useIsMobile();

  const SetLocalStorageAndRedirect = () => {
    useEffect(() => {
      localStorage.setItem("siderMenuActive", "create-route");
    }, []);

    return <Navigate to="/create-route" />;
  };

  return (
    <Layout hasSider style={{ background: "white", minHeight: "100dvh" }}>
      <Sider isCollapsed={isCollapsed} setIsCollapsed={() => setIsCollapsed(!isCollapsed)} />
      <Layout style={{ marginLeft: isMobile ? 0 : 300 }}>
        <Header setIsCollapsed={() => setIsCollapsed(!isCollapsed)} />
        <Content
          style={{
            padding: 0,
            minHeight: 280,
            position: "relative",
          }}
        >
          <Routes>
            <Route path="/" element={<SetLocalStorageAndRedirect />} />
            <Route path="create-route" element={<CreateRoutePage />} />
            <Route path="routes" element={<RoutesListPage />} />
            <Route path="routes/:id" element={<RouteInfoPage />} />
            <Route path="find-places" element={<FindPlacesPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomepageLayout;
