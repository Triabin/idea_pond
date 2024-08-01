import { defineThemeConfig, plumeTheme } from 'vuepress-theme-plume';

export default defineThemeConfig({
    profile: {
        name: 'Triabin',
        description: '西南方向上的地平线，好像那年稻草堆上空的流星',
        avatar: '/images/Triabin.png',
        circle: false
    },
     theme: plumeTheme({
         plugins: {
             markdownPower: {
                 bilibili: true,
                 youtube: true,
                 pdf: true
             }
         }
     }),
});