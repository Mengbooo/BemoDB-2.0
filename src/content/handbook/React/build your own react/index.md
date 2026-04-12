---
title: '构建你自己的 React'
publishDate: '2026-03-11 08:00:00'
description: '深入理解 React 核心原理：从零实现 Fiber 架构、并发渲染和 Hooks'
tags:
  - React
  - Fiber
  - 源码解析
language: 'zh-CN'
---

# 构建你自己的 React

本文通过逐步实现一个简化的 React（称为 "Didact"），深入解析 React 的核心工作原理。我们将实现包括 Fiber 架构、时间切片、协调算法和 Hooks 在内的关键特性。

## 一、从 createElement 开始

React 的第一步是将 JSX 转换为 JavaScript 对象。JSX 本质上是 `createElement` 的语法糖：

```javascript
const element = (
  <div id="container">
    <h1>Hello</h1>
    <span>World</span>
  </div>
);

// 编译后等价于
const element = React.createElement(
  'div',
  { id: 'container' },
  React.createElement('h1', null, 'Hello'),
  React.createElement('span', null, 'World')
);
```

`createElement` 的实现非常直观：

```javascript
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === 'object'
          ? child
          : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
```

这个返回的对象就是我们常说的 **Virtual DOM** 节点，它描述了 UI 应该是什么样子。

## 二、实现 render 函数

有了 Virtual DOM，我们需要将其渲染到真实的 DOM 上。最朴素的实现如下：

```javascript
function render(element, container) {
  // 创建 DOM 节点
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type);

  // 将 props 应用到 DOM
  const isProperty = (key) => key !== 'children';
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  // 递归渲染子节点
  element.props.children.forEach((child) =>
    render(child, dom)
  );

  container.appendChild(dom);
}
```

这个实现的问题是**同步且不可中断**。对于大型组件树，这会阻塞主线程，导致页面卡顿。

## 三、引入并发模式

为了解决阻塞问题，React 引入了**并发渲染**的概念。核心思想是：

1. 将渲染工作拆分成小单元
2. 在浏览器空闲时执行每个单元
3. 允许高优先级任务打断低优先级任务

使用 `requestIdleCallback` API，我们可以在浏览器空闲时执行工作：

```javascript
let nextUnitOfWork = null;

function workLoop(deadline) {
  let shouldYield = false;
  
  while (nextUnitOfWork && !shouldYield) {
    // 执行一个工作单元
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    
    // 检查是否还有剩余时间
    shouldYield = deadline.timeRemaining() < 1;
  }
  
  // 如果还有未完成的工作，继续调度
  if (nextUnitOfWork) {
    requestIdleCallback(workLoop);
  }
}

requestIdleCallback(workLoop);
```

## 四、Fiber 架构

为了支持增量渲染，React 重写了其核心数据结构，引入了 **Fiber**。每个 Fiber 节点代表一个工作单元，包含以下关键信息：

```javascript
function createFiber(element) {
  return {
    type: element.type,
    props: element.props,
    parent: null,
    child: null,
    sibling: null,
    alternate: null, // 指向旧树中对应的 Fiber
    dom: null,
    effectTag: 'PLACEMENT', // 标记需要执行的操作
  };
}
```

### Fiber 树的结构

与传统树结构不同，Fiber 树使用**链表**来表示父子兄弟关系：

- `child`: 指向第一个子节点
- `sibling`: 指向下一个兄弟节点
- `parent`: 指向父节点

这种结构使得 React 可以方便地遍历和复用节点。

```
       Parent
       /     \
      /       \
   Child1 --> Child2 --> Child3
```

## 五、Render 阶段和 Commit 阶段

React 将更新过程分为两个阶段：

### Render 阶段（可中断）

构建或更新 Fiber 树，计算副作用。这个阶段是纯计算，可以安全地中断和恢复。

```javascript
function performUnitOfWork(fiber) {
  // 1. 将当前 Fiber 添加到 DOM
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  
  // 2. 将当前节点添加到容器或父节点
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }
  
  // 3. 处理子节点
  const elements = fiber.props.children;
  renderChildFibers(fiber, elements);
  
  // 4. 返回下一个工作单元
  if (fiber.child) {
    return fiber.child;
  }
  
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}
```

### Commit 阶段（同步执行）

将所有变更一次性提交到真实 DOM。这个阶段必须同步执行，以保证 UI 的一致性。

```javascript
function commitRoot() {
  pendingRootFiber.child?.effectTag === 'PLACEMENT'
    ? commitWork(pendingRootFiber.child)
    : null;
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) return;
  
  // 将子节点的 DOM 提升到父节点
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;
  
  // 根据 effectTag 执行操作
  if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === 'DELETION') {
    commitDeletion(fiber, domParent);
  }
  
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
```

## 六、协调（Reconciliation）算法

协调算法负责比较新旧树，找出最小变更集。核心规则：

1. **type 不同**：直接替换整棵树
2. **type 相同**：复用 Fiber，只更新变化的 props
3. **添加 key**：优化列表渲染，识别移动的元素

```javascript
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate?.child;
  let prevSibling = null;
  
  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;
    
    // 比较 element 和 oldFiber
    const sameType = element?.type === oldFiber?.type;
    
    if (sameType) {
      // 类型相同，复用并更新 props
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE',
      };
    }
    
    if (element && !sameType) {
      // 新节点，创建 Placement
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT',
      };
    }
    
    if (oldFiber && !sameType) {
      // 旧节点被删除
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }
    
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    
    // 链接到 Fiber 树
    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }
    
    prevSibling = newFiber;
    index++;
  }
}
```

## 七、函数组件和 Hooks

### 函数组件的处理

函数组件与原生组件的区别在于：

1. 没有对应的 DOM 节点
2. 需要先执行函数获取返回的 element

```javascript
function updateFunctionComponent(fiber) {
  // 执行函数组件，获取返回的 element
  const children = fiber.type(fiber.props);
  reconcileChildren(fiber, children);
}

function updateHostComponent(fiber) {
  // 原生组件，创建 DOM 节点
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
}
```

### Hooks 的实现

Hooks 的核心是**按顺序维护状态链表**。每次渲染时，按相同的顺序访问 Hook 值。

```javascript
let functionComponent = null;
let hookIndex = 0;
let nextAlternateHook = null;

function useState(initial) {
  const oldHook =
    nextAlternateHook && nextAlternateHook.alternate;
  
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: oldHook ? oldHook.queue : [],
    alternate: null,
  };
  
  // 将 hook 链接到链表
  if (hookIndex === 0) {
    functionComponent.hooks = [hook];
  } else {
    functionComponent.hooks[hookIndex - 1].next = hook;
  }
  
  hookIndex++;
  
  // 保存 alternate 引用
  if (oldHook) {
    hook.alternate = oldHook;
  }
  
  // setState 实现
  hook.setState = (state) => {
    hook.queue.push(state);
    // 触发重新渲染
    wipRoot = {
      ...currentRoot,
      alternate: currentRoot,
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
  };
  
  // 处理队列中的更新
  hook.queue.forEach((state) => {
    hook.state = typeof state === 'function' 
      ? state(hook.state) 
      : state;
  });
  hook.queue = [];
  
  return [hook.state, hook.setState];
}
```

### useEffect 的实现

```javascript
function useEffect(callback, deps) {
  const hook = {
    callback,
    deps,
    alternate: null,
  };
  
  // 连接到 hooks 链表
  if (hookIndex === 0) {
    functionComponent.hooks = [hook];
  } else {
    functionComponent.hooks[hookIndex - 1].next = hook;
  }
  
  hookIndex++;
  
  // 检查依赖是否变化
  const oldHook = hook.alternate;
  const depsChanged = oldHook
    ? deps.some((dep, i) => dep !== oldHook.deps[i])
    : true;
  
  if (deps.length === 0 || depsChanged) {
    hook.callback();
  }
}
```

## 八、完整的调度流程

将所有部分组合起来，完整的调度流程如下：

```javascript
let nextUnitOfWork = null;
let wipRoot = null;
let currentRoot = null;
let deletions = null;

function render(element, container) {
  wipRoot = {
    dom: container,
    child: element,
    alternate: currentRoot,
  };
  nextUnitOfWork = wipRoot;
  deletions = [];
}

function workLoop(deadline) {
  let shouldYield = false;
  
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  
  requestIdleCallback(workLoop);
}

function performUnitOfWork(fiber) {
  const isFunction = typeof fiber.type === 'function';
  
  if (isFunction) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }
  
  // 返回下一个工作单元
  if (fiber.child) return fiber.child;
  
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }
}

requestIdleCallback(workLoop);
```

## 总结

通过这个简化实现，我们理解了 React 的核心机制：

| 概念 | 作用 |
|------|------|
| **Virtual DOM** | 用 JS 对象描述 UI 结构 |
| **Fiber** | 可中断的工作单元，支持增量渲染 |
| **Render 阶段** | 构建 Fiber 树，计算副作用（可中断） |
| **Commit 阶段** | 提交变更到真实 DOM（同步） |
| **Reconciliation** | 比较新旧树，找出最小变更 |
| **Hooks** | 在函数组件中管理状态和副作用 |

React 的强大之处在于将这些复杂机制封装在简洁的 API 背后，让开发者可以专注于业务逻辑而非渲染细节。

> 注意：本文实现是为了教学目的，省略了 React 的许多优化和边界情况处理。实际生产环境中的 React 要复杂得多。
