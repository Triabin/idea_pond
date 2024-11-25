<!-- 动态时钟组件 -->
<template>
  <div class="dynamic-clock">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// import { useDarkMode } from "vuepress-theme-plume/client";

const canvasRef = ref();
const ctx = ref();
// const isDark = useDarkMode();
const isDark = ref(false);

// 父组件数据
const props = defineProps({
  // 粒子颜色
  color: {
    type: String || Object,
    default: {
      light: "#5445544D",
      night: "#ABBAAB4D"
    }
  },

  // 字体
  font: {
    type: String,
    default: 'sans-serif'
  },

  // 字体大小
  fontSize: {
    type: Number,
    default: 240
  },

  // 粒子密度
  density: {
    type: Number,
    default: 6
  }
});

onMounted(async () => {
  canvasRef.value.width = props.fontSize * 8 * devicePixelRatio;
  canvasRef.value.height = props.fontSize * 2 * devicePixelRatio;
  draw();
});

// 获取指定范围内的随机整数
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// 时钟数字由一个个粒子构成，将每一个粒子当做一个对象，创建粒子对象
class Particle {
  private readonly r: number;
  private x: number;
  private y: number;

  constructor() {
    // 粒子半径
    this.r = randomInt(2 * devicePixelRatio, 7 * devicePixelRatio);
    // 环半径
    const ar = Math.min(canvasRef.value.width, canvasRef.value.height) / 2;
    // 粒子初始位置圆心与环圆心形成的夹角（随机）
    const rad = randomInt(0, 360) * Math.PI / 180; // 角度转换为弧度
    // 环圆心横坐标
    const ax = canvasRef.value.width / 2;
    // 环圆心纵坐标
    const ay = canvasRef.value.height / 2;
    // 粒子本身横坐标
    this.x = ax + ar * Math.cos(rad);
    // 粒子本身纵坐标
    this.y = ay + ar * Math.sin(rad);
  }

  // 绘制粒子
  draw() {
    ctx.value.beginPath();
    ctx.value.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.value.fillStyle = props.color?.light || '#5445544D';
    ctx.value.fill();
  }

  // 移动粒子
  moveTo(tx: number, ty: number) {
    const duration = 500; // 500ms运动时间
    // 设置起始坐标
    const sx = this.x, sy = this.y;
    // 计算横纵向速度
    const xSpeed = (tx - sx) / duration;
    const ySpeed = (ty - sy) / duration;
    // 记录开始运动时间
    const startTime = new Date();
    const _move = () => {
      const t = Date.now() - startTime.getMilliseconds(); // 当前已运动时间
      const currX = sx + xSpeed * t; // 当前x坐标 = 起始x坐标 + x坐标速度 * 当前已运动时间
      const currY = sy + ySpeed * t; // 当前y坐标 = 起始y坐标 + y坐标速度 * 当前已运动时间
      this.x = currX;
      this.y = currY;
      // 停止条件
      if (t >= duration) {
        this.x = tx;
        this.y = ty;
        return;
      }
      requestAnimationFrame(_move);
    }
    _move();
  }
}

// 用于存放粒子的数组
const particles = [];

// 清空画布函数
const clear = () => ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

// 重画粒子函数（每次移动都清空画布再重画，消除轨迹）
const draw = () => {
  if (!canvasRef.value) return;
  ctx.value = canvasRef.value.getContext('2d', {willReadFrequently: true});
  // 1. 清空画布
  clear();
  // 2. 更新粒子数量和坐标
  update();
  // 3. 画出每一个粒子
  for (let particle of particles) {
    particle.draw();
  }
  requestAnimationFrame(draw);
}

// 获取时间字符串
const getTimeStr = () => new Date().toTimeString().substring(0, 8);

// 更新画布粒子
let curTimeText = undefined;
const update = () => {
  // 判断差异，避免无意义更新
  const text = getTimeStr();
  if (text === curTimeText) {
    return;
  }
  curTimeText = text;

  // 画文字
  const {width, height} = canvasRef.value;
  ctx.value.fillStyle = '#000';
  ctx.value.textBaseline = 'middle';
  ctx.value.font = `normal bold ${props.fontSize * devicePixelRatio}px 'DS-Digital', ${props.font}`;
  ctx.value.textAlign = 'center';
  ctx.value.fillText(text, width / 2, height / 2);

  // 获取像素信息
  const points = getPoints();
  // 获取像素点后清空画布，重新通过粒子画出时间文字
  clear();
  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i];
    let p = particles[i];
    if (!p) {
      p = new Particle();
      particles.push(p);
    }
    p.moveTo(x, y);
  }
  if (points.length < particles.length) {
    particles.splice(points.length);
  }
};

// 从画布获取将要画的文字坐标
const getPoints = () => {
  const points = [];
  const {data} = ctx.value.getImageData(0, 0, canvasRef.value.width, canvasRef.value.height);
  const gap = props.density; // 设置步长，不需要获取所有像素点(步长越大，生成的粒子数量越小)
  for (let i = 0; i < canvasRef.value.width; i += gap) {
    for (let j = 0; j < canvasRef.value.height; j += gap) {
      const index = (i + j * canvasRef.value.width) * 4; // 每连续的四位为一个像素点的信息
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];
      // 判断是否为黑色像素，为黑色像素则为所需坐标
      if (r === 0 && g === 0 && b === 0 && a === 255) {
        points.push([i, j]);
      }
    }
  }
  return points;
}

</script>

<style lang="scss" scoped>
.dynamic-clock {
  position: relative;
  padding: 24px;
}

canvas {
  /*background: radial-gradient(#FFF, #8C738C);*/
  background: transparent;
  display: block;
  width: 100%;
  height: 100%;
}

.dynamic-clock {
  position: relative;
  padding: 24px;
}

@media (min-width: 640px) {
  .dynamic-clock {
    padding: 32px 48px;
  }
}

@media (min-width: 960px) {
  .dynamic-clock {
    padding: 48px;
  }
}

.dynamic-clock .container {
  width: 100%;
  max-width: 1152px;
  margin: 0 auto;
}

.dynamic-clock.full {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--vp-nav-height));
}
</style>