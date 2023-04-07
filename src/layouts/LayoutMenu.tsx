import React, { useEffect, useState } from 'react';
import { FILTER_MENUS } from '../router';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom'

function LayoutMenu() {
  const [path, setPath] = useState(useLocation().pathname);
  const [key, setKey] = useState(path.split('/').slice(path.split('/').length - 1).join());
  
  const navigate = useNavigate();

  useEffect(() => {
    
    if (path === '/') {
      navigate('/log');
    }
    let keys = path.split('/');
    setKey(keys.slice(keys.length - 1).join())
  }, [path, navigate])
  
  let pathArr = path.split('/').slice(1, -1);

  const onClick: MenuProps['onClick'] = (e) => {
    let keyPath = e.keyPath.reverse().join('/')
    setPath(keyPath)
    navigate(keyPath)
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultOpenKeys={[...pathArr]}
      defaultSelectedKeys={[key ? key : 'home']}
      items={FILTER_MENUS}
      onClick={onClick}
    />
  );
}

export default LayoutMenu;