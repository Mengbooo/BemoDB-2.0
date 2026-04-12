---
title: 'DOM 与事件模型完全指南'
publishDate: '2026-03-09 08:00:00'
description: '深入理解 DOM 事件流、事件委托与事件处理最佳实践'
tags:
  - Browser
  - DOM
language: 'zh-CN'
---

## DOM 事件模型的整体框架

理解 DOM 事件不是记住几个 API，而是建立完整的心智模型：

**事件处理的三个层次：**
1. **事件流层**：事件如何在 DOM 树中传播（捕获 → 目标 → 冒泡）
2. **事件处理层**：如何监听和响应事件（addEventListener、事件对象）
3. **优化层**：如何高效处理事件（事件委托、性能优化）

本文将按照"先理解事件流 → 再掌握事件处理 → 最后学会优化"的顺序展开。

## 一、DOM 事件流：事件的传播路径

### 1.1 事件流的三个阶段

当你点击页面上的一个元素时，这个点击事件并不是孤立发生的，而是经历了一个完整的传播过程：

```
Window
  ↓ 捕获阶段（从外到内）
Document
  ↓
<html>
  ↓
<body>
  ↓
<div>
  ↓
<button> ← 目标阶段
  ↑
<div>
  ↑ 冒泡阶段（从内到外）
<body>
  ↑
<html>
  ↑
Document
  ↑
Window
```

**三个阶段：**

1. **捕获阶段（Capturing Phase）**：事件从 Window 开始，逐级向下传播到目标元素
2. **目标阶段（Target Phase）**：事件到达实际触发的目标元素
3. **冒泡阶段（Bubbling Phase）**：事件从目标元素开始，逐级向上冒泡到 Window

**关键理解：** 默认情况下，addEventListener 添加的监听器在**冒泡阶段**执行。

### 1.2 完整示例：可视化事件流

```html
<div class="grandparent">
  Grandparent
  <div class="parent">
    Parent
    <div class="child">Child</div>
  </div>
</div>
```

```javascript
const grandparent = document.querySelector('.grandparent');
const parent = document.querySelector('.parent');
const child = document.querySelector('.child');

// 捕获阶段监听器
grandparent.addEventListener('click', () => {
  console.log('1. Grandparent - 捕获');
}, { capture: true });

parent.addEventListener('click', () => {
  console.log('2. Parent - 捕获');
}, { capture: true });

child.addEventListener('click', () => {
  console.log('3. Child - 捕获/目标');
}, { capture: true });

// 冒泡阶段监听器
child.addEventListener('click', () => {
  console.log('4. Child - 冒泡');
});

parent.addEventListener('click', () => {
  console.log('5. Parent - 冒泡');
});

grandparent.addEventListener('click', () => {
  console.log('6. Grandparent - 冒泡');
});
```

**点击 Child 时的输出：**

```
1. Grandparent - 捕获  ← 捕获阶段：从外到内
2. Parent - 捕获
3. Child - 捕获/目标    ← 到达目标
4. Child - 冒泡         ← 冒泡阶段：从内到外
5. Parent - 冒泡
6. Grandparent - 冒泡
```

**事件流的"V"字形路径：** 先下沉（捕获），再上浮（冒泡）。

### 1.3 event.target vs event.currentTarget

理解这两个属性是掌握事件流的关键：

| 属性 | 含义 | 在事件流中的表现 |
|------|------|------------------|
| `event.target` | 事件的真正触发源，用户实际点击的元素 | 始终指向最内层的被点击元素 |
| `event.currentTarget` | 当前正在处理事件的元素，监听器绑定的元素 | 随着事件传播而变化 |

```javascript
grandparent.addEventListener('click', (e) => {
  console.log('target:', e.target.className);        // 'child'
  console.log('currentTarget:', e.currentTarget.className); // 'grandparent'
});
```

**比喻：**
- `target`：快递包裹上的收件地址（固定不变）
- `currentTarget`：快递当前所在的中转站（随传播变化）

## 二、事件委托：利用冒泡优化性能

### 2.1 事件委托的原理

基于事件冒泡机制，我们可以在父元素上统一处理子元素的事件，而不是为每个子元素单独绑定监听器。

**场景：** 一个商品列表，有 1000 个商品项，点击每个商品显示详情。

**传统做法（不推荐）：**

```javascript
// ✗ 创建 1000 个监听器，内存开销大
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', () => {
    console.log('点击了:', item.textContent);
  });
});
```

**问题：**
1. 性能差：1000 个监听器占用大量内存
2. 维护难：动态添加的新元素需要重新绑定

**事件委托（推荐）：**

```javascript
// ✓ 只创建 1 个监听器
const list = document.querySelector('.list');
list.addEventListener('click', (e) => {
  // 判断点击的是否是商品项
  if (e.target.classList.contains('item')) {
    console.log('点击了:', e.target.textContent);
  }
});
```

**优势：**
1. 性能好：只有一个监听器，内存占用小
2. 维护简单：动态添加的元素自动生效
3. 代码简洁：统一处理逻辑

### 2.2 事件委托的最佳实践

**使用 closest() 处理嵌套结构：**

```html
<ul class="list">
  <li class="item">
    <img src="icon.png">
    <span class="title">商品名称</span>
  </li>
</ul>
```

```javascript
list.addEventListener('click', (e) => {
  // 使用 closest 找到最近的 .item 祖先
  const item = e.target.closest('.item');
  if (item) {
    console.log('点击了商品:', item.querySelector('.title').textContent);
  }
});
```

**处理多种子元素类型：**

```javascript
list.addEventListener('click', (e) => {
  const target = e.target;

  // 点击删除按钮
  if (target.classList.contains('delete-btn')) {
    const item = target.closest('.item');
    item.remove();
  }

  // 点击编辑按钮
  if (target.classList.contains('edit-btn')) {
    const item = target.closest('.item');
    editItem(item);
  }

  // 点击商品本身
  if (target.classList.contains('item')) {
    showDetail(target);
  }
});
```

### 2.3 事件委托的注意事项

**不是所有事件都冒泡：**

以下事件不冒泡，无法使用事件委托：
- `focus` / `blur`（可用 `focusin` / `focusout` 替代）
- `mouseenter` / `mouseleave`（可用 `mouseover` / `mouseout` 替代）
- `load` / `unload` / `scroll`

```javascript
// ✗ focus 不冒泡，无法委托
form.addEventListener('focus', (e) => {
  // 不会触发
});

// ✓ 使用 focusin 替代
form.addEventListener('focusin', (e) => {
  if (e.target.tagName === 'INPUT') {
    console.log('输入框获得焦点');
  }
});
```

## 三、控制事件行为

### 3.1 stopPropagation()：阻止事件传播

**作用：** 阻止事件继续向上冒泡（或向下捕获）。

**场景：** 卡片内的关闭按钮，点击关闭按钮不应触发卡片的点击事件。

```html
<div class="card">
  <h3>卡片标题</h3>
  <p>点击卡片查看详情</p>
  <button class="close">×</button>
</div>
```

```javascript
const card = document.querySelector('.card');
const closeBtn = document.querySelector('.close');

// 卡片点击：跳转详情
card.addEventListener('click', () => {
  console.log('跳转到详情页');
  // location.href = '/detail';
});

// 关闭按钮点击：只关闭卡片
closeBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // 阻止冒泡到 card
  console.log('关闭卡片');
  card.style.display = 'none';
});
```

**效果：**
- 点击卡片空白区域 → 跳转详情
- 点击关闭按钮 → 只关闭卡片，不跳转

### 3.2 preventDefault()：阻止默认行为

**作用：** 取消浏览器对该事件的默认处理。

**常见场景：**

**1. 阻止链接跳转**

```javascript
document.querySelector('a').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('链接被点击，但不跳转');
  // 可以执行自定义逻辑，如 SPA 路由
});
```

**2. 阻止表单提交**

```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // 使用 AJAX 异步提交
  const formData = new FormData(e.target);
  fetch('/api/submit', {
    method: 'POST',
    body: formData
  });
});
```

**3. 阻止右键菜单**

```javascript
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  // 显示自定义菜单
});
```

**4. 阻止拖拽默认行为**

```javascript
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault(); // 允许放置
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault(); // 阻止浏览器打开文件
  const files = e.dataTransfer.files;
  handleFiles(files);
});
```

### 3.3 stopPropagation vs preventDefault

| 方法 | 作用 | 影响范围 |
|------|------|----------|
| `stopPropagation()` | 阻止事件传播 | 影响事件流，不影响默认行为 |
| `preventDefault()` | 阻止默认行为 | 影响浏览器默认动作，不影响事件流 |

```javascript
link.addEventListener('click', (e) => {
  e.stopPropagation();  // 事件不会冒泡到父元素
  e.preventDefault();   // 链接不会跳转

  // 两者互不影响，可以同时使用
});
```

**return false 的特殊性：**

```javascript
// jQuery 中，return false 等同于同时调用两者
$('a').click(function(e) {
  return false; // 等同于 e.stopPropagation() + e.preventDefault()
});

// 原生 JS 中，return false 只在内联事件中有效
<a href="#" onclick="doSomething(); return false;">
```

## 四、addEventListener 深入

### 4.1 第三个参数：options 对象

```javascript
element.addEventListener(type, listener, options);
```

**options 可选属性：**

| 属性 | 类型 | 默认值 | 作用 |
|------|------|--------|------|
| `capture` | boolean | false | 是否在捕获阶段触发 |
| `once` | boolean | false | 是否只触发一次后自动移除 |
| `passive` | boolean | false | 是否承诺不调用 preventDefault() |
| `signal` | AbortSignal | - | 用于移除监听器的信号 |

### 4.2 capture：在捕获阶段监听

```javascript
// 传统写法
element.addEventListener('click', handler, true);

// 现代写法（推荐）
element.addEventListener('click', handler, { capture: true });
```

**使用场景：** 需要在事件到达目标前拦截处理。

```javascript
// 全局事件拦截：在所有元素前记录点击
document.addEventListener('click', (e) => {
  console.log('全局拦截:', e.target);
  // 可以在这里做统计、日志等
}, { capture: true });
```

### 4.3 once：一次性监听器

```javascript
button.addEventListener('click', () => {
  console.log('只会执行一次');
}, { once: true });

// 等同于
function handler() {
  console.log('只会执行一次');
  button.removeEventListener('click', handler);
}
button.addEventListener('click', handler);
```

**使用场景：**
- 首次交互提示
- 一次性的初始化操作
- 防止重复提交

```javascript
// 防止重复提交
submitBtn.addEventListener('click', async () => {
  await submitForm();
}, { once: true });
```

### 4.4 passive：优化滚动性能

**问题背景：**

浏览器在处理 `touchmove`、`wheel` 等滚动事件时，必须等待 JavaScript 执行完毕，因为不确定代码中是否会调用 `preventDefault()` 阻止滚动。这会导致滚动卡顿。

**解决方案：**

```javascript
// ✗ 可能导致滚动卡顿
document.addEventListener('touchmove', (e) => {
  // 复杂计算...
});

// ✓ 告诉浏览器不会阻止滚动，可以立即滚动
document.addEventListener('touchmove', (e) => {
  // 复杂计算...
}, { passive: true });
```

**效果：**
- 浏览器可以在独立线程处理滚动，不等待 JS
- 滚动更流畅，特别是在移动端

**注意：**
- 设置 `passive: true` 后，调用 `preventDefault()` 会被忽略并警告
- 现代浏览器对 `touchstart`、`touchmove` 默认使用 `passive: true`

### 4.5 signal：使用 AbortController 移除监听器

**传统方式：**

```javascript
function handler() { }
element.addEventListener('click', handler);
element.removeEventListener('click', handler); // 需要保持引用
```

**现代方式：**

```javascript
const controller = new AbortController();

element.addEventListener('click', () => {
  console.log('点击');
}, { signal: controller.signal });

// 移除监听器
controller.abort();
```

**优势：** 可以一次性移除多个监听器

```javascript
const controller = new AbortController();
const { signal } = controller;

// 添加多个监听器
element1.addEventListener('click', handler1, { signal });
element2.addEventListener('mouseover', handler2, { signal });
element3.addEventListener('keydown', handler3, { signal });

// 一次性全部移除
controller.abort();
```

**使用场景：**
- 组件卸载时清理所有事件
- 取消异步操作相关的事件监听

```javascript
class Component {
  constructor() {
    this.controller = new AbortController();
    this.setupEvents();
  }

  setupEvents() {
    const { signal } = this.controller;

    this.element.addEventListener('click', this.onClick, { signal });
    this.element.addEventListener('hover', this.onHover, { signal });
    window.addEventListener('resize', this.onResize, { signal });
  }

  destroy() {
    // 一次性清理所有事件
    this.controller.abort();
  }
}
```

## 五、常见事件类型与最佳实践

### 5.1 鼠标事件

```javascript
// 点击事件
element.addEventListener('click', (e) => {
  console.log('坐标:', e.clientX, e.clientY);
  console.log('按键:', e.button); // 0: 左键, 1: 中键, 2: 右键
});

// 双击事件
element.addEventListener('dblclick', (e) => {
  console.log('双击');
});

// 鼠标移动
element.addEventListener('mousemove', (e) => {
  console.log('移动:', e.clientX, e.clientY);
});

// 鼠标进入/离开（不冒泡）
element.addEventListener('mouseenter', (e) => {
  console.log('鼠标进入');
});

element.addEventListener('mouseleave', (e) => {
  console.log('鼠标离开');
});

// 鼠标悬停/移出（冒泡）
element.addEventListener('mouseover', (e) => {
  console.log('鼠标悬停');
});

element.addEventListener('mouseout', (e) => {
  console.log('鼠标移出');
});
```

**mouseenter vs mouseover：**
- `mouseenter`：不冒泡，只在进入元素本身时触发
- `mouseover`：冒泡，进入子元素也会触发

### 5.2 键盘事件

```javascript
// 按键按下
document.addEventListener('keydown', (e) => {
  console.log('按键:', e.key);      // 'a', 'Enter', 'ArrowUp'
  console.log('键码:', e.code);     // 'KeyA', 'Enter', 'ArrowUp'
  console.log('Ctrl:', e.ctrlKey);  // 是否按下 Ctrl
  console.log('Shift:', e.shiftKey);
  console.log('Alt:', e.altKey);
});

// 按键释放
document.addEventListener('keyup', (e) => {
  console.log('释放:', e.key);
});

// 快捷键示例
document.addEventListener('keydown', (e) => {
  // Ctrl + S 保存
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    save();
  }

  // Esc 关闭弹窗
  if (e.key === 'Escape') {
    closeModal();
  }
});
```

### 5.3 表单事件

```javascript
// 输入事件（实时触发）
input.addEventListener('input', (e) => {
  console.log('当前值:', e.target.value);
});

// 改变事件（失去焦点时触发）
input.addEventListener('change', (e) => {
  console.log('最终值:', e.target.value);
});

// 焦点事件
input.addEventListener('focus', (e) => {
  console.log('获得焦点');
});

input.addEventListener('blur', (e) => {
  console.log('失去焦点');
});

// 表单提交
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log('表单数据:', Object.fromEntries(formData));
});
```

### 5.4 触摸事件（移动端）

```javascript
element.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  console.log('触摸开始:', touch.clientX, touch.clientY);
}, { passive: true });

element.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  console.log('触摸移动:', touch.clientX, touch.clientY);
}, { passive: true });

element.addEventListener('touchend', (e) => {
  console.log('触摸结束');
});
```

## 六、性能优化最佳实践

### 6.1 防抖（Debounce）

**场景：** 搜索框输入、窗口 resize

```javascript
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 使用
searchInput.addEventListener('input', debounce((e) => {
  search(e.target.value);
}, 300));
```

### 6.2 节流（Throttle）

**场景：** 滚动事件、鼠标移动

```javascript
function throttle(fn, interval) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// 使用
window.addEventListener('scroll', throttle(() => {
  console.log('滚动位置:', window.scrollY);
}, 100));
```

### 6.3 事件委托 + 防抖

```javascript
const list = document.querySelector('.list');

list.addEventListener('input', debounce((e) => {
  if (e.target.classList.contains('search-input')) {
    search(e.target.value);
  }
}, 300));
```

## 总结

DOM 事件模型的核心要点：

1. **理解事件流**：捕获 → 目标 → 冒泡的完整路径
2. **掌握事件委托**：利用冒泡优化性能，减少监听器数量
3. **控制事件行为**：stopPropagation() 控制传播，preventDefault() 控制默认行为
4. **善用 addEventListener 选项**：capture、once、passive、signal
5. **性能优化**：防抖、节流、事件委托

记住：**事件委托是最重要的优化手段**，合理使用可以大幅提升性能。
