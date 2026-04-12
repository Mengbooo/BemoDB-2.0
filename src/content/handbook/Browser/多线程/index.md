---
title: 'JavaScript 多线程完全指南'
publishDate: '2026-03-09 08:00:00'
description: '自顶向下深入理解 JavaScript 多线程：从单线程困境到并发解决方案'
tags:
  - Browser
  - JavaScript
  - Concurrency
language: 'zh-CN'
---

## 为什么需要多线程？

JavaScript 本质上是单线程的，这意味着所有任务（UI 渲染、用户交互、JS 代码执行）都在同一个主线程上排队执行。如果一个任务耗时过长，整个页面就会被"冻结"，无法响应用户操作，造成卡顿。

想象一下这些场景：
- 处理大量数据计算（图像处理、加密解密）
- 解析大型 JSON 文件
- 复杂的数学运算
- 实时音视频处理

这些任务如果在主线程执行，用户界面就会完全失去响应。为了解决这个根本性问题，JavaScript 生态演化出了多层次的并发解决方案。

## 一、应用层：异步编程模式

在真正的多线程出现之前，JavaScript 通过事件循环和异步编程来"模拟"并发，让耗时操作不阻塞主线程。

### 1.1 基础异步 API

```javascript
// setTimeout/setInterval - 延迟执行
setTimeout(() => {
  console.log('1秒后执行');
}, 1000);

// requestAnimationFrame - 动画优化
function animate() {
  // 更新动画
  requestAnimationFrame(animate);
}

// requestIdleCallback - 空闲时执行
requestIdleCallback(() => {
  // 在浏览器空闲时执行低优先级任务
});
```

### 1.2 Promise 和 async/await

```javascript
// Promise 链式调用
fetch('/api/data')
  .then(response => response.json())
  .then(data => processData(data))
  .catch(error => console.error(error));

// async/await 语法糖
async function loadData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return processData(data);
  } catch (error) {
    console.error(error);
  }
}
```

**局限性**：这些方案本质上仍是单线程，只是通过事件循环让出执行权，无法真正并行计算。

## 二、Worker 层：真正的多线程

浏览器引入了 Worker API，允许在独立线程中执行 JavaScript 代码，实现真正的并行计算。

### 2.1 Web Worker - 计算密集型任务

Web Worker 是最基础的多线程方案，专门用于执行耗时的计算任务。

**主线程代码**：
```javascript
// 创建 Worker
const worker = new Worker('worker.js');

// 发送数据
worker.postMessage({ data: largeArray });

// 接收结果
worker.onmessage = (e) => {
  console.log('计算结果:', e.data);
};

// 错误处理
worker.onerror = (error) => {
  console.error('Worker 错误:', error);
};

// 终止 Worker
worker.terminate();
```

**worker.js**：
```javascript
// Worker 线程代码
self.onmessage = (e) => {
  const result = heavyComputation(e.data);
  self.postMessage(result);
};

function heavyComputation(data) {
  // 执行复杂计算
  return data.map(x => x * x).reduce((a, b) => a + b);
}
```

**特点**：
- 独立的全局作用域，无法访问 DOM
- 通过消息传递通信（结构化克隆）
- 适合 CPU 密集型任务

### 2.2 Shared Worker - 跨页面共享

Shared Worker 可以被多个浏览器标签页或 iframe 共享，适合需要跨页面协调的场景。

```javascript
// 多个页面可以连接同一个 Shared Worker
const worker = new SharedWorker('shared-worker.js');

worker.port.onmessage = (e) => {
  console.log('收到消息:', e.data);
};

worker.port.postMessage('Hello from page');
```

**shared-worker.js**：
```javascript
const connections = [];

self.onconnect = (e) => {
  const port = e.ports[0];
  connections.push(port);

  port.onmessage = (e) => {
    // 广播给所有连接的页面
    connections.forEach(p => p.postMessage(e.data));
  };
};
```

### 2.3 Service Worker - 网络代理和离线支持

Service Worker 是一个特殊的 Worker，运行在浏览器后台，充当网络代理的角色。

```javascript
// 注册 Service Worker
navigator.serviceWorker.register('/sw.js').then(registration => {
  console.log('Service Worker 注册成功');
});
```

**sw.js**：
```javascript
// 安装阶段 - 缓存资源
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll(['/index.html', '/style.css', '/app.js']);
    })
  );
});

// 拦截网络请求
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

// 后台同步
self.addEventListener('sync', (e) => {
  if (e.tag === 'sync-data') {
    e.waitUntil(syncData());
  }
});

// 推送通知
self.addEventListener('push', (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/icon.png'
  });
});
```

**应用场景**：
- PWA 离线支持
- 缓存策略管理
- 后台数据同步
- 推送通知

## 三、Worklet 层：高性能渲染管线

Worklet 是轻量级的 Worker，专门用于浏览器渲染管线的特定阶段，性能开销更小。

### 3.1 Audio Worklet - 音频处理

```javascript
// 加载 Audio Worklet
await audioContext.audioWorklet.addModule('processor.js');

// 创建处理器节点
const node = new AudioWorkletNode(audioContext, 'my-processor');
```

**processor.js**：
```javascript
class MyProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];

    // 实时音频处理
    for (let channel = 0; channel < output.length; channel++) {
      for (let i = 0; i < output[channel].length; i++) {
        output[channel][i] = input[channel][i] * 0.5; // 降低音量
      }
    }

    return true; // 继续处理
  }
}

registerProcessor('my-processor', MyProcessor);
```

### 3.2 Paint Worklet - 自定义绘制

```javascript
// 注册 Paint Worklet
CSS.paintWorklet.addModule('paint.js');
```

**paint.js**：
```javascript
class CheckerboardPainter {
  paint(ctx, size, properties) {
    const colors = ['#fff', '#000'];
    const squareSize = 20;

    for (let y = 0; y < size.height / squareSize; y++) {
      for (let x = 0; x < size.width / squareSize; x++) {
        ctx.fillStyle = colors[(x + y) % 2];
        ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
      }
    }
  }
}

registerPaint('checkerboard', CheckerboardPainter);
```

**CSS 使用**：
```css
.element {
  background-image: paint(checkerboard);
}
```

### 3.3 Animation Worklet - 高性能动画

```javascript
await CSS.animationWorklet.addModule('animator.js');

const animation = new WorkletAnimation(
  'my-animator',
  new KeyframeEffect(element, keyframes, options)
);
animation.play();
```

## 四、底层：共享内存和原子操作

对于需要极致性能的场景，JavaScript 提供了共享内存机制。

### 4.1 SharedArrayBuffer

```javascript
// 主线程创建共享内存
const sharedBuffer = new SharedArrayBuffer(1024);
const sharedArray = new Int32Array(sharedBuffer);

// 发送给 Worker
worker.postMessage(sharedBuffer);

// Worker 可以直接读写同一块内存
// worker.js
self.onmessage = (e) => {
  const sharedArray = new Int32Array(e.data);
  sharedArray[0] = 42; // 主线程可以立即看到变化
};
```

### 4.2 Atomics - 原子操作

```javascript
const sharedArray = new Int32Array(sharedBuffer);

// 原子加法
Atomics.add(sharedArray, 0, 5);

// 原子比较交换
Atomics.compareExchange(sharedArray, 0, 5, 10);

// 等待通知（阻塞）
Atomics.wait(sharedArray, 0, 0);

// 唤醒等待的线程
Atomics.notify(sharedArray, 0, 1);
```

**应用场景**：
- 多线程协调和同步
- 实现锁和信号量
- 高性能数据共享

## 五、WebAssembly Threads

WebAssembly 支持真正的多线程，配合 SharedArrayBuffer 可以实现接近原生的性能。

```javascript
// 加载支持多线程的 WASM 模块
const { instance } = await WebAssembly.instantiateStreaming(
  fetch('module.wasm'),
  {
    env: {
      memory: new WebAssembly.Memory({
        initial: 256,
        maximum: 256,
        shared: true // 共享内存
      })
    }
  }
);

// WASM 内部可以创建线程并行计算
instance.exports.parallelCompute();
```

## 六、OffscreenCanvas - Worker 中的渲染

OffscreenCanvas 允许在 Worker 中进行 Canvas 渲染，避免阻塞主线程。

**主线程**：
```javascript
const canvas = document.getElementById('canvas');
const offscreen = canvas.transferControlToOffscreen();

const worker = new Worker('render-worker.js');
worker.postMessage({ canvas: offscreen }, [offscreen]);
```

**render-worker.js**：
```javascript
self.onmessage = (e) => {
  const canvas = e.data.canvas;
  const ctx = canvas.getContext('2d');

  function render() {
    // 在 Worker 中渲染
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 50, 50);
    requestAnimationFrame(render);
  }

  render();
};
```

## 技术选型指南

| 场景 | 推荐方案 |
|------|---------|
| 大量数据计算 | Web Worker |
| 跨页面状态同步 | Shared Worker |
| 离线应用、PWA | Service Worker |
| 实时音频处理 | Audio Worklet |
| 自定义 CSS 效果 | Paint Worklet |
| 高性能动画 | Animation Worklet |
| 多线程数据共享 | SharedArrayBuffer + Atomics |
| 极致性能计算 | WebAssembly Threads |
| 复杂 Canvas 渲染 | OffscreenCanvas + Worker |
| 普通异步操作 | async/await |

## 总结

JavaScript 的多线程方案是一个分层的体系：

1. **应用层**：Promise/async 解决异步流程控制
2. **Worker 层**：Web Worker/Service Worker 实现真正并行
3. **Worklet 层**：深入渲染管线，性能更优
4. **底层**：SharedArrayBuffer 提供共享内存
5. **WASM**：接近原生的多线程性能

选择合适的方案，需要权衡开发复杂度、性能需求和浏览器兼容性。对于大多数场景，Web Worker + async/await 的组合已经足够强大。