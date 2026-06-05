---
title: '浏览器渲染流程'
publishDate: '2026-03-08 08:00:00'
description: '网络请求、构建DOM/CSSOM、渲染、布局、绘制'
tags:
  - Network
  - Browser
language: 'zh-CN'
---

我们在 [计算机网络基础 for FEdev](https://bolaxious.cn/handbook/network/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9Chandbook/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9Chandbook) 这篇文章中可以知道，当在浏览器的地址栏输入URL后，流程是这样的：

1. 浏览器解析URL
2. DNS查询域名对应的IP
3. 建立TCP连接
4. 发送HTTP请求
5. 服务器处理请求并响应数据

我们并没有说过，浏览器在收到响应数据后的过程是什么样的，这篇文章正是讲这个的。

当浏览器接收到服务器返回的HTML文档后，渲染引擎就开始工作了。这个将HTML、CSS和JavaScript转换成屏幕上像素的过程，被称为"关键渲染路径"（CRP），下面是CRP的流程：

- **构建DOM树**：浏览器从上到下解析HTML文档，将各种HTML标签（如 `<html>`、`<body>`、`<div>`）转换成一个树形结构，这就是文档对象模型（Document Object Model, DOM）。DOM是HTML文档在内存中的对象表示，它包含了文档的内容和结构。

- **构建CSSOM树 (Building the CSSOM Tree)**：在解析HTML的过程中，如果遇到CSS（无论是通过 `<link>` 标签引用的外部CSS文件，还是 `<style>` 标签内的内联样式），浏览器会开始解析CSS。它会将CSS规则转换成一个同样是树形结构的CSS对象模型（CSS Object Model, CSSOM）。CSSOM包含了页面元素的样式信息。

- **构建渲染树 (Render Tree Construction)**：DOM树和CSSOM树构建完成后，浏览器会将它们结合起来，创建一个渲染树（Render Tree）。渲染树只包含需要显示在页面上的节点。例如，像 `<head>` 这样本身不可见的标签，或者通过 `display: none;` 隐藏的元素，都不会出现在渲染树中。渲染树中的每个节点都包含了其在页面上的可见内容和样式信息。

- **布局 (Layout / Reflow)**：有了渲染树，浏览器就可以计算出每个节点在屏幕上的确切位置和大小。这个过程称为布局（Layout），有时也叫回流（Reflow）。浏览器从渲染树的根节点开始遍历，确定每个元素的几何信息（位置、尺寸）。

- **绘制 (Painting / Rasterizing)**：布局阶段完成后，浏览器知道了每个元素应该在屏幕的哪个位置、画多大。接下来就是绘制（Painting）阶段。浏览器会将渲染树中的每个节点转换成屏幕上的实际像素。这个过程涉及到将文本、颜色、图像、边框、阴影等所有可见部分绘制出来。

- **合成 (Compositing)**：为了提高效率，浏览器可能会将页面的不同部分绘制在不同的图层（Layers）上。合成（Compositing）步骤就是将这些图层按照正确的顺序合并在一起，最终显示在屏幕上。这对于处理复杂的动画和滚动效果尤其重要，因为它可以避免对整个页面进行重新绘制。

接下来对上述过程中节点做更详细的阐述。

## 构建DOM与CSSOM

### 一、DOM树的构建过程 (Incremental)

当浏览器从服务器接收到HTML文档的字节数据后，它会立即开始处理，这个过程是渐进式的，意味着浏览器无需等待整个文档加载完毕就可以开始解析和渲染页面。

**构建流程如下：**

- **字节 (Bytes) → 字符 (Characters)**：浏览器根据文件指定的编码（例如 UTF-8）将原始的字节数据转换为字符。
- **字符 (Characters) → 令牌 (Tokens)**：浏览器将字符串形式的字符转换为W3C HTML5标准所规定的各种令牌（Token），例如 `<html>`、`<body>` 等。每个令牌都具有特殊的含义和一组属性。这个过程被称为"词法分析"或"令牌化"。
- **令牌 (Tokens) → 节点 (Nodes)**：经过词法分析后，令牌会被转换成定义了其属性和规则的"对象"（即节点）。
- **节点 (Nodes) → DOM树 (DOM Tree)**：由于HTML中的元素存在嵌套关系，这些节点之间会根据这种关系链接成一个树形数据结构，这就是文档对象模型（DOM）。

**关键特性：渐进式构建**

DOM的构建过程是自上而下、循序渐进的。浏览器每接收到一部分HTML，就会解析并生成对应的DOM节点，并将其添加到DOM树中。这使得浏览器可以在接收到全部HTML之前，就开始渲染页面的已就绪部分，这也是为什么我们有时会看到网页内容从上到下一点点加载显示出来的原因。

### 二、CSSOM树的构建过程 (Blocking)

与构建DOM类似，当浏览器遇到CSS代码（无论是外部CSS文件、style标签还是内联样式）时，也会进行类似的处理。

**构建流程如下：**

- **字节 (Bytes) → 字符 (Characters)**：将CSS文件字节转换为字符。
- **字符 (Characters) → 令牌 (Tokens)**：将字符转换为CSS令牌。
- **令牌 (Tokens) → 节点 (Nodes)**：将令牌转换为包含样式信息的CSS节点。
- **节点 (Nodes) → CSSOM树 (CSSOM Tree)**：将CSS节点聚合成一个树形结构，即CSS对象模型（CSSOM）。

**关键特性：渲染阻塞**

与DOM不同，CSSOM的构建是渲染阻塞 (Render-Blocking)的。这意味着在CSSOM树完全构建完成之前，浏览器不会进行后续的渲染树构建、布局和绘制工作。

### 三、为何DOM是渐进式的，而CSSOM是阻塞性的？

理解这个差异的核心在于样式的继承和覆盖规则。

- **对于DOM**：一个父节点的结构并不会被其后的兄弟节点或子节点所改变。解析到 `<div>` 时，浏览器就可以确定这是一个div元素，无需关心它后面会出现什么内容。因此，它可以一块一块地构建和显示。
- **对于CSSOM**：CSS的规则是层叠的。一个后面定义的样式规则可能会覆盖或修改前面定义的规则。

**举个例子：**

```html
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="box">这是一个盒子</div>
</body>
```

```css
/* style.css */
body {
  font-size: 16px;
}

.box {
  color: blue;
}

/* ... 文件后面可能还有很多其他规则 ... */

div {
  color: red; /* 这个规则会覆盖 .box 的颜色 */
}
```

在这个例子中，`.box` 元素的颜色最初被设为蓝色，但随后又被 `div` 选择器覆盖为红色。

如果浏览器不等 `style.css` 文件完全下载和解析完毕就开始渲染页面，它可能会先用蓝色渲染 `.box`，等解析到文件末尾时发现颜色应该是红色，于是不得不重新绘制这个元素。这种行为会导致页面内容的**"样式闪烁" (Flash of Unstyled Content, FOUC)**，用户体验极差。

为了避免这种情况，浏览器选择了一种更稳妥的策略：**等待所有CSS都加载和解析完毕，构建出完整的、最终的CSSOM树之后，再用这个最终的样式信息去渲染整个页面。** 这就是CSS之所以会"阻塞渲染"的原因。

### 小结与优化启示

- **DOM是增量的**：HTML的解析和DOM构建可以流式进行，无需等待整个文档。
- **CSSOM是阻塞的**：浏览器必须拥有完整的CSSOM才能进入下一渲染阶段，以确保元素样式的正确性。

这个基础知识直接引出了前端优化的一个核心原则：**尽快、尽早地加载CSS，并减少CSS文件的大小**，以缩短CSSOM的构建时间，从而缩短渲染被阻塞的时间，让用户能更快地看到页面的首次绘制。

## JS的加载和阻塞

### 一、JavaScript在渲染流程中的角色

JavaScript为网页带来了交互性，但它也是一把双刃剑。浏览器在解析HTML构建DOM的过程中，一旦遇到 `<script>` 标签，就会面临一个抉择。因为JavaScript有能力改变DOM的结构（例如使用 `document.write()` 或其他DOM操作API），所以浏览器必须谨慎行事。

### 二、默认 `<script>` 标签的阻塞行为

当HTML解析器遇到一个普通的 `<script>` 标签（没有 `async` 或 `defer` 属性）时，会发生以下情况：

- **暂停DOM构建**：HTML解析器会立即停止解析页面的其余部分。
- **下载脚本**：浏览器会发出请求，下载该脚本文件（如果是外部脚本）。
- **执行脚本**：脚本下载完成后，JavaScript引擎会立即执行它。
- **恢复DOM构建**：脚本执行完毕后，HTML解析器才会继续解析剩余的HTML文档。

这个过程被称为"解析器阻塞" (Parser Blocking)。如果脚本下载耗时很长，或者执行时间过久，整个页面的渲染都会被"卡住"，导致用户长时间看到一个白屏。这就是为什么我们通常建议将 `<script>` 标签放在 `</body>` 标签之前的原因之一：确保浏览器能够先解析和渲染完整个页面的主要内容。

### 三、优化手段：`async` 和 `defer`

为了解决脚本阻塞带来的性能问题，HTML5为 `<script>` 标签引入了两个布尔属性：`async` 和 `defer`。它们都告诉浏览器可以异步（在后台）下载脚本，而无需暂停DOM构建。

#### 1. `async` (Asynchronous)

```html
<script async src="path/to/script.js"></script>
```

- **行为**：
  - 脚本的下载过程与HTML解析并行进行（异步下载）。
  - 脚本下载完成后，HTML解析器会立即暂停，并执行该脚本。
  - 执行完毕后，恢复HTML解析。
- **执行顺序**：多个带 `async` 的脚本，它们的执行顺序是不确定的。哪个脚本先下载完，哪个就先执行。
- **适用场景**：适用于那些不依赖DOM、也不依赖其他脚本的独立脚本。例如，网站分析、广告脚本等。

#### 2. `defer` (Deferred)

```html
<script defer src="path/to/script.js"></script>
```

- **行为**：
  - 脚本的下载过程与HTML解析并行进行（异步下载）。
  - 脚本下载完成后，并不会立即执行。它会等待整个HTML文档解析完毕（即 `</html>` 标签被解析后），然后在 `DOMContentLoaded` 事件触发之前执行。
- **执行顺序**：多个带 `defer` 的脚本，它们的执行顺序会按照它们在HTML中出现的顺序来依次执行。
- **适用场景**：适用于那些需要操作DOM，或者脚本之间有依赖关系的场景。这是目前最推荐的脚本加载优化方案。

## 渲染树、布局、绘制

### 一、什么是渲染树 (Render Tree)？

在浏览器成功构建了DOM树（代表文档结构）和CSSOM树（代表文档样式）之后，它需要将这两者结合起来，才能知道最终要"画"什么东西在屏幕上。这个结合的产物就是渲染树 (Render Tree)。

- **目的**：渲染树是页面所有可见内容的结构化表示。它的任务是确定哪些节点需要被渲染，以及它们应用了哪些样式。

- **构建过程**：
  1. 浏览器从DOM树的根节点开始遍历。
  2. 对于每个遍历到的节点，它会去CSSOM树中查找匹配的样式规则并应用。
  3. 最终，它会为每个可见节点生成一个渲染树上的节点。

- **与DOM树的区别**：渲染树和DOM树不是一一对应的。
  - **不可见元素被忽略**：渲染树不包含任何在视觉上不可见的元素。例如：
    - `<head>`、`<script>`、`<meta>` 等本身不产生视觉输出的标签。
    - 通过CSS设置了 `display: none;` 的节点（及其所有后代节点）。
  - **注意**：通过 `visibility: hidden;` 或 `opacity: 0;` 隐藏的元素会出现在渲染树中，因为它们仍然占据着页面空间，只是不可见而已。

简单来说，DOM树是关于"内容和结构"，而渲染树是关于"要画什么以及如何画"。

### 二、什么是布局 (Layout / Reflow)？

一旦渲染树构建完成，浏览器就知道需要渲染哪些节点以及它们的样式，但还不知道它们在屏幕上的确切位置和大小。布局 (Layout) 步骤就是为了计算这些几何信息。

- **目的**：计算出渲染树中每个节点在设备视口（viewport）内的精确位置和尺寸。这个过程也常被称为回流 (Reflow)。

- **工作流程**：
  1. 浏览器从渲染树的根节点开始，进行一次遍历。
  2. 它将所有元素的大小和位置信息输出为一个"盒模型"(Box Model)，这个模型精确地捕捉了每个元素在页面上的位置（x, y坐标）和尺寸（宽度, 高度）。
  3. 相对单位（如 `%`、`em`、`rem`、`vw`）会被计算成屏幕上的绝对像素值。

- **回流 (Reflow)**：布局是一个从头到尾的完整过程。但是，当页面上某个元素的几何属性（如宽度、高度、边距、边框）发生变化时，可能会影响到其他元素的位置。浏览器需要重新计算受影响部分的布局，这个重新计算的过程就叫做"回流"。回流是一个非常耗费性能的操作，因为一个微小的改动也可能导致整个页面的重新布局。

可以把布局想象成画一张建筑蓝图：虽然你知道需要一扇门和一扇窗户（渲染树），但你需要通过布局来确定门和窗户在墙上的确切尺寸和位置。

### 三、什么是绘制 (Paint)？

在布局阶段确定了所有可见元素的确切几何信息后，浏览器终于可以把它们"画"到屏幕上了。这个过程就是绘制 (Paint)。

- **目的**：将渲染树中的每个节点转换为屏幕上的实际像素。

- **工作流程**：
  1. 布局阶段结束后，浏览器得到了所有元素的精确"蓝图"。
  2. 绘制阶段会遍历渲染树，调用渲染器的绘制函数，将元素的背景、颜色、文字、边框、阴影等所有视觉效果填充到屏幕的对应区域。

- **图层与合成 (Layers & Compositing)**：为了提高效率，浏览器并不会把所有东西都画在一个巨大的画布上。它会智能地将页面内容提升到不同的图层 (Layer) 上。
  - 当某个元素发生变化时（例如一个CSS动画），如果它位于独立的图层上，浏览器就只需要重绘这一个图层，而不需要重绘整个页面。
  - 最后，浏览器会将所有这些独立的图层按照正确的顺序合成 (Composite) 在一起，形成最终的屏幕画面。

## 回流与重绘

### 一、什么是回流 (Reflow)？

回流（也叫重排）是指浏览器重新计算元素的几何属性（位置和尺寸）的过程。当页面的布局或几何属性发生变化时，浏览器需要重新执行布局阶段。

**触发回流的常见操作：**

- **修改元素的几何属性**：
  - 改变元素的宽度、高度：`width`、`height`
  - 改变元素的内外边距：`padding`、`margin`、`border`
  - 改变元素的位置：`top`、`left`、`right`、`bottom`
  - 改变元素的显示方式：`display`、`position`、`float`
  - 改变字体大小：`font-size`、`font-family`、`line-height`

- **DOM 操作**：
  - 添加或删除可见的 DOM 元素
  - 元素位置改变
  - 元素尺寸改变（包括外边距、内边距、边框厚度、宽度、高度等）
  - 页面初次渲染
  - 浏览器窗口尺寸改变（resize）

- **读取某些属性**（会强制浏览器立即进行回流以返回最新值）：
  - `offsetTop`、`offsetLeft`、`offsetWidth`、`offsetHeight`
  - `scrollTop`、`scrollLeft`、`scrollWidth`、`scrollHeight`
  - `clientTop`、`clientLeft`、`clientWidth`、`clientHeight`
  - `getComputedStyle()`
  - `getBoundingClientRect()`

**回流的影响范围：**

回流是一个从上到下的递归过程。当一个元素发生回流时，它的所有子元素以及在文档流中位于它后面的元素都可能需要重新计算位置和尺寸。这就是为什么回流的性能开销很大。

### 二、什么是重绘 (Repaint)？

重绘是指当元素的外观（如颜色、背景、阴影等）发生变化，但没有影响到布局时，浏览器会重新绘制该元素的过程。

**只触发重绘的操作：**

- 改变元素的颜色：`color`
- 改变元素的背景：`background`、`background-color`、`background-image`
- 改变元素的可见性：`visibility`（注意：`display: none` 会触发回流）
- 改变元素的轮廓：`outline`、`outline-color`、`outline-width`
- 改变元素的阴影：`box-shadow`、`text-shadow`

**重绘 vs 回流：**

- 回流必然导致重绘（因为元素的位置或尺寸变了，肯定要重新画）
- 重绘不一定导致回流（只是外观变了，位置和尺寸没变）
- 回流的性能开销远大于重绘

### 三、浏览器的优化机制

现代浏览器会对回流和重绘进行优化。它们会维护一个队列，把所有引起回流和重绘的操作放入队列中，等队列中的操作达到一定数量或者到了一定的时间间隔，浏览器会批量执行这些操作，这样可以把多次回流和重绘变成一次。

但是，当你访问以下属性或方法时，浏览器会��即清空队列并执行所有批处理操作，因为这些属性或方法需要返回最新的布局信息：

```javascript
// 这些操作会强制浏览器立即进行回流
element.offsetTop;
element.getBoundingClientRect();
window.getComputedStyle(element);
```

## 图层提升与合成

### 一、什么情况下会创建新图层？

浏览器会为某些特定的元素创建独立的渲染图层（Compositing Layer）。拥有独立图层的元素，其变化不会影响其他图层，从而提高渲染性能。

**创建新图层的条件：**

- **3D 或透视变换的 CSS 属性**：
  ```css
  transform: translateZ(0);
  transform: translate3d(0, 0, 0);
  transform: perspective(1000px);
  ```

- **使用 `will-change` 属性**：
  ```css
  will-change: transform;
  will-change: opacity;
  ```

- **`<video>`、`<canvas>`、`<iframe>` 元素**

- **使用 CSS filters**：
  ```css
  filter: blur(10px);
  ```

- **元素有一个 z-index 较低且包含一个复合层的兄弟元素**

- **元素有一个 `position: fixed` 的定位**

- **对 opacity、transform、filter 应用了 CSS 动画或过渡**

### 二、图层的利弊

**优点：**
- 独立图层的变化不会触发其他图层的重绘
- 某些变化（如 transform、opacity）可以由合成线程处理，不阻塞主线程

**缺点：**
- 每个图层都需要内存来存储
- 图层过多会增加内存消耗，反而降低性能
- 图层管理本身也有开销

**注意事项：**

不要滥用图层提升。只对真正需要频繁变化的元素（如动画元素）使用图层提升技术。

### 三、合成线程的工作原理

合成（Compositing）是在一个独立的合成线程中进行的，这意味着：

- **不阻塞主线程**：即使主线程在执行 JavaScript，合成线程也可以继续工作
- **高性能动画**：只改变 `transform` 和 `opacity` 的动画可以完全在合成线程中完成，不需要主线程参与
- **硬件加速**：合成过程可以利用 GPU 加速

**只触发合成的属性：**

只有两个 CSS 属性的变化可以完全在合成线程中处理，不触发布局和绘制：
- `transform`
- `opacity`

这就是为什么使用 `transform: translateX(100px)` 比使用 `left: 100px` 性能更好的原因。

## CSS 阻塞的深入理解

### 一、CSS 阻塞渲染

我们前面提到，CSSOM 的构建会阻塞渲染。这里补充一些细节：

**CSS 阻塞的具体含义：**

- CSS 会阻塞渲染树的构建，从而阻塞页面的首次渲染
- 浏览器会等待所有 CSS 文件下载并解析完成后，才会开始渲染页面
- 这是为了避免 FOUC（Flash of Unstyled Content，无样式内容闪烁）

### 二、CSS 也会阻塞 JavaScript 执行

这是一个容易被忽略的点：**CSS 不仅阻塞渲染，还会阻塞 JavaScript 的执行。**

**原因：**

JavaScript 可以查询元素的样式信息，例如：

```javascript
const element = document.querySelector('.box');
const styles = window.getComputedStyle(element);
console.log(styles.color); // 需要知道最终的样式
```

如果 JavaScript 在 CSSOM 构建完成之前执行，它可能会获取到不正确的样式信息。因此，浏览器会让 JavaScript 等待 CSSOM 构建完成。

**实际影响：**

```html
<head>
  <link rel="stylesheet" href="slow-loading-styles.css">
</head>
<body>
  <div class="box">内容</div>
  <script>
    // 这个脚本会等待 slow-loading-styles.css 加载完成后才执行
    console.log('Script executed');
  </script>
</body>
```

即使这个脚本不查询任何样式，它也会被 CSS 阻塞。

### 三、媒体查询与 CSS 阻塞

并非所有 CSS 都会阻塞渲染。浏览器会根据媒体查询来判断某个样式表是否适用于当前设备：

```html
<!-- 这个会阻塞渲染，因为它适用于所有设备 -->
<link rel="stylesheet" href="styles.css">

<!-- 这个不会阻塞渲染，因为它只适用于打印 -->
<link rel="stylesheet" href="print.css" media="print">

<!-- 这个可能会阻塞渲染，取决于设备宽度 -->
<link rel="stylesheet" href="mobile.css" media="(max-width: 600px)">
```

浏览器会下载所有样式表，但只有匹配当前媒体类型的样式表会阻塞渲染。

## JavaScript 执行时机的补充

### 一、内联脚本 vs 外部脚本

**内联脚本：**

```html
<script>
  console.log('内联脚本');
</script>
```

- 不需要下载，立即执行
- 仍然会阻塞 HTML 解析
- 仍然需要等待之前的 CSS 加载完成（因为可能查询样式）

**外部脚本：**

```html
<script src="script.js"></script>
```

- 需要下载，然后执行
- 下载和执行都会阻塞 HTML 解析

### 二、Module 脚本的特殊性

ES6 模块脚本有一些特殊的行为：

```html
<script type="module" src="main.js"></script>
```

- **默认是 defer 的**：即使不写 `defer` 属性，模块脚本也会延迟执行
- **自动严格模式**：模块脚本自动运行在严格模式下
- **有独立的作用域**：模块顶层的变量不会污染全局作用域
- **支持 import/export**

### 三、动态插入的脚本

通过 JavaScript 动态创建的脚本标签，默认是异步的：

```javascript
const script = document.createElement('script');
script.src = 'dynamic.js';
document.body.appendChild(script);
// 这个脚本默认是 async 的，不会阻塞页面
```

如果你想让动态脚本按顺序执行，需要显式设置：

```javascript
script.async = false; // 按插入顺序执行
```

## 渲染树的边界情况

### 一、display: none vs visibility: hidden vs opacity: 0

这三个属性都可以"隐藏"元素，但它们的行为完全不同：

| 属性 | 是否在渲染树中 | 是否占据空间 | 是否响应事件 | 是否影响子元素 |
|------|---------------|-------------|-------------|---------------|
| `display: none` | ❌ 否 | ❌ 否 | ❌ 否 | ✅ 是（子元素也不显示） |
| `visibility: hidden` | ✅ 是 | ✅ 是 | ❌ 否 | ⚠️ 可以（子元素可以设置 `visibility: visible` 显示） |
| `opacity: 0` | ✅ 是 | ✅ 是 | ✅ 是 | ✅ 是（子元素也透明） |

**示例：**

```html
<style>
  .parent { visibility: hidden; }
  .child { visibility: visible; }
</style>

<div class="parent">
  我不可见
  <div class="child">但我可见！</div>
</div>
```

### 二、iframe 的独立渲染

每个 `<iframe>` 都有自己独立的渲染流程：

- 独立的 DOM 树
- 独立的 CSSOM 树
- 独立的渲染树
- 独立的 JavaScript 执行环境

父页面和 iframe 的渲染是相互独立的。父页面的回流不会影响 iframe，反之亦然。

### 三、Shadow DOM 的渲染隔离

Shadow DOM 提供了样式和结构的封装：

```javascript
const host = document.querySelector('#host');
const shadowRoot = host.attachShadow({ mode: 'open' });
shadowRoot.innerHTML = `
  <style>
    p { color: red; }
  </style>
  <p>这个样式不会影响外部</p>
`;
```

- Shadow DOM 内部的样式不会影响外部
- 外部的样式（除了继承属性）也不会影响 Shadow DOM 内部
- Shadow DOM 有自己的渲染树

## DOMContentLoaded vs Load 事件

### DOMContentLoaded 事件

```javascript
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM 已就绪');
});
```

**触发时机：**
- HTML 文档被完全解析，DOM 树构建完成
- 所有带 `defer` 的脚本已执行完毕
- **不等待**样式表、图片、iframe 等资源加载

**适用场景：**
- 需要操作 DOM 的代码
- 不依赖图片尺寸的初始化逻辑

### Load 事件

```javascript
window.addEventListener('load', () => {
  console.log('所有资源已加载');
});
```

**触发时机：**
- 整个页面及所有依赖资源（样式表、图片、iframe、字体等）都已加载完成

**适用场景：**
- 需要知道图片尺寸的代码
- 需要确保所有资源都可用的场景

**执行顺序：**

```
1. HTML 解析开始
2. 遇到 <script defer> → 异步下载
3. 遇到 <img> → 异步下载
4. HTML 解析完成
5. defer 脚本执行
6. 🔥 DOMContentLoaded 事件触发
7. 图片等资源继续加载
8. 🔥 Load 事件触发
```



















































































