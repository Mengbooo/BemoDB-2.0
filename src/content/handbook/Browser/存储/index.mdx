---
title: '浏览器存储完全指南'
publishDate: '2026-03-09 08:00:00'
description: '深入理解浏览器四大存储方案：Cookie、localStorage、sessionStorage、IndexedDB'
tags:
  - Browser
  - Storage
language: 'zh-CN'
---

## 为什么需要浏览器存储？

Web 应用需要在客户端保存数据，以实现：
- 用户会话管理（保持登录状态）
- 个性化设置（主题、语言偏好）
- 离线应用支持
- 减少服务器请求，提升性能

浏览器提供了四种主流存储方案，它们各有特点和适用场景。

## 一、Cookie：最早的存储方案

Cookie 诞生于 1994 年，是浏览器最早的存储机制，主要用于会话管理。

### 核心特性

| 特性 | 说明 |
|------|------|
| 容量限制 | 单个 Cookie 约 4KB，每个域名 20-50 个 |
| 生命周期 | 可设置过期时间，或为会话 Cookie |
| 自动发送 | 每次 HTTP 请求自动携带到服务器 |
| 作用域 | 可设置 domain 和 path |

### 基本操作

```javascript
// 设置 Cookie
document.cookie = "username=John; max-age=3600; path=/";

// 设置带安全属性的 Cookie
document.cookie = "sessionId=abc123; Secure; HttpOnly; SameSite=Strict";

// 读取 Cookie
function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) return value;
  }
  return null;
}

// 删除 Cookie（设置过期时间为过去）
document.cookie = "username=; max-age=0";
```

### 重要属性

```javascript
// Expires/Max-Age：过期时间
document.cookie = "token=xyz; expires=Fri, 31 Dec 2026 23:59:59 GMT";
document.cookie = "token=xyz; max-age=3600"; // 1小时后过期

// Domain：作用域
document.cookie = "data=value; domain=.example.com"; // 所有子域名可访问

// Path：路径限制
document.cookie = "data=value; path=/admin"; // 仅 /admin 路径下可访问

// Secure：仅 HTTPS 传输
document.cookie = "token=xyz; Secure";

// HttpOnly：禁止 JavaScript 访问（仅服务器设置）
// Set-Cookie: sessionId=abc; HttpOnly

// SameSite：防止 CSRF 攻击
document.cookie = "token=xyz; SameSite=Strict"; // 严格模式
document.cookie = "token=xyz; SameSite=Lax";    // 宽松模式
document.cookie = "token=xyz; SameSite=None; Secure"; // 允许跨站
```

### 使用场景

- 用户会话管理（Session ID）
- 记住登录状态
- 追踪和分析（广告、统计）
- 购物车状态

### 优缺点

**优点**：
- 服务器可直接读取（自动发送）
- 支持过期时间
- 跨页面共享

**缺点**：
- 容量太小（4KB）
- 每次请求都会携带，增加流量
- API 不友好（字符串操作）
- 安全风险（XSS、CSRF）

## 二、localStorage：持久化存储

localStorage 提供了简单的键值对存储，数据永久保存，除非手动清除。

### 核心特性

| 特性 | 说明 |
|------|------|
| 容量限制 | 通常 5-10MB |
| 生命周期 | 永久保存，除非手动清除 |
| 作用域 | 同源（协议+域名+端口）共享 |
| 同步 API | 同步操作，可能阻塞主线程 |

### 基本操作

```javascript
// 存储数据
localStorage.setItem('theme', 'dark');
localStorage.setItem('user', JSON.stringify({ name: 'Alice', age: 30 }));

// 读取数据
const theme = localStorage.getItem('theme');
const user = JSON.parse(localStorage.getItem('user'));

// 删除数据
localStorage.removeItem('theme');

// 清空所有数据
localStorage.clear();

// 获取键名
const key = localStorage.key(0);

// 获取数量
const count = localStorage.length;

// 遍历所有数据
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(key, value);
}
```

### 监听存储变化

```javascript
// 监听其他标签页的存储变化
window.addEventListener('storage', (e) => {
  console.log('键名:', e.key);
  console.log('旧值:', e.oldValue);
  console.log('新值:', e.newValue);
  console.log('URL:', e.url);
  console.log('存储对象:', e.storageArea);
});

// 注意：当前页面的修改不会触发 storage 事件
```

### 使用场景

- 用户偏好设置（主题、语言）
- 表单草稿自动保存
- 离线数据缓存
- 购物车数据

### 优缺点

**优点**：
- API 简单易用
- 容量较大（5-10MB）
- 永久保存
- 同源页面共享

**缺点**：
- 只能存储字符串（需要序列化）
- 同步操作，大量数据会阻塞
- 无法设置过期时间
- 不支持索引和查询

## 三、sessionStorage：会话级存储

sessionStorage 与 localStorage API 完全相同，但生命周期和作用域不同。

### 核心特性

| 特性 | 说明 |
|------|------|
| 容量限制 | 通常 5-10MB |
| 生命周期 | 标签页关闭即清除 |
| 作用域 | 仅当前标签页，不同标签页独立 |
| 同步 API | 同步操作 |

### 基本操作

```javascript
// API 与 localStorage 完全相同
sessionStorage.setItem('formData', JSON.stringify(data));
const formData = JSON.parse(sessionStorage.getItem('formData'));
sessionStorage.removeItem('formData');
sessionStorage.clear();
```

### localStorage vs sessionStorage

```javascript
// localStorage：跨标签页共享
// 标签页 A
localStorage.setItem('shared', 'value');

// 标签页 B（同源）
console.log(localStorage.getItem('shared')); // 'value'

// sessionStorage：标签页独立
// 标签页 A
sessionStorage.setItem('isolated', 'value');

// 标签页 B（同源）
console.log(sessionStorage.getItem('isolated')); // null
```

### 使用场景

- 表单临时数据（防止刷新丢失）
- 单次会话状态
- 多步骤表单的中间数据
- 页面内的临时缓存

### 优缺点

**优点**：
- 自动清理，不占用长期空间
- 标签页隔离，互不干扰
- API 简单

**缺点**：
- 刷新页面数据保留，但关闭标签页即清除
- 无法跨标签页共享
- 同样只能存储字符串

## 四、IndexedDB：大型数据库

IndexedDB 是一个完整的 NoSQL 数据库，适合存储大量结构化数据。

### 核心特性

| 特性 | 说明 |
|------|------|
| 容量限制 | 数百 MB 到 GB 级别 |
| 数据类型 | 支持对象、数组、Blob 等 |
| 索引支持 | 可创建索引进行高效查询 |
| 事务支持 | 支持 ACID 事务 |
| 异步 API | 不阻塞主线程 |

### 基本操作

```javascript
// 1. 打开数据库
const request = indexedDB.open('MyDatabase', 1);

// 2. 数据库升级（创建表和索引）
request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // 创建对象存储（表）
  if (!db.objectStoreNames.contains('users')) {
    const objectStore = db.createObjectStore('users', {
      keyPath: 'id',      // 主键
      autoIncrement: true // 自动递增
    });

    // 创建索引
    objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex('email', 'email', { unique: true });
  }
};

// 3. 打开成功
request.onsuccess = (event) => {
  const db = event.target.result;

  // 添加数据
  const transaction = db.transaction(['users'], 'readwrite');
  const objectStore = transaction.objectStore('users');

  objectStore.add({ name: 'Alice', email: 'alice@example.com', age: 30 });
  objectStore.add({ name: 'Bob', email: 'bob@example.com', age: 25 });

  transaction.oncomplete = () => {
    console.log('数据添加成功');
  };
};

// 4. 错误处理
request.onerror = (event) => {
  console.error('数据库错误:', event.target.error);
};
```

### CRUD 操作

```javascript
// 假设已经打开数据库 db

// 增加（Create）
function addUser(user) {
  const transaction = db.transaction(['users'], 'readwrite');
  const objectStore = transaction.objectStore('users');
  const request = objectStore.add(user);

  request.onsuccess = () => {
    console.log('添加成功，ID:', request.result);
  };
}

// 读取（Read）
function getUser(id) {
  const transaction = db.transaction(['users'], 'readonly');
  const objectStore = transaction.objectStore('users');
  const request = objectStore.get(id);

  request.onsuccess = () => {
    console.log('用户数据:', request.result);
  };
}

// 更新（Update）
function updateUser(user) {
  const transaction = db.transaction(['users'], 'readwrite');
  const objectStore = transaction.objectStore('users');
  const request = objectStore.put(user); // put 会覆盖已存在的数据

  request.onsuccess = () => {
    console.log('更新成功');
  };
}

// 删除（Delete）
function deleteUser(id) {
  const transaction = db.transaction(['users'], 'readwrite');
  const objectStore = transaction.objectStore('users');
  const request = objectStore.delete(id);

  request.onsuccess = () => {
    console.log('删除成功');
  };
}
```

### 索引查询

```javascript
// 通过索引查询
function getUserByEmail(email) {
  const transaction = db.transaction(['users'], 'readonly');
  const objectStore = transaction.objectStore('users');
  const index = objectStore.index('email');
  const request = index.get(email);

  request.onsuccess = () => {
    console.log('查询结果:', request.result);
  };
}

// 游标遍历
function getAllUsers() {
  const transaction = db.transaction(['users'], 'readonly');
  const objectStore = transaction.objectStore('users');
  const request = objectStore.openCursor();

  request.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      console.log('用户:', cursor.value);
      cursor.continue(); // 继续下一条
    } else {
      console.log('遍历完成');
    }
  };
}

// 范围查询
function getUsersByAgeRange(minAge, maxAge) {
  const transaction = db.transaction(['users'], 'readonly');
  const objectStore = transaction.objectStore('users');
  const index = objectStore.index('age');
  const range = IDBKeyRange.bound(minAge, maxAge);
  const request = index.openCursor(range);

  request.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      console.log('用户:', cursor.value);
      cursor.continue();
    }
  };
}
```

### 使用 Promise 封装

```javascript
// 封装为 Promise
function openDB(name, version) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('users')) {
        const store = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
        store.createIndex('name', 'name', { unique: false });
      }
    };
  });
}

// 使用 async/await
async function addUserAsync(user) {
  const db = await openDB('MyDatabase', 1);
  const transaction = db.transaction(['users'], 'readwrite');
  const objectStore = transaction.objectStore('users');

  return new Promise((resolve, reject) => {
    const request = objectStore.add(user);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
```

### 使用场景

- 离线应用的数据缓存
- 大量结构化数据存储
- 文件和 Blob 存储
- 复杂查询需求

### 优缺点

**优点**：
- 容量大（GB 级别）
- 支持复杂数据类型
- 支持索引和事务
- 异步操作，不阻塞主线程

**缺点**：
- API 复杂，学习成本高
- 回调地狱（需要封装 Promise）
- 不支持跨域访问

## 五、存储方案对比

| 特性 | Cookie | localStorage | sessionStorage | IndexedDB |
|------|--------|--------------|----------------|-----------|
| 容量 | 4KB | 5-10MB | 5-10MB | 数百 MB - GB |
| 生命周期 | 可设置过期 | 永久 | 标签页关闭 | 永久 |
| 作用域 | 同源 + 可配置 | 同源共享 | 当前标签页 | 同源共享 |
| 自动发送 | 是 | 否 | 否 | 否 |
| 数据类型 | 字符串 | 字符串 | 字符串 | 任意类型 |
| API 类型 | 同步 | 同步 | 同步 | 异步 |
| 索引支持 | 否 | 否 | 否 | 是 |
| 事务支持 | 否 | 否 | 否 | 是 |

## 六、选型指南

```
需要存储什么？
├── 需要发送给服务器？
│   └── 是 → Cookie
├── 数据量小（<5MB）且简单？
│   ├── 需要永久保存 → localStorage
│   └── 仅当前会话 → sessionStorage
└── 数据量大或需要复杂查询？
    └── IndexedDB
```

### 典型场景

**Cookie**：
- 用户登录状态（Session ID）
- 记住密码
- 广告追踪

**localStorage**：
- 用户主题设置
- 语言偏好
- 表单草稿
- 简单的离线数据

**sessionStorage**：
- 多步骤表单的临时数据
- 单次会话的状态
- 页面刷新保持的临时数据

**IndexedDB**：
- 离线邮件客户端
- 大型文件缓存
- 复杂的离线应用
- 需要索引查询的数据

## 七、安全注意事项

### XSS 防护

```javascript
// 不要存储敏感信息的明文
// ❌ 错误
localStorage.setItem('password', '123456');

// ✅ 正确：敏感信息应该加密或不存储
// 使用 HttpOnly Cookie 存储认证信息
```

### CSRF 防护

```javascript
// 使用 SameSite 属性
document.cookie = "sessionId=abc; SameSite=Strict; Secure";
```

### 输入验证

```javascript
// 从存储读取的数据也需要验证
const userData = localStorage.getItem('user');
if (userData) {
  try {
    const user = JSON.parse(userData);
    // 验证数据结构
    if (user && typeof user.name === 'string') {
      // 使用数据
    }
  } catch (e) {
    console.error('数据格式错误');
  }
}
```

## 八、性能优化

### 1. 避免频繁读写

```javascript
// ❌ 错误：每次都读写
function updateCount() {
  let count = parseInt(localStorage.getItem('count') || '0');
  count++;
  localStorage.setItem('count', count.toString());
}

// ✅ 正确：批量操作
let count = parseInt(localStorage.getItem('count') || '0');
function updateCount() {
  count++;
}
window.addEventListener('beforeunload', () => {
  localStorage.setItem('count', count.toString());
});
```

### 2. 使用 IndexedDB 处理大数据

```javascript
// ❌ 错误：localStorage 存储大数据
localStorage.setItem('largeData', JSON.stringify(hugeArray)); // 可能阻塞

// ✅ 正确：使用 IndexedDB
async function saveLargeData(data) {
  const db = await openDB('MyDB', 1);
  const tx = db.transaction(['data'], 'readwrite');
  await tx.objectStore('data').put({ id: 1, data });
}
```

### 3. 数据压缩

```javascript
// 对于大文本数据，可以使用压缩
import pako from 'pako';

// 压缩
const compressed = pako.deflate(JSON.stringify(largeData));
localStorage.setItem('data', btoa(String.fromCharCode(...compressed)));

// 解压
const stored = localStorage.getItem('data');
const compressed = Uint8Array.from(atob(stored), c => c.charCodeAt(0));
const data = JSON.parse(pako.inflate(compressed, { to: 'string' }));
```

## 总结

浏览器四大存储方案各有特点：

- **Cookie**：容量小但能自动发送给服务器，适合会话管理
- **localStorage**：简单易用的持久化存储，适合小量数据
- **sessionStorage**：会话级存储，适合临时数据
- **IndexedDB**：功能强大的数据库，适合大量复杂数据

选择合适的存储方案，需要考虑数据量、生命周期、是否需要发送给服务器、是否需要复杂查询等因素。对于大多数场景，localStorage 已经足够；需要大量数据或复杂查询时，使用 IndexedDB。
