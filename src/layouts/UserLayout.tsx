import React, { useEffect, useState } from 'react';
import { MENUS, STATUS_CODE } from '../router'
import { useLocation, useRoutes } from 'react-router-dom'
import './index.css'

import {
  ConfigProvider,
  Layout,
  theme
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import LayoutMenu from './LayoutMenu'
import UserDetails from './UserDetails';
import Index from '../views/Log/Index';
const { Header, Sider, Content } = Layout;

const UserLayout = () => {
  const pathname = useLocation().pathname;
  const cookie = document.cookie;
  const [path, setPath] = useState(pathname);
  const [collapsed, setCollapsed] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    cookie.split(';').forEach(item => {
      if (item.indexOf('token=') !== -1) {
        let tokens = item.split('=');
        setToken(tokens[1])
      }
    });
  }, [cookie])

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let element = useRoutes([...MENUS, ...STATUS_CODE])
  
  useEffect(() => {
    setPath(pathname);
  },[pathname])

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
      {
        path === '/log' || path === '/' || !token ? 
        <Index /> : 
        <Layout style={{ height: '100%' }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <div style={{
              display: 'flex',
              height: '100%',
              flexDirection: 'column'
            }}>
              <div style={
                {
                  height: '48',
                  color: '#fff',
                  lineHeight: '48px',
                  textAlign: 'center',
                  fontSize: '16px'
                }}>
                xxx系统
              </div>
              <div style={{
                flex: 1,
                overflow: 'auto'
              }}>
                <LayoutMenu />
              </div>
            </div>
          </Sider>
          <Layout className="site-layout">
            <Header style={{
              zIndex: 1000,
              height: 48,
              fontSize: '20px',
              lineHeight: '28px',
              padding: '10px 16px',
              boxShadow: '0 6px 10px 0 rgb(0 0 0 / 6%), 0 0 5px 0 rgb(0 0 0 / 10%)',
              background: colorBgContainer,
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
              <UserDetails />
            </Header>
            <Content
              style={{
                height: '100%',
                overflow: 'auto',
                padding: 16,
                background: colorBgContainer,
              }}
            >
              {/* <Outlet /> */}
              { element }
            </Content>
          </Layout>
        </Layout>
      }
    </ConfigProvider>
  );
};

export default UserLayout;