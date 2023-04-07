import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './index.css';
import { log, get } from '../../service/login';
import { useNavigate } from 'react-router-dom'

const Log: React.FC = (() => {

const [loadings, setLoadings] = useState<boolean>(false);
const navigate = useNavigate();

const onFinish = async (values: any) => {
  console.log('Success:', values);
  setLoadings(true);
  // let data = await log(values);
  // console.log(data);
  setTimeout(() => {
    document.cookie = 'token=chenji666';
    setLoadings(false);
    navigate('/home');
  }, 3000)
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

  return (
    <div className='log'>
      <Form
        className='form'
        name="normal_login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          wrapperCol={{ offset: 8, span: 16 }}
          rules={[
            { required: true, message: '名称不能为空!'},
            { min: 6, max: 18, message: '10~18个字符' },
            { 
              pattern: new RegExp(/^[0-9a-zA-Z_`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~!@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]{1,}$/, "g") , /* 以数字、大小写字母开头，至少有一位*/
              message: '名称只允许包含数字、字母和下划线特殊字符、6~18字符' 
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名"
          />
        </Form.Item>

        <Form.Item
          name="password"
          wrapperCol={{ offset: 8, span: 16 }}
          rules={[
            { required: true, message: '密码不能为空!'},
            { min: 6, max: 18, message: '10~18个字符' },
            { 
              pattern: new RegExp(/^[0-9a-zA-Z_`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~!@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]{1,}$/, "g") , /* 以数字、大小写字母开头，至少有一位*/
              message: '名称只允许包含数字、字母和下划线特殊字符、6~18字符' 
            }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>

        {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
            loading={loadings}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default Log;