import React, { useEffect, useState } from "react";
import { FormOutlined, CompassOutlined, CloseOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps, Button } from "antd";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";

export interface Props {
  isCollapsed: boolean;
  setIsCollapsed: () => void;
}

const Sider = ({ isCollapsed, setIsCollapsed }: Props) => {
  const { Sider } = Layout;
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [activeKey, setActiveKey] = useState<string>(
    localStorage.getItem("siderMenuActive") || "create-route"
  );

  useEffect(() => {
    handleSetActiveMenu(localStorage.getItem("siderMenuActive") || "create-route");
  }, []);

  const handleSetActiveMenu = (key: string) => {
    setActiveKey(key);
    localStorage.setItem("siderMenuActive", key);
    navigate(key);
  };

  const siderMenuData: MenuProps["items"] = [
    {
      key: "create-route",
      icon: React.createElement(FormOutlined),
      label: "Створити маршрут ",
      onClick: () => {
        handleSetActiveMenu("create-route");
      },
    },
    {
      key: "routes",
      icon: React.createElement(CompassOutlined),
      label: "Працювати",
      onClick: () => {
        handleSetActiveMenu("routes");
      },
    },
    {
      key: "find-places",
      icon: React.createElement(CompassOutlined),
      label: "Знайти точки",
      onClick: () => {
        handleSetActiveMenu("find-places");
      },
    },
  ];

  return (
    <>
      <Sider
        width={300}
        className="!bg-white shadow-xl relative"
        trigger={null}
        style={{
          height: "100dvh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 20,
        }}
        collapsedWidth="0"
        collapsible
        collapsed={isMobile ? isCollapsed : false}
        onClick={setIsCollapsed}
      >
        <div className="absolute top-0 w-full pl-8 pt-8">
          <a onClick={() => handleSetActiveMenu("reate-route")}>
            <img
              src="https://ukrzoovet.com.ua/static/images/logo.svg?v=1643281256"
              className="w-7/12"
              alt=""
            />
          </a>
        </div>
        {isMobile && (
          <div className="absolute rounded-full right-4 top-4">
            <Button
              type="text"
              icon={<CloseOutlined style={{ fontSize: 20 }} />}
              onClick={setIsCollapsed}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </div>
        )}

        <div className="h-[100px]"></div>
        <Menu
          mode="inline"
          style={{ borderRight: 0 }}
          items={siderMenuData}
          selectedKeys={[activeKey]}
        />
      </Sider>
    </>
  );
};

export default Sider;
