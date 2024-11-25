import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'PondsOfIdeas || 半亩方塘',
  description: '一方擅于记录的净土，一片属于我的“半亩方塘”',
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.png' }],
    ['meta', { name: 'referrer', content: 'no-referrer' }]
  ],
  bundler: viteBundler(),
  host: '192.168.2.101',
  port: 31002,
  theme: plumeTheme({
    plugins: {
      shiki: {
        twoslash: true // 对 typescript 和 vue 语言的 类型提示 支持
      }
    }
  })
})
