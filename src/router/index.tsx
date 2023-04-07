import  { lazy, Suspense } from 'react';
import type { ReactNode, ComponentProps } from 'react';
import {
  AppstoreOutlined,
} from '@ant-design/icons';
import Index from '../views/Index';
// import Home from '../views/Home';
const Home = lazy(() => import('@/views/Home'));
const Log = lazy(() => import('@/views/Log/Index'))
const ForFinding = lazy(() => import('@/ForFinding/Index'));

interface MenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  path?: string;
  permission?: number;
  hidden?: Boolean;
  children?: MenuItem[];
  element?: ComponentProps<any>;
}

export const MENUS: MenuItem[] = [
  {
    key: 'home',
    label: '首页',
    path: '/home',
    permission: 1,
    icon: <AppstoreOutlined />,
    element: <Index />
  },
  {
    key: 'data_a',
    path: '/data_a',
    label: '数据管理',
    permission: 1,
    icon: <AppstoreOutlined />,
    children: [
      {
        key: 'data_aa',
        label: '数据列表',
        path: 'data_aa',
        permission: 1,
        element: (
          // react懒加载，必须要fallback 可以加 loading
          <Suspense fallback={<></>}>
            <Home />
          </Suspense>
        )
      },
      {
        key: 'data_ab',
        label: '数据展示',
        path: 'data_ab',
        hidden: true,
        element: (
          // react懒加载，必须要fallback 可以加 loading
          <Suspense fallback={<></>}>
            <Index />
          </Suspense>
        )
      }
    ]
  },
  {
    key: 'data_b',
    path: '/data_b',
    label: '用户管理',
    permission: 1,
    icon: <AppstoreOutlined />,
    children: [
      {
        key: 'data_bb',
        label: '数据列表',
        path: 'data_bb',
        permission: 1,
        element: (
          <Suspense fallback={<></>}>
            <Index />
          </Suspense>
        )
      }
    ]
  },
  {
    key: 'log',
    label: '登录页',
    path: '/log',
    hidden: true,
    element: (
      <Suspense fallback={<></>}>
        <Log />
      </Suspense>
    )
  },
];

export const STATUS_CODE: MenuItem[] = [
  {
    key: '/404',
    path: '*',
    label: '',
    element: (
      <Suspense fallback={<></>}>
        <ForFinding />
      </Suspense>
    )
  }
]

export const FILTER_MENUS = onChildren(MENUS);

function onChildren(data: any) {
  return data.map((item: any) => {
    if (item.permission === 1 && !item.hidden) {
      if (item.children && item.children?.length > 0) {
        return {
          ...item,
          children: onChildren(item.children)
        }
      }
      return item
    } else {
      return null
    }
  })
}



