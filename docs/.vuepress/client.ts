import { defineClientConfig } from 'vuepress/client';
import DynamicClock from './components/DynamicClock.vue';
import './styles/index.css';

export default defineClientConfig({
  enhance({ app }) {
    app.component('dynamic-clock', DynamicClock)
  },
})