import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
    base: '/',
    lang: 'zh-CN',
    title: 'PondsOfIdeas || 半亩方塘',
    description: '一方擅于记录的净土，一片属于我的“半亩方塘”',
    head: [['link', { rel: 'icon', href: '/images/favicon.png' }]],
    theme: plumeTheme(),
    bundler: viteBundler(),
    host: '192.168.2.101',
    port: '31002',
    markdown: {
        level: [1, 2, 3, 4]
    }
})