import { defineThemeConfig, plumeTheme } from 'vuepress-theme-plume';

export default defineThemeConfig({
  profile: {
    avatar: '/images/Triabin.png',
    name: 'Triabin',
    description: '西南方向上的地平线，好像那年稻草堆上空的流星',
    circle: true,
    location: '天空之城',
    organization: '牛马群',
    layout: 'right'
  },
  blog: { link: '/blog/', include: ['**/*.md'], exclude: [], pagination: 20, tags: true, tagsLink: '/blog/tags/' },
  social: [
    { icon: 'bilibili', link: 'https://space.bilibili.com/258796029' },
    { icon: 'github', link: 'https://github.com/Triabin' },
  ],
  navbarSocialInclude: ['github', 'bilibili'],
  navbar: [
    // icon字段参见：https://icon-sets.iconify.design/
    { text: '首页', link: '/blog/', icon: 'tabler:home-filled' },
    {
      text: '编程语言',
      prefix: '/coding/',
      items: [
        { text: 'C/C++', link: 'c-cpp/' },
        { text: 'Java', link: 'java/' },
        { text: 'Python', link: 'python/' },
        { text: '前端', link: 'front-end/' },
        { text: '仓颉', link: 'cangjie/' }
      ]
    },
    { text: '笔记', link: '/notes/' },
    { text: '博客', link: '/blog/' },
    '/favorites/index'
  ],
  outline: [1, 4],
  // 是否启用过渡动画(boolean | ThemeTransition )
  transition: {
    /**
   * 是否启用 页面间跳转过渡动画
   * @default true
   */
    page: true,

    /**
   * 是否启用 博客文章列表过渡动画
   * @default true
   */
    postList: true,

    /**
     * 是否启用 深色/浅色 模式切换过渡动画或配置过渡动画类型(boolean | 'fade' | 'circle-clip' | 'horizontal-clip' | 'vertical-clip' | 'skew-clip')
     * @default 'fade'
     */
    appearance: 'fade'
  },

  /** 
   * 页脚配置（false | { message: string; copyright: string }）
   * @default { message: 'Powered by VuePress & vuepress-theme-plume', copyright: '' }
   */
  footer: false,

  returnToTopLabel: '返回顶部',

  notes: false
});
