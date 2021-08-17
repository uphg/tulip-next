import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../Layout/Layout.vue'
import HomeLayout from '../Layout/HomeLayout.vue'
import NotFound from '../Layout/404.vue'
import { docs } from './docs'
import { components } from './components'
import Home from '../views/Home.vue'
import { DefineComponent, Component } from 'vue'

export interface LinkType {
  path: string;
  component: DefineComponent | Component;
  name?: string;
  redirect?: string;
  hidden?: boolean;
  meta?: { [key: string]: string };
  children?: LinkType[]
}

const history = createWebHistory()

export const routes: LinkType[] = [
  {
    path: '/',
    component: HomeLayout ,
    redirect: '/home',
    meta: { title: '首页' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: { title: '首页' },
        hidden: true
      }
    ]
  },
  {
    path: '/docs',
    name: 'Docs',
    component: Layout,
    meta: { title: '文档' },
    children: docs
  },
  {
    path: '/components',
    name: 'Components',
    component: Layout,
    meta: { title: '组件' },
    children: components
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    hidden: true
  }
]

export const router = createRouter({
  history,
  routes
})
