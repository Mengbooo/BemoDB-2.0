---
title: '前端深度章节导引'
publishDate: '2026-07-06 18:30:00'
description: ''
tags:
  - daysGo
language: 'CN'
draft: true
comment: false
---

1. JavaScript 运行时模型
   - 搞清楚 JS 单线程到底指什么，以及它和浏览器多进程、多线程之间的关系。
   - 梳理调用栈、堆、任务队列、微任务队列各自承担的职责。
   - 解释宏任务、微任务、requestAnimationFrame、requestIdleCallback 的执行顺序。
   - 画出一轮事件循环中脚本执行、微任务清空、样式计算、布局、绘制之间的关系。
   - 分析长任务为什么会卡住页面交互和渲染。
   - 总结常见长任务拆分方式，如分片执行、延迟执行、Web Worker、调度器。
   - 对比浏览器事件循环和 Node.js 事件循环的差异。
   - 准备一个能在面试中讲清楚的事件循环示例。

2. 浏览器渲染主流程
   - 梳理 HTML 解析成 DOM 的过程。
   - 梳理 CSS 解析成 CSSOM 的过程。
   - 解释 DOM、CSSOM、Render Tree 之间的关系。
   - 区分 Layout、Paint、Composite 分别做什么。
   - 总结哪些操作会触发布局，哪些操作只触发重绘。
   - 解释合成层是什么，以及 transform、opacity 为什么通常性能更好。
   - 分析 top/left 和 transform 做动画时的性能差异。
   - 总结 will-change 的使用场景和滥用风险。
   - 准备一个从代码变更到渲染更新的完整讲述链路。

3. 前端性能指标体系
   - 搞清楚 LCP、INP、CLS、TTFB、FCP、TTI、TBT 分别衡量什么。
   - 区分加载性能、交互性能、视觉稳定性、网络响应性能。
   - 理解 Core Web Vitals 和真实用户体验之间的对应关系。
   - 区分实验室数据和真实用户数据。
   - 学会从指标异常反推瓶颈来源。
   - 总结 Lighthouse、Performance 面板、Web Vitals SDK 的使用方式。
   - 设计一个性能优化的目标、观测、优化、验收流程。
   - 准备一个性能问题定位案例。

4. 首屏性能优化
   - 拆解首屏慢的常见原因，如网络慢、资源大、JS 执行久、渲染阻塞。
   - 分析 JS 包体积如何影响下载、解析、执行和首屏可交互。
   - 理解 CSS 为什么会阻塞渲染。
   - 分析图片、字体、第三方脚本对首屏的影响。
   - 总结 preload、prefetch、preconnect、dns-prefetch 的使用场景。
   - 对比懒加载、按需加载、代码分包、路由级拆包。
   - 对比 CSR、SSR、SSG、ISR 对首屏体验的影响。
   - 分析骨架屏属于真实性能优化还是感知优化。
   - 形成一套首屏性能排查流程。

5. 长列表与大数据渲染
   - 理解虚拟列表只渲染可视区域的核心思想。
   - 掌握固定高度虚拟列表的滚动偏移、起止索引、占位高度计算。
   - 研究动态高度虚拟列表的高度缓存、预估高度、滚动校准方案。
   - 分析树形数据如何扁平化成可渲染列表。
   - 处理展开、折叠、搜索、定位、选中状态对虚拟列表的影响。
   - 总结万级数据渲染的瓶颈，如 DOM 数量、状态更新、递归渲染、布局计算。
   - 研究 React 场景下如何减少不必要重渲染。
   - 分析滚动白屏、跳动、定位不准的原因和解决方案。
   - 将本章关联到京东 BOM 树形列表经历，形成项目复盘材料。

6. 复杂状态管理设计
   - 区分组件内部状态、全局状态、服务端状态、派生状态、临时 UI 状态。
   - 判断什么状态应该局部维护，什么状态应该提升或全局化。
   - 理解状态范式化的价值，尤其是列表、树、表单场景。
   - 分析派生状态重复存储带来的同步问题。
   - 对比 Redux、Zustand、Jotai、MobX、Signals 的核心模型。
   - 理解订阅粒度如何影响性能。
   - 分析 Context 为什么可能导致大面积重渲染。
   - 研究状态管理如何和请求缓存、表单联动、权限控制结合。
   - 总结复杂业务状态设计的基本原则。

7. 动态表单架构
   - 梳理 JSON Schema 能描述的数据结构、类型、必填、枚举、嵌套等能力。
   - 区分 Data Schema、UI Schema、Rule Schema、Permission Schema。
   - 设计字段、布局、校验、联动、权限、异步数据源等表单 DSL 层次。
   - 研究字段联动如何建模，如依赖图、表达式、事件机制、规则引擎。
   - 处理条件显隐、动态必填、动态校验、动态默认值。
   - 设计异步数据源接入、缓存、取消、错误兜底。
   - 研究复杂表单状态如何管理，如 touched、dirty、validating、error。
   - 分析动态表单性能瓶颈，如全量重渲染、规则重复执行、深层对象更新。
   - 思考 Schema 版本化、兼容、迁移和调试能力。
   - 将本章关联到京东品规平台动态表单经历。

8. 低代码 / 配置化系统设计
   - 明确配置化解决的真实问题，是提效、复用、扩展还是交付标准化。
   - 区分配置化、低代码、无代码、规则引擎、工作流引擎。
   - 分析配置系统为什么容易变成另一套难维护代码。
   - 设计配置协议的边界，如数据结构、组件映射、事件、动作、权限。
   - 处理扩展能力和约束能力之间的平衡。
   - 对比运行时解析和编译时生成的优劣。
   - 设计预览、校验、回滚、灰度、发布流程。
   - 处理自定义逻辑注入，如脚本、表达式、插件、远程组件。
   - 总结配置化系统的可维护性原则。

9. 前端工程中的 DSL
   - 判断什么场景值得设计 DSL，而不是直接写代码。
   - 区分声明式 DSL 和命令式 DSL。
   - 设计 DSL 的语义层、执行层、调试层。
   - 研究 DSL 如何保持可读、可测、可版本化。
   - 设计类型约束和静态校验能力。
   - 思考 DSL 如何兼容历史版本。
   - 分析 DSL 如何和规则引擎、表单系统、低代码平台结合。
   - 研究 DSL 如何生成 UI、请求、校验、流程或代码。
   - 准备一个基于动态表单的 DSL 设计示例。

10. React 架构总览
   - 梳理 JSX 最终会被编译成什么。
   - 区分 React Element、Fiber Node、真实 DOM。
   - 理解 render、reconcile、commit 三个阶段分别做什么。
   - 分析 React 为什么需要虚拟 DOM。
   - 讨论虚拟 DOM 的收益和成本。
   - 从 setState 或 useState 开始，追踪一次更新到 DOM 修改的完整流程。
   - 对比 React 和 Vue 在响应式模型上的差异。
   - 准备一份 React 更新链路的口述稿。

11. React Fiber 深入
   - 理解 Fiber 出现前 Stack Reconciler 的问题。
   - 分析 Fiber 为什么采用链表结构。
   - 梳理 Fiber 节点上的关键字段。
   - 理解双缓存树 current 和 workInProgress 的作用。
   - 解释可中断渲染如何基于 Fiber 实现。
   - 研究 Scheduler 如何调度任务。
   - 理解 lane 模型解决了什么优先级问题。
   - 分析高优先级更新如何打断低优先级更新。
   - 区分 render 阶段可中断和 commit 阶段不可中断的原因。

12. React 更新机制
   - 梳理 setState、useState 触发更新后的流程。
   - 理解 update queue 的结构和执行方式。
   - 解释函数式更新为什么能拿到最新状态。
   - 分析批处理机制如何影响多次状态更新。
   - 理解 legacy batching 和 automatic batching 的差异。
   - 研究 flushSync 的作用和使用风险。
   - 理解 lane 如何参与更新优先级计算。
   - 总结状态更新、渲染、提交之间的关系。
   - 准备几个常见 setState 输出题背后的原理解释。

13. React Hooks 原理
   - 理解 Hooks 为什么依赖固定调用顺序。
   - 梳理 Hooks 链表如何记录每个 hook 的状态。
   - 分析 useState、useReducer 的内部状态存储方式。
   - 解释闭包陷阱是怎么产生的。
   - 区分 useEffect 和 useLayoutEffect 的执行时机。
   - 分析依赖数组的作用和常见错误。
   - 判断 useMemo、useCallback 什么时候有价值，什么时候只是负担。
   - 研究自定义 Hook 的抽象边界。
   - 准备 Hooks 常见追问的统一回答框架。

14. React 性能优化方法论
   - 明确 React 性能优化到底在优化渲染次数、渲染成本还是提交成本。
   - 判断 memo 什么时候有效，什么时候无效。
   - 分析 key 如何影响节点复用和状态保留。
   - 研究 Context 重渲染的优化方案。
   - 练习状态提升、状态下沉、组件拆分的取舍。
   - 分析列表渲染、表格、表单、弹窗等典型场景的优化点。
   - 使用 React DevTools Profiler 定位性能问题。
   - 总结过度优化的代价。
   - 将本章关联到虚拟列表和动态表单经历。

15. React 并发与 Suspense
   - 理解 concurrent rendering 解决的问题。
   - 分析可中断、可恢复、可丢弃渲染的意义。
   - 研究 transition 的使用场景。
   - 理解 Suspense 的基本机制。
   - 分析 throw promise 模型如何驱动 fallback。
   - 区分数据加载 Suspense、代码分割 Suspense、SSR Suspense。
   - 理解 hydration 为什么可能失败。
   - 研究 SSR streaming 的价值。
   - 思考并发特性在真实业务中的适用边界。

16. 前端组件设计
   - 判断组件边界应该按业务、交互、数据还是视觉拆分。
   - 区分基础组件、业务组件、复合组件、容器组件。
   - 对比受控组件和非受控组件。
   - 研究 compound component 模式适合什么场景。
   - 理解 headless component 的价值。
   - 对比 slot、render props、children function、hooks API。
   - 设计稳定、可扩展、不过度抽象的组件 API。
   - 处理组件默认行为和业务定制之间的关系。
   - 总结组件设计中的可维护性原则。

17. 组件库工程化
   - 明确组件库要解决复用、一致性、效率、质量中的哪些问题。
   - 设计组件库目录结构和包结构。
   - 处理样式隔离和主题能力。
   - 设计文档、示例、Playground 和 API 表。
   - 研究组件测试、视觉回归测试、无障碍测试。
   - 设计版本管理、发布流程和 changelog。
   - 处理 breaking change 和迁移指南。
   - 提升组件库开发者体验，如脚手架、自动生成、类型提示。
   - 将本章关联到 BemoUI。

18. 设计系统与 Design Token
   - 理解 Design Token 解决设计和代码之间的同步问题。
   - 区分 primitive token、semantic token、component token。
   - 设计 token 如何映射到 CSS 变量、Tailwind 配置或组件主题。
   - 研究多主题、暗色模式、品牌定制如何实现。
   - 处理 token 命名、分层、继承和覆盖。
   - 思考设计稿、代码、文档如何保持一致。
   - 设计 token 版本化和迁移方式。
   - 分析设计系统如何在旧项目中沉淀和落地。
   - 将本章关联到 AuraDesign skill 和 MCP。

19. CSS 架构
   - 分析 CSS 全局性、层叠、优先级带来的维护问题。
   - 对比 BEM、CSS Modules、CSS-in-JS、Atomic CSS、Tailwind。
   - 研究 CSS-in-JS 的运行时成本和 SSR 问题。
   - 分析 Tailwind 的优势、约束和团队协作成本。
   - 设计大型项目的样式分层，如 reset、token、layout、component、utility。
   - 处理响应式布局、主题切换、暗色模式。
   - 管理样式优先级和覆盖规则。
   - 总结避免样式腐化的工程实践。

20. 动画与交互性能
   - 对比 CSS Transition、CSS Animation、WAAPI、GSAP、Framer Motion。
   - 分析动画卡顿的原因，如布局计算、主线程阻塞、绘制成本。
   - 总结适合做动画的高性能属性，如 transform、opacity。
   - 理解 requestAnimationFrame 的调度时机。
   - 研究合成层如何提升动画性能。
   - 分析动画和布局计算之间的相互影响。
   - 设计复杂交互动效的代码组织方式。
   - 思考动画如何兼顾性能、可维护性和可访问性。
   - 将本章关联到 BemoUI 的动效组件。

21. Vite 原理
   - 理解 Vite 开发环境为什么启动快。
   - 分析原生 ESM 在开发环境中的作用。
   - 研究依赖预构建解决什么问题。
   - 理解 esbuild 在 Vite 中承担的职责。
   - 梳理 Vite HMR 如何定位更新边界。
   - 分析 Vite 生产构建为什么使用 Rollup。
   - 研究 Vite 插件机制和生命周期。
   - 总结优化 Vite 冷启动和 HMR 的方法。
   - 将本章关联到京东零售 HMR 调优经历。

22. Bundler 核心机制
   - 理解 Bundler 如何从入口构建依赖图。
   - 区分 loader、plugin、transform、bundle 的职责。
   - 研究 tree shaking 的前提，如 ESM 静态结构和 sideEffects。
   - 分析 code splitting 和动态 import 的实现思路。
   - 设计 chunk 拆分策略。
   - 理解 source map 如何生成和映射。
   - 对比 Webpack、Rollup、esbuild、Rspack、Turbopack 的定位。
   - 分析构建速度和产物质量之间的取舍。
   - 准备一个分包优化案例。

23. Monorepo 工程实践
   - 明确 Monorepo 解决多包协作、共享依赖、统一规范的问题。
   - 理解 pnpm workspace 的依赖组织方式。
   - 研究 Turborepo 或 Nx 的任务编排和构建缓存。
   - 管理包之间的依赖拓扑。
   - 处理公共包发布、版本策略、changelog。
   - 识别和避免幽灵依赖。
   - 设计 CI 中只构建受影响包的流程。
   - 分析 Monorepo 的复杂度和适用边界。
   - 将本章关联到 TypeMD。

24. Markdown 编辑器与解析器
   - 设计 Markdown 解析流程。
   - 区分 lexer、parser、AST、renderer 的职责。
   - 处理嵌套语法、行内语法、块级语法。
   - 研究容错解析策略。
   - 设计插件机制，如语法扩展、渲染扩展。
   - 实现实时预览和编辑同步。
   - 思考增量解析的实现思路。
   - 处理编辑区和预览区同步滚动。
   - 将本章关联到 TypeMD 的自研 Markdown 引擎。

25. 跨端框架原理
   - 理解 Taro 这类跨端框架要解决的问题。
   - 区分编译时适配和运行时适配。
   - 研究 React 或 Vue 代码如何映射到小程序组件。
   - 分析小程序端能力和 Web 端能力的差异。
   - 处理事件系统适配。
   - 处理样式单位、布局、平台选择器适配。
   - 处理路由、生命周期、状态管理适配。
   - 设计跨端项目中的平台差异隔离方案。
   - 将本章关联到京东云 Taro3 数采平台。

26. 前端网络与缓存策略
   - 梳理 HTTP 缓存层次，如浏览器缓存、代理缓存、CDN 缓存。
   - 区分强缓存和协商缓存。
   - 对比 ETag 和 Last-Modified。
   - 设计静态资源缓存和版本化策略。
   - 研究 CDN 缓存刷新、回源、灰度。
   - 理解 Service Worker 能做什么和风险是什么。
   - 设计接口缓存、请求去重、取消请求。
   - 处理失败重试、超时、降级、熔断。
   - 思考乐观更新和最终一致性。

27. 前端安全体系
   - 区分存储型 XSS、反射型 XSS、DOM 型 XSS。
   - 总结 XSS 防御方式，如转义、白名单、CSP、HttpOnly。
   - 理解 CSRF 的攻击条件。
   - 研究 SameSite Cookie、CSRF Token、Referer 校验。
   - 设计 CSP 策略。
   - 防御点击劫持。
   - 分析前端权限控制的边界，明确后端鉴权不可替代。
   - 识别依赖供应链安全风险。
   - 分析文件上传、富文本、第三方脚本的安全问题。

28. 前端可观测性
   - 定义前端可观测性包含错误、性能、行为、网络、环境信息。
   - 研究 JS 运行时错误如何捕获。
   - 研究 Promise 未处理异常如何捕获。
   - 研究资源加载错误如何捕获。
   - 采集性能指标和自定义业务指标。
   - 设计用户行为日志和关键路径埋点。
   - 使用 source map 定位线上错误。
   - 设计日志采样、聚合、上报、告警。
   - 形成从告警到定位代码问题的排障流程。

29. 前端测试策略
   - 区分单元测试、组件测试、集成测试、E2E 测试、视觉回归测试。
   - 判断不同测试类型分别适合覆盖什么风险。
   - 对比 Jest、Vitest、Testing Library、Playwright 的分工。
   - 设计合理的 mock 边界。
   - 研究动态表单如何测试。
   - 研究复杂交互如何测试。
   - 研究视觉回归如何发现 UI 变更。
   - 设计 CI 中的测试分层和执行策略。
   - 思考测试成本和收益的平衡。

30. AI Agent 与前端工程
   - 区分普通 LLM 调用、workflow、Agent。
   - 理解 Tool Calling 的设计方式。
   - 设计工具 schema，包括名称、描述、参数、返回值、错误。
   - 理解 MCP 的 server、client、tool、resource、prompt。
   - 对比浏览器 Agent 的 API 链路和 GUI 链路。
   - 研究 Agent 如何读取项目代码、截图、分析 DOM、生成报告。
   - 设计 human-in-the-loop，尤其是写文件、执行命令、提交代码前的确认。
   - 设计 Agent 日志、trace、评测指标。
   - 思考代码审查 Agent、设计审查 Agent、前端自动化测试 Agent 的落地方式。
   - 将本章关联到 JoyBrowse、AuraDesign skill 和 MCP。
