import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/emotion'
import blogEditor from '@/components/blog-editor'
import blogs from '@/components/blogs'
import test from '@/components/test'
import blog from '@/components/blog-detail'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/emotion',
      name: 'emotion',
      component: main
    },
    {
      path: '/blog-editor',
      name: 'blog-editor',
      component: blogEditor
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: blogs
    },
    {
      path: '/blogs/:id',
      name: 'blog',
      component: blog
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
