import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
    bundler: viteBundler(),
    theme: plumeTheme({
        profile: {
          name: 'Triabin',
          description: '童年真是一场回不去的梦啊',
          avatar: '/images/Triabin.png',
          circle: false
        }
    }),

    lang: 'zh-CN',
    title: '半亩方塘',
    description: '半亩方塘一鉴开，天光云影共徘徊',
})