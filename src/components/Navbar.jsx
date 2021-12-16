import { useState, useEffect } from "react";
import { Menu, Typography, Avatar } from "antd";
import {
  Menu as MenuChakra,
  MenuItem,
  MenuButton,
  MenuList,
  IconButton,
  Spacer,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import icon from "../images/cryptocurrency.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const menulists = [
    {
      name: "Home",
      path: "/",
      icon: <HomeOutlined />,
    },
    {
      name: "Cryptocurrencies",
      path: "/cryptocurrencies",
      icon: <FundOutlined />,
    },
    {
      name: "Exchanges",
      path: "/exchanges",
      icon: <MoneyCollectOutlined />,
    },
    {
      name: "News",
      path: "/news",
      icon: <BulbOutlined />,
    },
  ];
  return (
    <div className="nav-container">
      <div className="logo-container">
        <div className="logo-header">
          <Avatar src={icon} size="large" />
          <Typography.Title level={2} className="logo">
            <Link to="/">Cryptoverse</Link>
          </Typography.Title>
        </div>
        <Spacer />
        <MenuChakra>
          <MenuButton
            as={IconButton}
            display={activeMenu ? "none" : "non"}
            border={"none"}
            icon={<MenuOutlined />}
            variant="outline"
            bg={"#001529"}
            color="#1890FF"
            _hover={{ bg: "blue.800" }}
            _expanded={{ bg: "#001529" }}
          />
          <MenuList bg={"#001529"} color={"white"}>
            {menulists.map(({ name, path, icon }, index) => (
              <Link key={index} to={path}>
                <MenuItem
                  color={"white"}
                  _hover={{ bg: "blue.900" }}
                  icon={icon}
                >
                  {name}
                </MenuItem>
              </Link>
            ))}
          </MenuList>
        </MenuChakra>
        {activeMenu && (
          <Menu theme="dark">
            {menulists.map(({ name, path, icon }, index) => (
              <Menu.Item key={index} icon={icon}>
                <Link to={path}>{name}</Link>
              </Menu.Item>
            ))}
          </Menu>
        )}
      </div>
    </div>
  );
};

export default Navbar;
