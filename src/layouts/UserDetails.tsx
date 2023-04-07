import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom'

const UserDetails: React.FC = () => {

  const navigate = useNavigate()

  const onLogOut = () => {
    navigate('/log');
    let date=new Date();
    //将date设置为过去的时间
    date.setTime(date.getTime()-10000);
    //将ytoken这个cookie删除
    document.cookie="token=''; expire="+date.toString();
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span
          style={{ color: 'red' }}
          onClick={onLogOut}
        >
          退出登录
        </span>
      )
    }
  ];

  return (
    <div style={{
      fontSize: '12px',
      display: 'flex'
    }}>
      欢迎adinm
      <Dropdown menu={{ items }} placement="bottomLeft" arrow>
        <div style={{
          width: 32,
            height: 32,
            marginLeft: '10px',
            borderRadius: '50%',
            backgroundColor: '#ccc',
            verticalAlign: 'middle'
          }} />
        </Dropdown>
    </div>
  );
};

export default UserDetails;