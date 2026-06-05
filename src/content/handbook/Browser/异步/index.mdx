---
title: 'JavaScript 异步编程完全指南'
publishDate: '2026-03-09 08:00:00'
description: '深入理解事件循环、Promise、async/await 与异步编程最佳实践'
tags:
  - Browser
  - JavaScript
language: 'zh-CN'
---

## JavaScript 异步编程的整体框架

异步编程是 JavaScript 的核心特性，理解它需要建立完整的知识体系：

**异步编程的三个层次：**
1. **原理层**：事件循环机制、宏任务与微任务
2. **语法层**：回调函数、Promise、async/await
3. **实践层**：错误处理、并发控制、性能优化

本文将按照"先理解原理 → 再掌握语法 → 最后学会实践"的顺序展开。

## 一、JavaScript 的单线程模型

### 1.1 为什么是单线程？

JavaScript 设计之初是为浏览器设计的脚本语言，主要用于操作 DOM。如果是多线程，多个线程同时操作同一个 DOM 节点会导致复杂的同步问题。

**单线程的特点：**
- 同一时间只能执行一个任务
- 任务按顺序执行，前一个任务未完成，后一个任务必须等待
- 长时间运行的任务会阻塞后续代码执行

### 1.2 同步 vs 异步

```javascript
// 同步代码：按顺序执行，会阻塞
console.log('1');
console.log('2');
console.log('3');
// 输出：1 2 3

// 异步代码：不阻塞，稍后执行
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// 输出：1 3 2
```

**异步的必要性：**
- 网络请求（fetch、AJAX）
- 文件读写（Node.js）
- 定时器（setTimeout、setInterval）
- 用户交互（事件监听）

如果这些操作是同步的，页面会在等待期间完全卡死。

## 二、事件循环（Event Loop）

### 2.1 核心组件

事件循环是 JavaScript 异步编程的核心机制，由以下组件构成：

```
┌─────────────────────────────┐
│   Call Stack (调用栈)        │  ← 执行同步代码
└─────────────────────────────┘
              ↓
┌─────────────────────────────┐
│   Microtask Queue (微任务)   │  ← Promise.then, async/await
└─────────────────────────────┘
              ↓
┌─────────────────────────────┐
│   Macrotask Queue (宏任务)   │  ← setTimeout, setInterval
└─────────────────────────────┘
```

**调用栈（Call Stack）：**
- 后进先出（LIFO）的数据结构
- 存储和管理函数调用
- 所有同步代码在调用栈中执行

**任务队列（Task Queue）：**
- 先进先出（FIFO）的数据结构
- 存放异步任务的回调函数
- 分为宏任务队列和微任务队列

**事件循环（Event Loop）：**
- 持续运行的进程
- 不断检查调用栈是否为空
- 按优先级将任务推入调用栈执行

### 2.2 宏任务与微任务

这是事件循环中最核心的概念，直接决定代码执行顺序。

**宏任务（Macrotask）：**

| 类型 | 说明 |
|------|------|
| `setTimeout` | 延迟执行 |
| `setInterval` | 定时执行 |
| `setImmediate` | Node.js 环境 |
| I/O 操作 | 文件读写、网络请求 |
| UI 渲染 | 浏览器渲染 |
| `requestAnimationFrame` | 动画帧回调 |

**微任务（Microtask）：**

| 类型 | 说明 |
|------|------|
| `Promise.then/catch/finally` | Promise 回调 |
| `async/await` | await 之后的代码 |
| `queueMicrotask()` | 直接添加微任务 |
| `MutationObserver` | DOM 变化监听 |
| `process.nextTick` | Node.js 环境（优先级最高） |

**关键区别：**
- 每次事件循环只执行**一个**宏任务
- 每次事件循环会执行**所有**微任务

### 2.3 事件循环的执行流程

```
1. 执行同步代码（整个 script 作为第一个宏任务）
   ↓
2. 清空微任务队列（执行所有微任务）
   ↓
3. 执行一个宏任务
   ↓
4. 清空微任务队列
   ↓
5. 执行下一个宏任务
   ↓
   ... 循环往复
```

**核心规则：**
- 微任务优先于宏任务
- 微任务会在当前宏任务结束后立即执行
- 微任务执行过程中产生的新微任务也会在本轮执行

### 2.4 经典示例分析

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('4');
}).then(() => {
  console.log('5');
});

console.log('6');
```

**执行流程分析：**

```
第一轮事件循环：
1. 同步代码：
   - console.log('1') → 输出 1
   - setTimeout 回调 → 放入宏任务队列
   - Promise.then → 放入微任务队列
   - console.log('6') → 输出 6

2. 清空微任务队列：
   - 执行第一个 then → 输出 4
   - 第二个 then 加入微任务队列
   - 执行第二个 then → 输出 5

第二轮事件循环：
3. 执行宏任务（setTimeout）：
   - console.log('2') → 输出 2
   - Promise.then → 放入微任务队列

4. 清空微任务队列：
   - 执行 then → 输出 3
```

**最终输出：** 1 6 4 5 2 3

### 2.5 async/await 与事件循环

```javascript
async function async1() {
  console.log('2. async1 start');
  await async2();
  console.log('6. async1 end');
}

async function async2() {
  console.log('3. async2');
}

console.log('1. script start');

setTimeout(() => {
  console.log('8. setTimeout');
}, 0);

async1();

new Promise(resolve => {
  console.log('4. promise1');
  resolve();
}).then(() => {
  console.log('7. promise2');
});

console.log('5. script end');
```

**执行流程：**

```
同步代码：
1. script start
2. async1 start
3. async2（await 之前的代码同步执行）
4. promise1（Promise 构造函数同步执行）
5. script end

微任务队列：
6. async1 end（await 之后的代码）
7. promise2

宏任务队列：
8. setTimeout
```

**关键理解：**
- `await` 之前的代码同步执行
- `await` 会暂停函数执行，将后续代码放入微任务队列
- 相当于 `Promise.then()`

## 三、Promise 深入

### 3.1 Promise 的三种状态

```javascript
const promise = new Promise((resolve, reject) => {
  // pending（进行中）

  // 成功时调用 resolve
  resolve(value);  // → fulfilled（已成功）

  // 失败时调用 reject
  reject(error);   // → rejected（已失败）
});
```

**状态特点：**
- 状态只能改变一次：pending → fulfilled 或 pending → rejected
- 状态改变后不可逆
- 状态改变后，结果值（value 或 error）不可变

### 3.2 Promise 链式调用

```javascript
fetch('/api/user')
  .then(response => response.json())
  .then(user => fetch(`/api/posts/${user.id}`))
  .then(response => response.json())
  .then(posts => {
    console.log('用户文章:', posts);
  })
  .catch(error => {
    console.error('请求失败:', error);
  });
```

**链式调用规则：**
- `then` 返回新的 Promise
- 返回值会传递给下一个 `then`
- 返回 Promise 会等待其完成
- `catch` 捕获链中任何错误

### 3.3 Promise 静态方法

**Promise.all()：并行执行，全部成功才成功**

```javascript
Promise.all([
  fetch('/api/user'),
  fetch('/api/posts'),
  fetch('/api/comments')
]).then(([user, posts, comments]) => {
  console.log('全部完成');
}).catch(error => {
  console.log('有一个失败:', error);
});
```

**Promise.race()：竞速，第一个完成就返回**

```javascript
Promise.race([
  fetch('/api/data'),
  new Promise((_, reject) =>
    setTimeout(() => reject('超时'), 5000)
  )
]).then(data => {
  console.log('获取成功');
}).catch(error => {
  console.log('超时或失败');
});
```

**Promise.allSettled()：等待全部完成，不管成功失败**

```javascript
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
]).then(results => {
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      console.log('成功:', result.value);
    } else {
      console.log('失败:', result.reason);
    }
  });
});
```

**Promise.any()：第一个成功就返回**

```javascript
Promise.any([
  fetch('/api/server1'),
  fetch('/api/server2'),
  fetch('/api/server3')
]).then(response => {
  console.log('最快的服务器响应');
}).catch(error => {
  console.log('全部失败');
});
```

### 3.4 手动实现 Promise

理解 Promise 原理的最好方式是实现一个简易版本：

```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e };

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolve(x);
            } catch (error) {
              reject(error);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolve(x);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
```

## 四、async/await 深入

### 4.1 async/await 的本质

`async/await` 是 Promise 的语法糖，让异步代码看起来像同步代码。

```javascript
// Promise 写法
function fetchUser() {
  return fetch('/api/user')
    .then(response => response.json())
    .then(user => {
      console.log(user);
      return user;
    })
    .catch(error => {
      console.error(error);
    });
}

// async/await 写法
async function fetchUser() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
  }
}
```

**async 函数特点：**
- 总是返回 Promise
- 返回值会被自动包装成 Promise.resolve()
- 抛出的错误会被包装成 Promise.reject()

```javascript
async function test() {
  return 'hello';
}

// 等同于
function test() {
  return Promise.resolve('hello');
}
```

### 4.2 await 的执行机制

```javascript
async function example() {
  console.log('1');

  const result = await Promise.resolve('2');

  console.log(result);
  console.log('3');
}

example();
console.log('4');

// 输出：1 4 2 3
```

**await 的行为：**
1. `await` 之前的代码同步执行
2. `await` 会暂停函数执行，等待 Promise 完成
3. `await` 之后的代码放入微任务队列
4. 相当于 `Promise.then()`

### 4.3 错误处理

**try-catch 捕获错误：**

```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('请求失败:', error);
    return null;
  }
}
```

**使用 Promise.catch()：**

```javascript
async function fetchData() {
  const data = await fetch('/api/data')
    .then(res => res.json())
    .catch(error => {
      console.error('请求失败:', error);
      return null;
    });

  return data;
}
```

**统一错误处理：**

```javascript
async function safeAwait(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

// 使用
const [error, data] = await safeAwait(fetch('/api/data'));
if (error) {
  console.error('请求失败:', error);
} else {
  console.log('数据:', data);
}
```

### 4.4 并发控制

**错误：串行执行（慢）**

```javascript
async function fetchAll() {
  const user = await fetch('/api/user');      // 等待 1s
  const posts = await fetch('/api/posts');    // 等待 1s
  const comments = await fetch('/api/comments'); // 等待 1s
  // 总共 3s
}
```

**正确：并行执行（快）**

```javascript
async function fetchAll() {
  const [user, posts, comments] = await Promise.all([
    fetch('/api/user'),
    fetch('/api/posts'),
    fetch('/api/comments')
  ]);
  // 总共 1s（最慢的那个）
}
```

**顺序执行多个异步操作：**

```javascript
async function sequential() {
  const urls = ['/api/1', '/api/2', '/api/3'];

  for (const url of urls) {
    const data = await fetch(url);
    console.log(data);
  }
}
```

**并发执行但限制并发数：**

```javascript
async function concurrentLimit(urls, limit) {
  const results = [];
  const executing = [];

  for (const url of urls) {
    const promise = fetch(url).then(res => res.json());
    results.push(promise);

    if (limit <= urls.length) {
      const e = promise.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);

      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }

  return Promise.all(results);
}

// 最多同时 3 个请求
concurrentLimit(urls, 3);
```

## 五、异步编程最佳实践

### 5.1 避免回调地狱

**回调地狱（Callback Hell）：**

```javascript
// ✗ 难以维护
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      getMoreData(c, function(d) {
        console.log(d);
      });
    });
  });
});
```

**使用 Promise 链：**

```javascript
// ✓ 清晰易读
getData()
  .then(a => getMoreData(a))
  .then(b => getMoreData(b))
  .then(c => getMoreData(c))
  .then(d => console.log(d))
  .catch(error => console.error(error));
```

**使用 async/await：**

```javascript
// ✓ 最佳实践
async function process() {
  try {
    const a = await getData();
    const b = await getMoreData(a);
    const c = await getMoreData(b);
    const d = await getMoreData(c);
    console.log(d);
  } catch (error) {
    console.error(error);
  }
}
```

### 5.2 合理使用并发

```javascript
// ✗ 不必要的串行
async function bad() {
  const user = await fetchUser();
  const posts = await fetchPosts();
  return { user, posts };
}

// ✓ 并行执行
async function good() {
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ]);
  return { user, posts };
}
```

### 5.3 超时控制

```javascript
function timeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('超时')), ms)
    )
  ]);
}

// 使用
try {
  const data = await timeout(fetch('/api/data'), 5000);
} catch (error) {
  console.error('请求超时或失败');
}
```

### 5.4 重试机制

```javascript
async function retry(fn, times = 3, delay = 1000) {
  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === times - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// 使用
const data = await retry(() => fetch('/api/data'), 3, 1000);
```

### 5.5 取消异步操作

```javascript
// 使用 AbortController
const controller = new AbortController();

fetch('/api/data', { signal: controller.signal })
  .then(response => response.json())
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('请求被取消');
    }
  });

// 取消请求
controller.abort();
```

## 六、常见陷阱与注意事项

### 6.1 forEach 中的 await

```javascript
// ✗ 错误：await 在 forEach 中不生效
async function bad() {
  [1, 2, 3].forEach(async (item) => {
    await delay(1000);
    console.log(item);
  });
  console.log('完成'); // 立即输出
}

// ✓ 正确：使用 for...of
async function good() {
  for (const item of [1, 2, 3]) {
    await delay(1000);
    console.log(item);
  }
  console.log('完成'); // 等待全部完成
}
```

### 6.2 Promise 构造函数是同步的

```javascript
new Promise((resolve) => {
  console.log('1'); // 立即执行
  resolve();
}).then(() => {
  console.log('2'); // 微任务
});
console.log('3');

// 输出：1 3 2
```

### 6.3 async 函数总是返回 Promise

```javascript
async function test() {
  return 1;
}

test().then(value => console.log(value)); // 1
```

### 6.4 未捕获的 Promise 错误

```javascript
// ✗ 错误会被吞掉
Promise.reject('error');

// ✓ 必须捕获
Promise.reject('error').catch(console.error);

// 或使用全局错误处理
window.addEventListener('unhandledrejection', event => {
  console.error('未捕获的 Promise 错误:', event.reason);
});
```

## 总结

JavaScript 异步编程的核心要点：

1. **理解事件循环**：微任务优先于宏任务，掌握执行顺序
2. **掌握 Promise**：理解三种状态，善用静态方法
3. **善用 async/await**：让异步代码更清晰，注意错误处理
4. **并发控制**：合理使用并行和串行，避免不必要的等待
5. **错误处理**：始终捕获错误，避免未处理的 Promise rejection
6. **性能优化**：超时控制、重试机制、取消操作

记住：**async/await 是 Promise 的语法糖，理解 Promise 是掌握异步编程的关键。**
