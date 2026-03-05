---
title: 'Typescript 梳理'
publishDate: '2026-02-20 08:00:00'
description: '梳理一下 Typescript 的基本内容'
tags:
  - Typescript
language: 'zh-CN'
---

Typescript已经是前端开发的必学内容了。但我TS挺菜的，很多时候都仅仅只标个类型、写个接口什么的。再写点点东西，复习巩固一下。

## 概述

> Typescript 是 Javascript 的超集

这句话大家应该是耳熟能详。也就是说，任何JS代码都能在TS环境下正常运行。我们可以初步理解为，Typescript = Javascript + 类型系统，也就是在JS的基础之上，加上了“类型”以保证代码健壮性。

JS是动态类型语言：一个变量在运行过程中其类型可以随时变化。这对于demo或者mvp可能挺方便的，但是如果需要上升到商业，它会给开发者增添相当大的负担。

TypeScript 的静态类型检查机制正是为了解决这个问题。它允许（并鼓励）我们在代码编写阶段就为变量、函数参数和返回值等明确指定类型。这样，开发阶段就能借由编辑器/编译器发现错误并修正，实现了“类型即文档”的效果。

但是浏览器并不直接支持TS——这也就是TS的另外一个设计理念：编译时检查，运行时无忧。他会在开发阶段/编译阶段检查类型，而在进入到运行环境之前会“擦除”所有的类型，形成纯粹的原生JS代码，这也就不需要运行环境去适应它或者担心多出的类型注解导致的潜在性能问题。

现在的TS无疑是中/大项目的首选。

---

在从 JavaScript 过渡到 TypeScript 的过程中，我们首先会遇到的核心概念就是其强大的类型系统。它为动态、灵活的 JavaScript 赋予了静态的结构与可预测性，从而在项目变得复杂时，为我们提供了一道坚实的防线。

## 基础类型

在介绍基础类型之前，我们首先看一下Typescript是如何为变量赋予类型信息的：

语法非常简单：

```ts
let identifier: type;
```

这也就意味着，indentifier在其生命周期内，只能是type类型，否则编码阶段时会报错。

---

现在，让我们来看看构成 TypeScript 类型系统的三个最基本的原始（Primitive）类型。

1. **string**

string 类型用于表示文本数据。所有使用单引号 (')、双引号 (") 或反引号 (`) 包裹起来的字符序列，都属于 string 类型。

它适用于各种场景，无论是变量、函数参数还是返回值，只要涉及文本处理，string 都是我们的首选。

```ts
let blogTitle: string = "TypeScript 的基石";
let authorName: string = 'Raycast';

// 使用模板字符串
let greeting: string = `Hello, ${authorName}! Welcome to the article: "${blogTitle}".`;
```

2. **number**

与 JavaScript 一样，TypeScript 中所有数字，无论是整数还是浮点数，都统一使用 number 类型来表示。它涵盖了我们日常开发中会遇到的所有数值计算场景。

```ts
let version: number = 5.0;
let articleCount: number = 21;
let pi: number = 3.14159;
```
当我们为一个变量注解了 number 类型后，如果尝试将一个字符串（即使内容是数字）赋值给它，TypeScript 同样会阻止这一行为。

3. **boolean**

boolean 类型是三个基本类型中最简单的一个，它只有两个可能的值：true 和 false。

```ts
let isPublished: boolean = true;
let hasComments: boolean = false;

if (isPublished) {
    console.log("This article is live.");
} else {
    console.log("This is a draft.");
}
```

## 数组与元组

对于大量同一类型的变量，我们期望有一个工具能够统一进行类型注解。在Typescript中，我们可以使用数组完成这一任务，并且我们有一个新的且更为严格的集合类型——元组。

在 TypeScript 中，数组是一个**有序**的元素列表，其核心特征是**数组内的所有元素都应具有相同的类型**。如果我们尝试向一个数字数组中添加字符串，TypeScript 编译器会立即发出警告。我们有两种方法声明一个数组类型：

1. 类型 + 方括号 []
2. 泛型数组类型 `Array<Type>`

```ts
// 类型 + 方括号 []
// 声明一个字符串数组
let tags: string[];
tags = ["typescript", "frontend", "development"];

// 泛型数组类型 `Array<Type>`
let postIds: Array<number>;
postIds = [201, 202, 205];
```
虽然两种方式等效，但在代码可读性上，Type[] 通常更简洁。而当处理更复杂的嵌套数组时（例如 `Array<Array<string>>` ），泛型语法有时能提供更好的清晰度。

---

元组可以被看作是一种特殊的数组，它具有**固定的长度和在每个位置上确定的类型**。

```ts
// 定义一个元组类型
// 它表示一个有两个元素的集合
// 第一个元素是 string 类型，第二个是 number 类型
let bookInfo: [string, number];

// 正确赋值
bookInfo = ["The Pragmatic Programmer", 1999];

// 错误：顺序不匹配
// bookInfo = [1999, "The Pragmatic Programmer"]; // 错误：不能将类型“number”分配给类型“string”。

// 错误：长度不匹配
// bookInfo = ["Designing Data-Intensive Applications"]; // 错误：源具有 1 个元素，但目标需要 2 个。
```

元组可以看作是一种有固定长度且允许异构的数组。

## any 与 unknown

  在一些情况下（第三方库、API响应、用户输入等等），我们在开发阶段可能无法预知一个变量的类型。为了应对这些动态和不确定的场景，TypeScript 提供了两个特殊的类型：any 和 unknown。它们都允许我们绕过常规的类型检查，但其背后的设计哲学和安全级别却截然不同。

  any 类型是 TypeScript 中的一个“逃生舱”。当我们为一个变量标注为 any 类型时，实际上是在告诉 TypeScript 编译器：“请不要对这个变量进行任何类型检查“。它让这个变量的行为退回了纯粹的 Javascript，在充满类型注解的代码中，这无异于一个病毒。所以尽量少用它，它只是最后一手，否则会写出”anyscript“。

```ts
let flexible: any = 4;

// 我们可以随意改变它的类型
flexible = "Now I'm a string";
flexible = true;

// 我们可以调用任何方法，即使它不存在
// 编译器不会报错，但会在运行时抛出错误
flexible.thisMethodDoesNotExist(); 

// 我们可以访问任何属性
console.log(flexible.someProperty);
```

---

TypeScript 3.0 引入了一个更优秀的解决方案：unknown 类型。

unknown 和 any 一样，可以接收任何类型的值。但它们之间有一个根本性的区别：

> unknown 类型的变量，在没有被明确地检查和断言其类型之前，你不能对它进行任何操作。

```ts
let mystery: unknown = "A secret message";

// 错误：对象类型为 "unknown"。
// 我们不能直接调用一个 string 方法
// mystery.toUpperCase(); 

// 错误：对象类型为 "unknown"。
// 我们不能把它赋值给一个已知类型的变量
// let message: string = mystery; 
```

要使用 unknown 类型的变量，我们必须先执行类型收窄（Type Narrowing），让 TypeScript 确信在某个代码块中，这个变量是某个具体的类型。

```ts
let mystery: unknown = "Another secret message";

// 1. 使用 typeof 进行类型收窄
if (typeof mystery === 'string') {
  // 在这个 if 代码块内，TypeScript 知道 mystery 是一个 string
  console.log(mystery.toUpperCase()); // 正确！
}

let maybeANumber: unknown = 100;

// 2. 使用类型断言（Type Assertion）
let score = maybeANumber as number;
console.log(score.toFixed(2)); // 正确！
```

unknown 是你的首选。它强制你在使用变量前进行必要的类型检查，遵循了 TypeScript 的核心理念。

## 函数

接下来，我们将一起探讨 TypeScript 是如何通过类型注解、可选参数和默认参数，来优化函数定义的。

在 TypeScript 中，最直接的增强是为函数的**参数和返回值**添加明确的类型注解。

它的语法非常直观：

- 在参数名后使用冒号 (:) 来指定该参数的类型。
- 在函数参数列表的括号后使用冒号 (:) 来指定函数的返回值类型。

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

如果我们在调用 add 函数时传入了非数字类型的参数，TypeScript 编译器会在编译阶段就立刻抛出错误.

---

在某些场景下，我们也需要函数具备一定的灵活性。例如，一个函数的某些参数并非每次调用都需要传递。针对这种情况，TypeScript 提供了**可选参数**和**默认参数**两种实用的机制。

1. 可选参数

当我们希望函数的某个参数可以被“省略”时，可以使用可选参数。语法是在参数名后、冒号前添加一个问号 (?)。

```ts
function greet(name: string, salutation?: string): string {
  if (salutation) {
    return `${salutation}, ${name}!`;
  } else {
    return `Hello, ${name}!`;
  }
}

// 两种有效的调用方式
console.log(greet("Alice")); // 输出: Hello, Alice!
console.log(greet("Bob", "Good morning")); // 输出: Good morning, Bob!
```

一个重要的规则是：**可选参数必须位于必选参数之后**。这是为了让 TypeScript 能够正确地将传入的参数与函数定义中的参数对应起来。

2. 默认参数

默认参数与可选参数解决的是类似的问题，但实现方式略有不同。它允许我们为参数提供一个默认值，当调用者没有传递该参数时，函数将自动使用这个预设的值。

语法非常简洁，直接在参数声明后使用等号 (=) 即可。

```ts
function greetWithDefault(name: string, salutation: string = "Hello"): string {
  return `${salutation}, ${name}!`;
}

// 两种调用方式及其结果
console.log(greetWithDefault("Alice")); // 输出: Hello, Alice!
console.log(greetWithDefault("Bob", "Good morning")); // 输出: Good morning, Bob!
```

当一个参数被赋予了默认值，它实际上也变成了“可选”的。与可选参数不同的是，带有默认值的参数不强制要求必须放在参数列表的末尾。然而，为了保持代码的可读性和一致性，通常我们还是建议将它们放在必选参数之后。

## 剩余参数与 this

在我们掌握了 TypeScript 函数的类型基础后，是时候探索两个更高级、也更实用的概念了：剩余参数 (Rest Parameters) 和 this 关键字的类型控制。这两个特性分别解决了“如何处理不定数量的参数”和“如何确保 this 的指向安全”这两个在 JavaScript 开发中常见的痛点。

在开发中，我们有时需要创建一个能接收任意数量参数的函数。为了解决这个问题，ES6 引入了剩余参数语法，TypeScript 则在此基础上融入了完整的类型支持。

剩余参数的语法是在参数名前加上 ...，它能将一个不定数量的参数“收集”到一个数组中。

让我们来看一个经典的求和函数，它可以计算所有传入参数的总和：

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

// 以下调用都是有效的
console.log(sum(1, 2, 3));      // 输出: 6
console.log(sum(10, 20));       // 输出: 30
console.log(sum());             // 输出: 0
```

通过 `...numbers: number[]` ，我们清晰地定义了：

numbers 是一个包含了所有“剩余”参数的数组。这个数组中的每一个元素都必须是 number 类型。这相比 arguments 对象是巨大的进步，因为它不仅是类型安全的，还允许我们直接在 numbers 上使用所有数组方法，代码也因此变得更加直观和健壮。

在使用剩余参数时，需要记住两个关键规则：

- 一个函数只能有一个剩余参数。
- 剩余参数必须是函数参数列表中的最后一个参数。

---

TypeScript 提供了一套强大的机制来“驯服” this，那就是在函数参数列表中显式声明 this 的类型。

这看起来可能有些奇怪，因为 this 并不是一个常规的参数。在 TypeScript 中，this: Type 是一种特殊的语法，它位于参数列表的最前面，用来告知编译器该函数内部的 this 应该是什么类型。

重要的是，这个 this 参数声明只存在于 TypeScript 的类型检查中，它会被完全从编译后的 JavaScript 代码中移除。

让我们通过一个场景来理解它的威力。假设我们有一个包含计数器的对象：

```ts
interface Counter {
  count: number;
  increment: () => void;
}

const counter: Counter = {
  count: 0,
  increment: function(this: Counter) { // 显式声明 this 的类型
    this.count++;
    console.log(this.count);
  }
};

// 1. 正确调用
counter.increment(); // 输出: 1

// 2. 错误调用的场景
const standaloneIncrement = counter.increment;

// standaloneIncrement(); 
// 编译时错误: The 'this' context of type 'void' is not assignable 
// to method's 'this' of type 'Counter'.
```

在这个例子中：

- 我们在 increment 方法的参数列表最前面添加了 this: Counter。这等于我们向 TypeScript 承诺：“当 increment 被调用时，this 的上下文必须是一个符合 Counter 接口的对象。”
- 当直接通过 counter.increment() 调用时，this 指向 counter 对象，类型匹配，一切正常。
- 但是，当我们将 increment 方法赋值给一个新变量 standaloneIncrement 并尝试调用它时，此时的 this 上下文在非严格模式下是 window，在严格模式下是 undefined。这两种情况都不符合 Counter 类型。
- 得益于 this 类型声明，TypeScript 编译器能够在我们犯错之前就捕捉到这个潜在的问题，从而阻止了一次运行时错误。
除了显式声明 this 类型，箭头函数也是处理 this 上下文问题的常用方法。箭头函数不会创建自己的 this 绑定，而是会捕获其所在上下文的 this 值。在许多场景下，使用箭头函数可以让我们从根本上避免 this 指向不明确的问题。

## 函数重载

在我们已经熟悉了 TypeScript 函数的类型定义、可选参数以及 this 的处理之后，我们将探索一个更能体现其类型设计精妙之处的特性——函数重载（Function Overloading）。这意味着，同一个函数可以**根据传入参数的类型、数量或组合，执行不同的逻辑并返回不同类型的值**。

让我们从一个具体场景开始。假设我们需要编写一个函数 parseDate，它的功能是接收一个日期信息并返回一个 Date 对象。我们希望这个函数足够智能，能够处理两种不同的输入格式：

- 一个时间戳（number 类型）。
- 一个表示日期的字符串（string 类型，如 "2025-11-03"）。

如果不使用函数重载，我们可能会写出这样的代码：

```ts
function parseDate(input: number | string): Date {
  if (typeof input === 'number') {
    return new Date(input);
  } else {
    return new Date(input);
  }
}
```

这段代码在功能上没有问题，但它的函数签名 (input: number | string): Date 并没有完全体现出其行为的全部细节。调用者只知道可以传入数字或字符串，但无法从签名上直接看出这两种输入对应的是哪种日期格式。当函数逻辑变得更复杂时，这种模糊性会降低代码的可读性和可维护性。

函数重载正是为了解决这类问题而生，它让我们可以更精确地描述函数的多种形态。

在 TypeScript 中，实现函数重载分为两个部分：

- **重载签名**：我们首先定义一系列的函数声明（只有函数名、参数和返回类型，没有函数体）。这些声明就是函数的“重载签名”，它们向外界清晰地展示了所有合法的调用方式。

- **实现签名**：在所有重载签名之后，我们提供一个包含实际函数体的最终实现。这个实现的函数签名必须足够通用，能够兼容上面所有的重载签名。

让我们用函数重载来重写 parseDate 函数：

```ts
// 1. 重载签名
function parseDate(timestamp: number): Date;
function parseDate(dateString: string): Date;

// 2. 实现签名
function parseDate(input: number | string): Date {
  if (typeof input === 'number') {
    // 这里的 input 被 TypeScript 推断为 number
    return new Date(input);
  } else {
    // 这里的 input 被 TypeScript 推断为 string
    return new Date(input);
  }
}

// 调用
const dateFromTimestamp = parseDate(1762156800000); // 对应第一个签名
const dateFromString = parseDate("2025-11-03");    // 对应第二个签名

// const invalidCall = parseDate(true); // 编译时错误!
```

在使用函数重载时，有几个重要的规则需要遵守：

- 实现签名对外不可见：实现签名的作用是提供一个统一的函数体，它本身并不对外部调用者直接可见。当我们调用函数时，TypeScript 只会检查是否匹配某一个重载签名。

- 实现签名需兼容所有重载：实现签名的参数类型和返回类型必须能够兼容所有的重载签名。通常，我们会使用联合类型（Union Types）或 any 来做到这一点。例如，在上面的例子中，实现签名的参数 input 是 number | string，它包含了两个重载签名的所有可能参数类型。

- 检查顺序：TypeScript 在匹配重载时会从上到下逐一检查。因此，我们应该将最精确、最具体的签名放在前面，而将较通用的签名放在后面，以避免意外的匹配。

## 枚举 enum

在软件开发中，我们经常需要处理一组密切相关的常量，例如订单的状态、用户的角色、或者一周中的某一天。在没有特定语言支持的情况下，我们可能会使用一组独立的 const 变量或者一个普通对象来管理它们。虽然可行，但这些方式都**缺少一种内在的关联性**，无法从类型层面保证值的合法性。

为了解决这个问题，TypeScript 提供了一个强大而直观的特性——枚举 (Enums)。枚举允许我们定义一个命名的常量集合，将一组“魔术数字”或“魔术字符串”转化为清晰、易读且类型安全的值。

---

若我们正在处理一个异步任务，它有四种可能的状态：Pending（待处理）、Processing（处理中）、Success（成功）、Failed（失败）。在不使用枚举的情况下，我们可能会这样做：

```ts
// 使用数字
const PENDING = 0;
const PROCESSING = 1;
const SUCCESS = 2;
const FAILED = 3;

function handleStatus(status: number): void {
  if (status === SUCCESS) {
    console.log("Task completed successfully.");
  }
  // ... 其他逻辑
}

handleStatus(2); // 调用时不够直观
handleStatus(99); // 危险！可以传入一个无效的状态值
```

可读性差，且类型不安全。

枚举有两种类型：

1. 数字类型
2. 字符串类型

我们首先介绍数字类型的枚举。默认情况下，它会将名称映射到从 0 开始自动递增的数字。

让我们用数字枚举来重构上面的例子：

```ts
enum TaskStatus {
  Pending,    // 0
  Processing, // 1
  Success,    // 2
  Failed,     // 3
}

function handleStatus(status: TaskStatus): void {
  if (status === TaskStatus.Success) {
    console.log("Task completed successfully.");
  }
}

// 调用方式变得清晰且安全
handleStatus(TaskStatus.Success);

// handleStatus(99); // 编译时错误! 
// Argument of type '99' is not assignable to parameter of type 'TaskStatus'.
```

数字枚举有两个特性：

- 自动递增：如上所示，枚举成员会从 0 开始自动赋值。我们也可以手动指定一个初始值，后续成员会从该值开始递增。（如指定第一个为404，则后续依次为405、406···）
- 反向映射：这是数字枚举一个独特的特性。TypeScript 会在编译时创建一个双向的查找对象。这意味着我们不仅可以通过名称获取值 (TaskStatus.Success 得到 2)，还可以通过值获取名称 (TaskStatus[2] 得到 "Success")。

---

除了数字，我们也可以使用字符串作为枚举成员的值。这在很多现代 Web 开发场景中越来越受欢迎。

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

与数字枚举相比，字符串枚举有几个关键区别：

- 无自动赋值：字符串枚举的每个成员都必须显式地用一个字符串字面量进行初始化。
- 无反向映射：Direction.Up 的值是 "UP"，但 Direction["UP"] 这样的反向查找是不存在的。
- 更好的调试体验：字符串枚举最大的优势在于其出色的可读性。当你 console.log 一个字符串枚举变量时，你看到的是一个有意义的字符串（如 "SUCCESS"），而不是一个需要心智转换的数字（如 2）。这在调试日志、API 响应或状态管理中尤其有用。

一个简单的经验法则是：除非你有充分的理由选择数字枚举（例如性能是首要瓶颈），否则优先使用字符串枚举。 字符串枚举带来的可读性和可维护性收益，在绝大多数项目中都远超其微小的性能开销。

## 重命名魔法：类型别名 (Type Aliases)

随着我们深入使用 TypeScript，类型定义会变得越来越复杂。我们可能会反复使用联合类型（如 string | number），或者定义一些具有特定结构的复杂对象。如果每次使用这些类型时都重新编写一遍，代码不仅会变得冗长，而且难以维护。

为了解决这个问题，TypeScript 提供了一个简洁而强大的工具：类型别名 (Type Aliases)。它允许我们使用 type 关键字，**为任何类型创建一个新的、可复用的名称**。

```ts
type NewName = SomeType;
```

这个 SomeType 可以是任何有效的 TypeScript 类型，从简单的原始类型到复杂的对象、联合或元组类型。

类型别名的应用场景有以下几种：

1. 简化联合类型

```ts
type ID = string | number;

function printId(id: ID) {
  console.log(`ID: ${id}`);
}

function getUser(id: ID): User {
  // ...
}
```

通过创建一个名为 ID 的别名，我们的代码变得更加清晰、简洁，并且意图明确。如果未来需要支持另一种 ID 类型（比如 bigint），我们只需要修改 ID 这一个地方即可。

2. 定义复杂的对象结构

当我们需要描述一个对象的“形状”时，类型别名非常有用。它可以清晰地定义对象应该包含哪些属性以及这些属性的类型。

```ts
type Point = {
  x: number;
  y: number;
};

function calculateDistance(p1: Point, p2: Point): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

const origin: Point = { x: 0, y: 0 };
```

在这里，Point 成为了一个可复用的类型，用于描述任何具有 x 和 y 坐标的对象。这比在每个函数签名中都写一遍 { x: number; y: number; } 要优雅得多。

3. 结合泛型创造更灵活的类型

类型别名还可以与泛型结合，创造出高度灵活和可复用的类型结构。

例如，我们可以定义一个“包裹”类型，它可以包含任何类型的值：

```ts
type Container<T> = {
  value: T;
};

const numberContainer: Container<number> = { value: 42 };
const stringContainer: Container<string> = { value: "Hello, TypeScript" };
```

一个广为接受的实践法则是：

- 优先使用 interface 定义对象和类的结构：当你需要定义一个可以被 class 实现 (implements) 或被其他 interface 扩展 (extends) 的对象形状时，interface 是更自然的选择。它的声明合并特性也使其在为第三方库扩展类型时非常有用。
- 在需要联合类型、元组或更复杂的组合类型时，使用 type：type 的能力更为通用，任何 interface 无法表达的类型组合，都可以通过 type 来创建别名。

## 对象类型

对象是 JavaScript 的核心，我们用它来组织和传递数据，构建应用的几乎所有部分。然而，在原生 JavaScript 中，对象的结构是动态且松散的。我们可以在任何时候添加、删除或修改其属性，这种灵活性在带来便利的同时，也埋下了无数潜在的运行时错误。

TypeScript 通过其强大的类型系统，允许我们精确地定义对象的“形状”（Shape），确保每个对象都拥有我们所期望的属性和类型。

---

在 TypeScript 中，为对象定义结构的最直接方式是使用类型注解。我们通过一种类似于对象字面量的语法，来描述对象应该包含哪些属性，以及每个属性的类型。

假设我们需要定义一个表示用户信息的对象：

```ts
let user: {
  id: number;
  username: string;
  email: string;
};

// 正确的赋值
user = {
  id: 1,
  username: "alice",
  email: "alice@example.com",
};

// 错误的赋值 (会引发编译时错误)
// user = { id: 2, username: "bob" }; // 错误: Property 'email' is missing.
// user = { id: 3, username: "charlie", email: "charlie@example.com", isAdmin: true }; // 错误: Object literal may only specify known properties.
```

这里的类型注解非常严格：

- 任何赋值给 user 变量的对象，必须拥有 id、username 和 email 这三个属性。
- 这些属性的类型必须分别是 number、string 和 string。
- 不允许缺少任何一个属性，也不允许添加未在注解中声明的额外属性

为了提高代码的可读性和复用性，我们通常不会直接在变量旁进行内联注解，而是使用上一篇文章中提到的 类型别名 (Type Alias) 或 接口 (Interface) 来定义对象形状

```ts
type User = {
  id: number;
  username: string;
  email: string;
};
// or
interface User = {
  id: number;
  username: string;
  email: string;
};
```

---

严格的结构是好事，但现实世界的数据并非总是如此规整。有时，一个对象的某些属性并不是必需的。例如，一个用户可能有昵称 nickname，也可能没有。

为了处理这种情况，TypeScript 提供了**可选属性**，语法是在属性名和冒号之间添加一个问号 ?。

```ts
type UserProfile = {
  userId: number;
  nickname?: string; // nickname 是可选的
  bio?: string;      // bio 也是可选的
};

const profile1: UserProfile = { userId: 101, nickname: "The Coder" }; // 合法
const profile2: UserProfile = { userId: 102, bio: "Loves TypeScript." }; // 合法
const profile3: UserProfile = { userId: 103 }; // 合法

// console.log(profile3.nickname.toUpperCase()); // 编译时错误!
// 'profile3.nickname' is possibly 'undefined'.
```

当一个属性被标记为可选时，TypeScript 会推断出它的类型是 T | undefined（例如，nickname 的类型是 string | undefined）。这意味着，当我们在访问这个属性之前，必须先检查它是否存在，否则编译器会发出警告，防止我们对一个 undefined 的值执行操作。

这种机制强制我们编写更安全、更严谨的代码来处理可能缺失的数据。

---

另一类常见需求是，对象的某些属性在被创建后就不应该再被修改。例如，用户的 id 或订单的创建时间 createdAt。

TypeScript 提供了 **readonly 关键字**来实现这一目标。它可以放在属性名的前面，用来将该属性标记为只读。

```ts
type Product = {
  readonly id: string; // id 是只读的
  name: string;
  price: number;
};

const book: Product = {
  id: "abc-123",
  name: "Learning TypeScript",
  price: 29.99,
};

// 尝试修改只读属性
// book.id = "def-456"; // 编译时错误!
// Cannot assign to 'id' because it is a read-only property.

// 修改可写属性是允许的
book.name = "Mastering TypeScript"; // 合法
```

一旦一个 readonly 属性被初始化赋值，任何后续的修改尝试都会被 TypeScript 编译器拦截。

需要特别强调的是，**readonly 是一个编译时的特性。它只在 TypeScript 的静态类型检查阶段生效，并不会在编译生成的 JavaScript 代码中添加任何运行时的保护机制**（与 Object.freeze() 不同）。

## 接口 interface

接口的核心任务是**定义一个对象应该具有的形状**。它描述了对象必须包含哪些属性，以及这些属性的类型。

其基本语法非常直观：

```ts
interface User {
  readonly id: number;
  username: string;
  email: string;
  avatarUrl?: string; // 可选属性
}

function displayUser(user: User): void {
  console.log(`Username: ${user.username}`);
  console.log(`Email: ${user.email}`);
}

const myUser: User = {
  id: 1,
  username: "raycast",
  email: "hello@raycast.com",
};

displayUser(myUser); // 合法

// const invalidUser = { id: 2, username: "ai" }; 
// 编译时错误: Property 'email' is missing in type '{ id: number; username: string; }' 
// but required in type 'User'
```

其实到这里和type没什么两样。

---

接口最强大的特性之一是其可扩展性。一个接口可以通过 extends 关键字来“继承”另一个接口的成员，从而构建出更复杂的类型结构。这在面向对象编程中是非常常见的模式。

假设我们要在 User 的基础上定义一个 Admin 用户，它除了拥有普通用户的所有属性外，还有一个额外的 level 属性。

```ts
interface Admin extends User {
  level: 'super' | 'editor' | 'viewer';
}

const myAdmin: Admin = {
  id: 2,
  username: "admin_user",
  email: "admin@raycast.com",
  level: "super",
};

displayUser(myAdmin); // 合法, 因为 Admin 是 User 的一种
```

通过 extends User，Admin 接口自动继承了 User 的所有属性（id, username, email, avatarUrl?），并在此基础上添加了自己的 level 属性。这种方式极大地促进了代码的复用和层次化设计。

另一方面，扩展接口建立了一种明确的“is-a”（是一个）关系。如 Employee “is a” Person。这种关系使得类型系统具有了强大的兼容性：任何期望接收父接口类型（Person）的地方，都可以安全地传入一个子接口类型（Employee）的实例。

- interface 是定义对象和类结构蓝图的首选工具，它通过 extends 关键字支持清晰的继承关系。
- 其独特的“声明合并”特性，使其在扩展已有类型定义时无可替代。
- 虽然 type 在某些方面更为灵活，但在定义核心业务对象的“形状”时，interface 提供了更符合面向对象思想的语义和实践。
- 一个接口可以继承多个接口，如 `interface Button extends Clickable, Draggable {···}`

## 联合类型

TypeScript 为此提供了一个优雅而强大的解决方案——联合类型 (Union Types)。它允许我们声明一个值可以是多种类型中的任意一种，从而在保持灵活性的同时，享受静态类型检查带来的安全性。

联合类型的概念非常直观，它使用 | (管道符) 作为分隔符，表示一个值可以是列出的类型之一。

其基本语法如下：

```ts
let myVar: string | number;

myVar = "Hello"; // 合法
myVar = 42;      // 合法

// myVar = true; // 编译时错误! Type 'boolean' is not assignable to type 'string | number'.
```

通过 string | number，我们向 TypeScript 声明：myVar 这个变量的“合法身份”既可以是 string，也可以是 number。任何其他类型的值都会被编译器拒绝。

---

联合类型带来了灵活性，但随之也产生了一个重要的问题：当一个值的类型可能是 string 或 number 时，我们能对它做什么操作？

TypeScript 在这里采取了非常严谨和安全的策略：你只能访问联合类型中所有成员都共有的属性或方法。例如：

```ts
function processValue(value: string | number) {
  // console.log(value.toUpperCase()); 
  // 编译时错误: Property 'toUpperCase' does not exist on type 'string | number'.
  // Property 'toUpperCase' does not exist on type 'number'.

  // toString() 是 string 和 number 都共有的方法，所以是合法的。
  console.log(value.toString()); 
}
```

---

为了充分利用联合类型的能力，我们需要一种方法来确定在代码的某个特定分支中，变量到底是哪个具体的类型。这个过程，在 TypeScript 中被称为类型收窄 (Type Narrowing)。我们有以下这几个方法实现类型收窄。

1. typeof 类型守卫

当处理原始类型（如 string, number, boolean）的联合时，typeof 是最直接有效的工具。

```ts
function formatId(id: string | number): string {
  if (typeof id === "string") {
    // 在这个代码块内，TypeScript 确信 id 的类型是 string
    return id.toUpperCase();
  } else {
    // 在这个代码块内，TypeScript 确信 id 的类型是 number
    return `ID-${id.toFixed(2)}`;
  }
}
```

2. in 操作符守卫

当联合类型中包含对象时，我们可以使用 in 操作符来检查某个属性是否存在于对象上，从而区分不同的对象类型。

```ts
interface Admin {
  name: string;
  privileges: string[];
}

interface Customer {
  name: string;
  credit: number;
}

type User = Admin | Customer;

function displayUserInfo(user: User) {
  console.log(`Name: ${user.name}`);
  if ("privileges" in user) {
    // 在这里，user 的类型被收窄为 Admin
    console.log(`Privileges: ${user.privileges.join(", ")}`);
  }
  if ("credit" in user) {
    // 在这里，user 的类型被收窄为 Customer
    console.log(`Credit: ${user.credit}`);
  }
}
```

3. 字面量类型与可辨识联合 (Discriminated Unions)

这是处理联合类型最高级、也是最推荐的模式，尤其适用于状态管理等场景。可辨识联合要求联合中的每个对象类型都拥有一个共同的、值为字面量类型的属性（即“可辨识”或“标签”属性）。

我们通常使用 switch 语句来检查这个“标签”属性，TypeScript 会在每个 case 分支中完美地收窄类型。

```ts
interface Circle {
  kind: "circle"; // 辨识属性
  radius: number;
}

interface Square {
  kind: "square"; // 辨识属性
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      // shape 的类型被收窄为 Circle
      return Math.PI * shape.radius ** 2;
    case "square":
      // shape 的类型被收窄为 Square
      return shape.sideLength ** 2;
    default:
      // 利用 never 类型进行穷尽性检查，确保所有 case 都被处理
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```

## 交叉类型

在 TypeScript 的类型系统中，联合类型 (|) 给了我们“或”的选择，允许一个值成为多种类型之一。而与之相对的，则是提供了“与”能力的交叉类型 (Intersection Types)。它允许我们将多个类型合并（或“交叉”）成一个**单一的、拥有所有类型成员的新类型**。

交叉类型是实现“组合优于继承”设计原则的强大工具，特别适合用于创建复杂的、由多个部分组合而成的类型。

交叉类型使用 & 运算符，将多个已存在的类型组合在一起。最终生成的类型将包含所有原始类型的所有属性。

其基本语法如下：

```ts
type TypeA = { a: string };
type TypeB = { b: number };

type CombinedType = TypeA & TypeB;

// CombinedType 现在等价于:
// {
//   a: string;
//   b: number;
// }
```

> 一个有趣且重要的知识点是：当原始类型（如 string, number）进行交叉时会发生什么？
>
> `type ImpossibleType = string & number;`
> 
> ImpossibleType 的类型是 never。这是因为在类型系统中，一个值不可能同时是 string 且是 number。never 类型正是用来表示这种永远不会发生的、不合逻辑的类型状态。这个特性在进行类型推导和确保类型安全时非常有用。

### 实现混入 (Mixin) 模式

交叉类型最强大的应用场景之一是实现混入 (Mixin) 模式。Mixin 是一种在不使用类继承的情况下，为对象添加可复用功能的设计模式。

假设我们有两个函数，它们各自为对象添加一种能力：一个添加时间戳，另一个添加日志功能。

```ts
type HasTimestamp = {
  timestamp: number;
};

type HasLogger = {
  log(message: string): void;
};

// 这个函数为一个对象添加时间戳能力
function withTimestamp<T>(obj: T): T & HasTimestamp {
  return { ...obj, timestamp: Date.now() };
}

// 这个函数为一个对象添加日志能力
function withLogger<T>(obj: T): T & HasLogger {
  return {
    ...obj,
    log: (message: string) => console.log(`[LOG] ${message}`),
  };
}

// 基础对象
const basicObject = {
  name: "My Component",
};

// 使用函数组合和交叉类型来构建一个功能丰富的对象
const composedObject = withLogger(withTimestamp(basicObject));

// 现在 composedObject 的类型是 { name: string } & HasTimestamp & HasLogger
console.log(composedObject.name);
console.log(composedObject.timestamp);
composedObject.log("Component initialized.");
```

在这个例子中，composedObject 的最终类型是 basicObject 的原始类型与 HasTimestamp 和 HasLogger 的交叉。TypeScript 能够完美地理解这个组合后的新类型，并为我们提供完整的类型检查和代码提示。这是一种极其灵活且类型安全的组合方式。

交叉类型是 TypeScript 中实现“组合”思想的核心工具。它使我们能够以一种声明式的方式，将多个独立的类型合并成一个功能更强大的复合类型。

- 它使用 & 运算符，将所有成员类型的属性聚合在一起。
- 它与 extends 的继承关系不同，更侧重于功能的组合与聚合。
- 在实现混入 (Mixin) 等高级设计模式时，交叉类型是不可或缺的强大工具。

## 类型守卫

我们已经了解，联合类型 (|) 为 TypeScript 带来了强大的灵活性，允许一个变量拥有多种可能性。但这种灵活性也带来了一个挑战：当我们持有一个联合类型的值时，如何安全地访问其特定类型的属性或方法？

直接访问是行不通的，因为 TypeScript 编译器无法保证在运行时变量的具体类型，为了防止错误，它只会允许我们访问所有联合成员的共有属性。要突破这一限制，我们就需要一种机制来向编译器“证明”在某个代码块中，变量是某个具体的类型。这个机制，就是**类型守卫 (Type Guards)**。

类型守卫本质上是一个返回布尔值的运行时检查，但它的特殊之处在于，TypeScript 能够理解这些检查，并在它们返回 true 的代码块内，智能地**收窄 (narrow)** 变量的类型。让我们来深入探索几种最核心的类型守卫。

1. typeof

当处理的联合类型包含 string、number、boolean、symbol、bigint、undefined 或 function 等**原始类型**时，typeof 操作符是最直接、最有效的类型守卫。例如：

```ts
function processInput(input: string | number | string[]) {
  if (typeof input === "string") {
    // 在此代码块内，TypeScript 确信 input 是 string
    console.log(input.toUpperCase());
  } else if (typeof input === "number") {
    // 在此代码块内，TypeScript 确信 input 是 number
    console.log(input.toFixed(2));
  } else {
    // 在此代码块内，TypeScript 推断 input 是 string[]
    console.log(`Array length: ${input.length}`);
  }
}
```
值得注意的是，typeof null 在 JavaScript 中返回 "object"，这是一个历史遗留问题。因此，如果你的联合类型中包含 null，需要用 input === null 这样的相等性检查来单独处理。

2. instanceof

typeof 对所有非函数对象的返回值都是 "object"，这使得它无法区分两个不同的类实例。当我们需要检查一个对象是否由某个特定的类创建时，instanceof 守卫便派上了用场。它通过检查对象的原型链来判断其“血统”。

让我们设想一个媒体播放器应用，它可以处理 Song 和 Album 两种对象：

```ts
class Song {
  constructor(public title: string, public duration: number) {}
  play() {
    console.log(`Playing song: ${this.title}`);
  }
}

class Album {
  constructor(public name: string, public songs: Song[]) {}
  listSongs() {
    console.log(`Songs in album ${this.name}:`);
    this.songs.forEach(song => console.log(`- ${song.title}`));
  }
}

function playMedia(media: Song | Album) {
  if (media instanceof Song) {
    // 在此代码块内，TypeScript 知道 media 是 Song 的实例
    media.play();
  } else if (media instanceof Album) {
    // 在此代码块内，TypeScript 知道 media 是 Album 的实例
    media.listSongs();
  }
}
```

3. 自定义类型

typeof 和 instanceof 功能强大，但它们无法处理基于接口（interface）或纯对象字面量定义的类型。当我们需要根据对象的结构特征（比如是否存在某个属性）来区分类型时，就需要创建自定义类型守卫。

自定义类型守卫本质上是一个函数，其特殊之处在于它的返回值类型是一个类型谓词 (Type Predicate)，形如 parameterName is Type。

这个特殊的返回类型向 TypeScript 传达了一个明确的信号：“如果这个函数返回 true，那么你可以确信传入的参数就是 Type 类型。”

让我们来看一个经典的动物例子：

```ts
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

// 这就是一个自定义类型守卫函数
function isFish(pet: Fish | Bird): pet is Fish {
  // 我们通过检查 pet 是否有 swim 方法来判断它是不是 Fish
  // (pet as Fish).swim 是一种类型断言，确保 swim 属性可被访问
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    // 在此代码块内，TypeScript 因为 isFish 返回 true，
    // 所以确信 pet 的类型是 Fish
    pet.swim();
  } else {
    // 否则，TypeScript 推断 pet 的类型是 Bird
    pet.fly();
  }
}
```

通过 pet is Fish 这个返回类型，isFish 函数不仅仅返回了一个布尔值，它还直接参与到了 TypeScript 的类型流分析中，为我们编写的 if 语句赋予了类型收窄的能力

4. 其它

除了上述三种核心守卫，还有一些常用的模式也利用了类型收窄的原理：

- in 操作符：通过检查属性是否存在来区分类型，例如 if ("swim" in pet)。
- 相等性检查：当与字面量类型结合时，===, ==, !==, != 也能作为类型守卫。这正是可辨识联合模式的核心，通过检查一个共享的“标签”属性（如 shape.kind === "circle"）来实现最安全、最清晰的类型收窄。

## 泛型

在我们的编程旅程中，一个永恒的追求是编写可复用的代码。我们希望创建一个函数或一个类，它能够处理多种不同的数据类型，而不仅仅是一种。然而，在追求复用性的同时，我们如何才能不牺牲 TypeScript 提供的最大优势——类型安全呢？

这正是**泛型 (Generics)** 登场解决的核心问题。泛型是 TypeScript 中最强大的特性之一，它允许我们创建可以“适用于多种类型”的组件，同时还能保持完整的类型信息和安全检查。

让我们从一个简单的需求开始：编写一个 identity 函数，它接收一个参数并原封不动地返回它。

一种最直接、但也是最危险的实现方式是使用 any 类型：

```ts
function identity(arg: any): any {
  return arg;
}

let output = identity("myString"); // output 的类型是 any
```

这段代码虽然能工作，但我们却付出了巨大的代价：**丢失了类型信息。**我们传入了一个 string，但 output 变量的类型却变成了 any。这意味着，我们可以在 output 上进行任何操作（比如 output.toFixed(2)），TypeScript 编译器都不会发出任何警告，但这些操作在运行时很可能会引发错误。我们等于亲手关闭了 TypeScript 的类型保护。

我们需要一种方法，**既能让函数接受任意类型，又能确保返回值的类型与传入参数的类型完全一致。**

泛型通过引入**类型变量 (Type Variables)** 来解决这个问题。类型变量是一种特殊的变量，它不代表值，而是代表类型。它就像一个占位符，当我们使用该组件时，再填入具体的类型。

让我们用泛型来重写 identity 函数：

```ts
function identity<T>(arg: T): T {
  return arg;
}
```

这段代码的变化看似微小，但意义深远。让我们来分解这个语法：

- `<T>`：这是类型变量的声明。我们告诉 TypeScript，T 是一个类型占位符。T 这个名字是惯例，你也可以用任何其他合法的变量名（如 Type, TInput 等）。
- `arg: T`：我们将参数 arg 的类型设置为 T。
- `: T`：我们指定函数的返回值类型也是 T。

通过这种方式，我们建立了一个契约：传入参数的类型与返回值的类型必须一致。T 在函数被调用时，才被具体的类型所填充。

现在，让我们看看调用这个泛型函数时会发生什么：

```ts
// 1. 显式指定类型
let output = identity<string>("myString"); // output 的类型是 string

// 2. 利用类型推断 (更常见)
let anotherOutput = identity(123); // output 的类型是 number
```

在第二个例子中，我们没有显式地用 <number> 来指定类型，但 TypeScript 非常智能，它会根据我们传入的参数 123，自动推断出 T 应该被 number 替代。

现在，我们得到了两全其美的结果：一个可以处理任何类型的函数，并且完全保留了类型信息，类型安全得到了百分之百的保障。

### 泛型的其它应用

泛型的应用远不止于函数。它可以被用于接口、类，从而构建出高度可复用且类型安全的系统。

我们可以定义一个泛型接口来描述一个通用的数据结构，比如 API 的响应格式。

```ts
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

// 定义 User 类型
interface User {
  id: number;
  name: string;
}

// 使用泛型接口
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Raycast" },
  status: "success",
};

const errorResponse: ApiResponse<null> = {
  data: null,
  status: "error",
  message: "Not found",
};
```

`ApiResponse<T>` 成为了一个可复用的模板，可以用来包裹任何类型的 data。

---

同样，泛型也可以用于类，以创建能处理多种数据类型的容器或集合。

```ts
class DataStore<T> {
  private data: T[] = [];

  addItem(item: T): void {
    this.data.push(item);
  }

  getItems(): T[] {
    return [...this.data];
  }
}

// 创建一个只能存储数字的实例
const numberStore = new DataStore<number>();
numberStore.addItem(10);
// numberStore.addItem("hello"); // 编译时错误!

// 创建一个只能存储字符串的实例
const stringStore = new DataStore<string>();
stringStore.addItem("hello");
```

### 约束泛型

有时候，我们希望泛型类型 T 不是完全任意的，而是必须满足某些特定的条件。例如，我们想编写一个函数，它接收一个参数并打印其 length 属性。

一个错误的尝试是：

```ts
// function logLength<T>(arg: T): void {
//   console.log(arg.length); // 编译时错误: Property 'length' does not exist on type 'T'.
// }
```

编译器会报错，因为它无法保证任意类型 T 都拥有 length 属性。

为了解决这个问题，我们需要使用泛型约束 (Generic Constraints)。我们通过 extends 关键字，来要求类型变量 T 必须“继承”自某个特定的类型。

```ts
interface Lengthwise {
  length: number;
}

// T 必须是拥有 length: number 属性的类型
function logLength<T extends Lengthwise>(arg: T): void {
  console.log(arg.length);
}

logLength("hello"); // string 有 length 属性
logLength([1, 2, 3]); // array 有 length 属性
logLength({ length: 10, value: '...' }); // 对象有 length 属性
// logLength(123); // 编译时错误: number 没有 length 属性
```

通过 extends Lengthwise，我们与编译器达成了一个新的约定：T 可以是任何类型，但它必须符合 Lengthwise 接口的契约。这既保证了函数的灵活性，又确保了在函数内部可以安全地调用 .length。

### 更进一步的泛型约束

除了使用extends，我们还有其它方法添加约束。

泛型约束最强大、最巧妙的应用之一是与 keyof 操作符结合。keyof 可以获取一个类型的所有公共属性名组成的联合类型。当我们将它用于泛型约束时，可以实现对对象属性访问的完全类型安全。

设想一个函数 getProperty，它需要安全地获取一个对象上某个属性的值。

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let person = {
  name: "Raycast",
  age: 5,
  location: "Internet",
};

// 正确使用
const personName = getProperty(person, "name"); // personName 的类型是 string
const personAge = getProperty(person, "age");   // personAge 的类型是 number

// 错误使用
// const invalidProp = getProperty(person, "email");
// 编译时错误: Argument of type '"email"' is not assignable to parameter of type '"name" | "age" | "location"'.
```

让我们来解析这个精巧的类型定义 `K extends keyof T`：

- 我们定义了两个类型变量：T 代表对象的类型，K 代表属性键的类型。
- keyof T 会得到 person 对象所有键的联合类型，即 "name" | "age" | "location"。
- 约束 K extends keyof T 意味着，传入的第二个参数 key 的类型 K，必须是 "name" | "age" | "location" 这个联合类型中的一员。
- 这完美地防止了我们传入一个对象上不存在的属性名，例如 "email"，从而在编译阶段就杜绝了因属性名拼写错误而导致的 undefined 问题。

## 实用工具类

随着我们对 TypeScript 的掌握日渐深入，我们会发现自己经常在进行一些重复性的“类型体操”：从一个现有类型中创建新类型，让所有属性变为可选，或者移除某些敏感属性。如果我们每次都手动编写这些转换逻辑，不仅会使代码变得冗长，还会增加出错的风险。

幸运的是，TypeScript 团队预见到了这些常见的需求，并为我们内置了一套功能强大的“类型工具箱”——实用工具类型 (Utility Types)。

这些工具就像是类型世界的“高阶函数”，它们接收一个或多个类型作为输入，然后返回一个经过转换的新类型。它们是 TypeScript 核心特性的集大成者，巧妙地运用了泛型、条件类型和映射类型，让复杂的类型转换变得轻而易举。掌握它们，是提升开发效率和代码质量的捷径。

本文将带你深入探索四个最核心、最常用的实用工具类型：`Partial, Readonly, Pick, 和 Omit`。

### `Partial<T>`：让一切变为可选

- 作用：构造一个新类型，并将 T 类型的所有属性设置为可选 (?)。
- 应用场景：当你需要处理一个对象的“部分更新”时，Partial 无比实用。例如，在一个更新用户信息的函数中，用户可能只提交了需要修改的字段，而不是完整的用户对象。

```ts
interface User {
  id: number;
  username: string;
  email: string;
  bio: string;
}

// 这个函数用于更新用户信息
function updateUser(id: number, fieldsToUpdate: Partial<User>) {
  // ... 在这里执行更新逻辑
  // fieldsToUpdate 可以是 { username: 'newname' }
  // 也可以是 { email: 'new@email.com', bio: 'new bio' }
}

updateUser(1, { username: "123" }); // 合法
updateUser(1, { email: "123@123.com", bio: "Loves TS." }); // 合法
```

`Partial<User>` 自动生成了一个新类型 { id?: number; username?: string; ... }，它允许我们传入 User 属性的任意子集，而无需手动为每个属性添加 ?。

### `Readonly<T>`：不可变

- 作用：构造一个新类型，并将 T 类型的所有属性设置为只读 (readonly)。
- 应用场景：当你希望创建一个不可变的数据对象时，Readonly 是你的首选。这在处理应用配置、或者从 API 获取并存储到状态管理中的数据时非常有用，可以防止意外的修改。

```ts
interface AppConfig {
  apiUrl: string;
  theme: 'dark' | 'light';
}

const config: Readonly<AppConfig> = {
  apiUrl: "https://api.raycast.com",
  theme: "dark",
};

// 任何修改尝试都会在编译阶段被捕获
// config.theme = "light"; 
// 编译时错误: Cannot assign to 'theme' because it is a read-only property.
```

`Readonly<AppConfig>` 确保了 config 对象在初始化后不会被篡改

### `Pick<T, K>`：挑选所需

- 作用：从类型 T 中“挑选”出一组属性 K（**K 是 T 中属性名的联合类型**），并创建一个只包含这些属性的新类型。
- 应用场景：当你需要从一个复杂的对象类型中，创建一个只包含部分关键信息的新类型时，Pick 非常有用。例如，从完整的用户对象中创建一个用于列表展示的“用户预览”类型。

```ts
interface User {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  lastLoginAt: Date;
}

// 创建一个只包含 id 和 username 的用户预览类型
type UserPreview = Pick<User, "id" | "username">;

// UserPreview 等价于:
// {
//   id: number;
//   username: string;
// }

const userForList: UserPreview = {
  id: 1,
  username: "RaycastAI",
};
```

Pick 让我们能够以声明式的方式，精确地从现有类型中派生出更小、更专注的子类型

### `Omit<T, K>`：排除多余

- 作用：与 Pick 相反，Omit 从类型 T 中构造一个新类型，该类型拥有 T 的所有属性，但排除了指定的属性集 K。
- 应用场景：当你需要从一个类型中移除敏感信息或不需要的字段时，Omit 是最佳选择。例如，在将数据库中的用户对象返回给前端时，移除 password 字段。

```ts
interface UserWithPassword {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
}

// 创建一个不包含 passwordHash 的公共用户类型
type PublicUser = Omit<UserWithPassword, "passwordHash">;

// PublicUser 等价于:
// {
//   id: number;
//   username:string;
//   email: string;
// }

function sendUserToClient(user: UserWithPassword): PublicUser {
  const { passwordHash, ...publicData } = user;
  return publicData;
}
```

这四个只是冰山一角。TypeScript 还提供了 `Required<T>, Record<K,T>, Exclude<T,U>, ReturnType<T>` 等一系列强大的工具。当你发现自己正在手动进行复杂的类型转换时，不妨先查阅一下 TypeScript 的官方文档——很可能已经有一个现成的实用工具类型在等着你了。

## 类与访问修饰符

在 JavaScript ES6 之前，开发者们通过原型链（prototypal inheritance）来模拟面向对象的编程范式。虽然功能强大，但其语法和心智模型对于有传统面向对象语言（如 Java 或 C#）背景的开发者来说，常常显得不够直观。ES6 引入了 class 关键字，提供了一套更清晰、更熟悉的语法糖。而 TypeScript 则在此基础上，更进一步，引入了完整的类型支持和强大的访问控制机制，将 JavaScript 的面向对象能力提升到了一个全新的工程化高度。

本文将深入探讨 TypeScript 中类的定义，并重点解析其访问控制的核心——public、private 和 protected 修饰符。

在面向对象编程中，**类 (Class) 是创建对象的蓝图 (Blueprint)。它定义了一类事物所共有的属性 (Properties)（状态）和方法 (Methods)（行为）**。

让我们通过构建一个简单的 Player 类来理解其基本结构：

```ts
class Player {
  // 1. 属性 (Properties)
  username: string;
  health: number;
  isOnline: boolean;

  // 2. 构造函数 (Constructor)
  constructor(username: string) {
    this.username = username;
    this.health = 100; // 初始生命值为 100
    this.isOnline = true;
    console.log(`Welcome, ${this.username}!`);
  }

  // 3. 方法 (Methods)
  attack(target: Player): void {
    if (!this.isOnline || !target.isOnline) {
      console.log("One of the players is offline.");
      return;
    }
    console.log(`${this.username} attacks ${target.username}!`);
    // ... 复杂的伤害计算逻辑
  }

  disconnect(): void {
    this.isOnline = false;
    console.log(`${this.username} has disconnected.`);
  }
}
```

这个 Player 类包含了构成一个类的三个核心部分：

- **属性**：我们在类的主体中声明了 username, health, isOnline 等属性，并为它们指定了类型。这些属性构成了每个 Player 实例的内部状态。
- **构造函数**：constructor 是一个特殊的方法，它在通过 new 关键字创建类的新实例时被自动调用。它的主要职责是初始化对象的属性。
- **方法**：attack 和 disconnect 是定义在类上的函数，它们描述了 Player 对象能够执行的行为。方法可以访问和修改实例的属性（通过 this 关键字）。

此时创建和使用类的实例（即对象）非常直观。

但仅仅定义结构是不够的。一个健壮的系统还需要封装 (Encapsulation)——即隐藏对象的内部实现细节，只暴露必要的接口供外部使用。这可以防止外部代码随意篡改对象的状态，从而保证系统的稳定性和可维护性。

TypeScript 为此提供了三个访问修饰符：`public、private 和 protected`。

1. public

public 是最宽松的访问级别，也是默认的修饰符。如果你不显式指定任何修饰符，那么该成员就是 public 的。被标记为 public 的属性或方法可以在任何地方被访问——包括类的内部、类的实例外部，以及子类中。

```ts
class Greeter {
  public message: string; // 显式标记为 public

  constructor(message: string) {
    this.message = message;
  }
}

const greeter = new Greeter("Hello");
console.log(greeter.message); // 可以在外部访问
```

2. private

private 是最严格的访问级别。**被标记为 private 的成员只能在定义它的那个类的内部被访问**。

```ts
class BankAccount {
  private balance: number = 0;

  constructor(initialBalance: number) {
    if (this.isValidAmount(initialBalance)) {
      this.balance = initialBalance;
    }
  }

  public deposit(amount: number): void {
    if (this.isValidAmount(amount)) {
      this.balance += amount;
      console.log(`Deposited ${amount}. New balance: ${this.balance}`);
    }
  }

  // 这是一个私有的辅助方法，外部无需关心其实现
  private isValidAmount(amount: number): boolean {
    return amount > 0;
  }
}

const account = new BankAccount(100);
account.deposit(50);

// console.log(account.balance); 
// 编译时错误: Property 'balance' is private and only accessible within class 'BankAccount'.

// account.isValidAmount(10);
// 编译时错误: Property 'isValidAmount' is private...
```

3. protected

protected 是介于 public 和 private 之间的一种访问级别。**被标记为 protected 的成员可以在定义它的类的内部以及该类的子类中被访问**。但是，它不能在类的实例外部被访问。

```ts
class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  public bark(): void {
    // 可以在子类中访问受保护的成员
    console.log(`Woof! My name is ${this.name}.`);
  }
}

const dog = new Dog("Buddy");
dog.bark(); // 输出: Woof! My name is Buddy.

// console.log(dog.name);
// 编译时错误: Property 'name' is protected and only accessible within class 'Animal' and its subclasses.
```

TypeScript 提供了一种非常便利的语法糖，叫做**参数属性 (Parameter Properties)**。它允许我们在构造函数的参数上直接使用访问修饰符，从而将参数的声明、赋值和属性的定义合并为一步。

传统方式：

```ts
class Person {
  public name: string;
  public age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

使用参数属性：

```ts
class Person {
  constructor(public name: string, public age: number) {
    // 无需显式赋值
  }
}
```

## 抽象类

抽象类使用 abstract 关键字进行声明。它的核心特点在于可以包含两种类型的成员：

- 具体成员 (Concrete Members)：与普通类一样，包含具体的实现。这些属性和方法会被所有子类继承。
- 抽象成员 (Abstract Members)：同样使用 abstract 关键字声明，但不包含任何实现细节。它们只定义一个签名（方法名、参数、返回类型）。任何继承该抽象类的子类，都必须为这些抽象成员提供具体的实现。

让我们通过一个例子来理解。假设我们正在为一个公司构建 HR 系统，系统中存在不同类型的员工，如 Developer 和 Manager。他们都有一些共同点（如姓名和基本信息），但在计算年度奖金的方式上却截然不同。

这时，一个 Employee 抽象类便是完美的选择：

```ts
// 声明一个 Employee 抽象类
abstract class Employee {
  // 1. 具体属性，所有子类共享
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  // 2. 具体方法，所有子类共享
  public getProfile(): string {
    return `Employee: ${this.name}`;
  }

  // 3. 抽象方法，没有实现，必须由子类提供
  public abstract calculateAnnualBonus(salary: number): number;
}
```

这个 Employee 类清晰地定义了一个模板：

- 每个员工都有 name 和一个 getProfile 方法。
- 每个员工都必须有一种计算年度奖金 (calculateAnnualBonus) 的方式，但具体怎么算，基类并不关心，由各个子类自己决定。

### 抽象类的规则与使用

1. 不能被实例化

抽象类是一个不完整的“半成品”，因此你不能直接使用 new 关键字来创建它的实例。它的唯一用途就是被其他类继承。

2. 必须实现所有抽象成员

任何继承自抽象类的子类，都必须为父类中所有的抽象成员提供具体的实现，否则 TypeScript 编译器会报错。

```ts
class Developer extends Employee {
  // 子类必须实现 calculateAnnualBonus 方法
  public calculateAnnualBonus(salary: number): number {
    // 开发者的奖金是薪水的 10%
    return salary * 0.1;
  }
}

class Manager extends Employee {
  // 子类必须实现 calculateAnnualBonus 方法
  public calculateAnnualBonus(salary: number): number {
    // 经理的奖金是薪水的 20%
    return salary * 0.2;
  }
}

const dev = new Developer("Alice");
const mgr = new Manager("Bob");

console.log(dev.getProfile()); // "Employee: Alice" (继承自基类)
console.log(dev.calculateAnnualBonus(100000)); // 10000 (子类自己的实现)

console.log(mgr.calculateAnnualBonus(200000)); // 40000 (子类自己的实现)
```

通过这种方式，抽象类为整个继承体系提供了一个统一的结构和行为保证

抽象类不仅仅是一种语法，更是一种强大的面向对象设计工具。它在“完全抽象的接口”和“完全具体的类”之间，提供了一个完美的平衡点。

## 声明合并

在 TypeScript 的世界里，大多数时候我们遵循一个直观的规则：一个名字对应一个实体。但 TypeScript 允许我们**将多个拥有相同名称的独立声明，由编译器自动“熔合”成一个单一的、更丰富的定义。**这个过程，就是声明合并 (Declaration Merging)。

简单来说，声明合并是 TypeScript 编译器的一种能力，它会找到所有使用相同名称声明的实体，并将它们的属性和成员组合成一个统一的结构。可以把它想象成将同一建筑物的不同部分的蓝图（如电气图、管道图、结构图）叠加在一起，形成一张完整的总蓝图。

这个“炼金术”主要发生在以下几种实体之间。

1. 接口合并 (Merging Interfaces)

这是声明合并最常见、也最实用的场景。当多个 interface 声明拥有相同的名称时，它们的成员列表会被合并。

```ts
interface Box {
  height: number;
  width: number;
}

interface Box {
  scale: number;
}

// 编译器会将其合并为：
// interface Box {
//   height: number;
//   width: number;
//   scale: number;
// }

let box: Box = { height: 5, width: 6, scale: 10 };
```

对于方法成员，后声明的同名方法如果签名不同，会被视为该方法的重载。

**最强大的应用：扩展全局类型**：声明合并真正的威力在于它能让我们“安全地”**扩展全局对象或第三方库的类型定义，而无需修改其源码**。例如，我们可以为浏览器的全局 window 对象添加自定义属性：

```ts
// 在你的项目中的某个 .ts 文件里
declare global {
  interface Window {
    myAppConfig: {
      version: string;
      apiUrl: string;
    };
  }
}

// 现在，你可以在代码中安全地访问这个新属性，并获得完整的类型提示
window.myAppConfig = { version: "1.0", apiUrl: "/api" };
```

2. 命名空间合并 (Merging Namespaces)

与接口类似，同名的 namespace 也会将其导出的成员进行合并。这对于将一个大的命名空间拆分到多个文件中进行管理非常有用。

```ts
// 文件: Animals.ts
namespace Animals {
  export class Zebra {}
}

// 文件: Animals.extended.ts
namespace Animals {
  export interface Legged { numberOfLegs: number; }
  export class Dog {}
}

// 编译器会将它们合并
let zebra = new Animals.Zebra();
let dog = new Animals.Dog();
```

合并后的 Animals 命名空间同时包含了 Zebra 和 Dog。命名空间合并是早期 TypeScript 代码组织的核心，但在现代模块化开发中，其地位已被 ES 模块取代。

3. 命名空间与类/函数/枚举的合并

这是声明合并更高级、更精巧的应用。它允许我们将一个命名空间“附加”到一个类、函数或枚举上，为其添加额外的静态属性或相关的类型。这完美地模拟了 JavaScript 中函数也是对象的特性。

命名空间与类合并：

```ts
class Album {
  constructor(public label: string) {}
}

// 为 Album 类附加一个命名空间，用于存放相关的工具函数或类型
namespace Album {
  export function create(label: string) {
    return new Album(label);
  }
  export type AlbumFormat = 'CD' | 'Vinyl' | 'Digital';
}

// 使用
const album = Album.create("My Album"); // 调用命名空间中的静态工厂方法
const format: Album.AlbumFormat = 'CD'; // 使用命名空间中的类型

```

通过这种方式，Album 同时作为一个可被 new 的类和一个包含静态成员的容器。

---

理解什么能合并固然重要，但知道什么不能合并同样关键。

- 类型别名 (type) 不能合并：这是 type 和 interface 的一个核心区别。类型别名创建的是一个确定的名称，不允许重复定义。
- 类不能合并：你不能声明两个同名的类。

## 关于 tsconfig.json

当一个文件夹里只有一个 `.ts` 文件时，我们可以简单地使用 `tsc myFile.ts` 来编译它。但当项目变得复杂，包含数十甚至数百个文件时，我们需要一个更系统的方式来管理。我们需要一个地方来告诉 TypeScript 编译器：

- 这个项目的“根”在哪里？
- 哪些文件应该被包含在编译中，哪些应该被排除？
- 我们希望将 TypeScript 代码编译成哪个版本的 JavaScript？
- 我们希望代码检查的严格程度是怎样的？

所有这些问题的答案，都存放在一个至关重要的文件中——`tsconfig.json`。这个文件是任何一个 TypeScript 项目的大脑和指挥中心。一个配置良好、意图清晰的 `tsconfig.json` 是专业 TypeScript 项目的标志。

这个文件本身就是一个简单的 JSON 文件。你可以手动创建它，但最推荐的方式是在你的项目根目录下运行以下命令：

```bash
tsc --init
```

这个命令会生成一个 `tsconfig.json` 文件，其中包含了所有可用的配置选项，并且大部分都被注释掉了，附带有详细的说明。这个生成的文件本身就是一份极佳的学习文档。

### 核心结构：compilerOptions
`tsconfig.json` 的核心是 `compilerOptions` 对象。这里定义了 TypeScript 编译过程中的所有规则和行为。让我们来剖析其中最关键的几个选项。

#### 1. 项目输出配置 (The "What" and "Where")

- **`target`**: 指定编译后生成的 JavaScript 版本。
  - **作用**：这是最重要的选项之一。它决定了你的代码能在多旧的运行环境中运行。
  - **示例**：`"target": "ES2020"` 意味着 TypeScript 会将代码转换为符合 ES2020 规范的 JavaScript。如果你需要支持旧版浏览器，可能会使用 `"ES5"`。
- **`module`**: 指定生成的代码使用哪种模块系统。
  - **作用**：决定了代码如何被组织和加载。
  - **示例**：
    - `"CommonJS"`: 适用于旧版的 Node.js 环境。
    - `"ESNext"` 或 `"NodeNext"`: 适用于现代 Node.js 和支持 ES 模块的前端项目。
- **`outDir`**: 指定编译后生成的 `.js` 文件存放的目录。
  - **作用**：保持项目结构的整洁，将源码和编译产物分离开。
  - **示例**：`"outDir": "./dist"` 是一个非常普遍的做法，将所有输出文件放入 `dist` (distribution) 文件夹。
- **`rootDir`**: 指定 TypeScript 源码文件的根目录。
  - **作用**：通常与 `outDir` 配合使用，以维持 `outDir` 内的目录结构与 `rootDir` 一致。
  - **示例**：`"rootDir": "./src"` 表示所有源码都在 `src` 文件夹下。

#### 2. 严格性与质量控制 (The "How Strict")

- **`strict`**: 这是一个“总开关”，开启它等于开启了所有严格类型检查的选项。
  - **作用**：强烈推荐始终设置为 `true`。它能最大限度地发挥 TypeScript 的类型安全优势。
  - **它包含以下关键选项**：
    - **`noImplicitAny`**: 当 TypeScript 无法推断一个变量的类型且你没有显式注解时，会报错。这能消灭代码中所有不明确的 `any` 类型。
    - **`strictNullChecks`**: 严格区分 `null` 和 `undefined`。变量在被赋值前不能被使用，你必须显式地处理可能为 `null` 或 `undefined` 的情况。这是避免 `"cannot read property '...' of undefined"` 错误的神器。
    - **`strictFunctionTypes`**: 更严格地检查函数参数的协变与逆变。
    - **`strictPropertyInitialization`**: 确保类中的每个属性都在构造函数中被正确初始化。

#### 3. 模块解析与互操作性

- **`moduleResolution`**: 告诉编译器如何查找模块。
  - **作用**：模拟不同模块解析器的行为。
  - **示例**：`"Node"`（或现代的 `"NodeNext"`）是绝大多数项目的选择，它模拟了 Node.js 的模块解析策略（查找 `node_modules` 等）。
- **`esModuleInterop`**: 启用 ES 模块与 CommonJS 模块之间的互操作性。
  - **作用**：解决了 `import express from 'express'` 与 `const express = require('express')` 之间的差异。强烈建议始终设置为 `true`，可以避免大量与导入 CommonJS 模块相关的头痛问题。
- **`allowJs`**: 允许在项目中混合使用 `.ts` 和 `.js` 文件。
  - **作用**：对于从 JavaScript 项目逐步迁移到 TypeScript 的场景非常有用。

#### 4. 调试与环境

- **`sourceMap`**: 生成 `.js.map` 文件。
  - **作用**：这是调试的生命线。它建立了编译后的 `.js` 文件与原始 `.ts` 源码之间的映射关系，让你可以在浏览器的开发者工具中直接调试你的 TypeScript 代码。强烈建议始终设置为 `true`。
- **`lib`**: 指定项目中可用的“库”定义文件。
  - **作用**：告诉 TypeScript 你的代码运行在什么环境中。例如，如果你在浏览器中运行代码，你需要 `DOM` 库来识别 `document`、`window` 等对象。
  - **示例**：`"lib": ["DOM", "DOM.Iterable", "ESNext"]` 是现代前端项目的常见配置。

### 顶层配置：文件范围
除了 `compilerOptions`，`tsconfig.json` 的顶层还有几个重要的属性，用于定义项目的“边界”。

- **`include`**: 一个数组，指定了需要被编译器包含的文件或目录的模式。
  - **示例**：`"include": ["src/**/*"]` 会包含 `src` 目录下的所有文件。
- **`exclude`**: 一个数组，指定了需要从编译中排除的文件或目录的模式。
  - **作用**：通常用于排除测试文件、构建脚本等。
  - **注意**：`node_modules` 默认总是被排除的。
  - **示例**：`"exclude": ["node_modules", "**/*.spec.ts"]`
- **`files`**: 一个数组，明确列出需要编译的单个文件。这在项目非常小时可能有用，但通常 `include` 更为灵活。

### 实践范例：一个现代 Node.js 项目的 tsconfig.json

```jsonc
{
  "compilerOptions": {
    /* --- 基本选项 --- */
    "target": "ES2022",           // 编译到现代的 JavaScript 版本
    "module": "NodeNext",        // 使用最新的 Node.js 模块系统
    "lib": ["ES2022"],             // 包含 ES2022 的内置库

    /* --- 严格性 --- */
    "strict": true,                // 开启所有严格检查，保证代码质量
    "skipLibCheck": true,          // 跳过对 .d.ts 声明文件的检查，加快编译速度

    /* --- 模块解析 --- */
    "moduleResolution": "NodeNext", // 使用最新的 Node.js 模块解析策略
    "esModuleInterop": true,       // 启用 CJS 和 ESM 的互操作性

    /* --- 输出 --- */
    "outDir": "./dist",            // 输出目录
    "rootDir": "./src",            // 源码根目录

    /* --- 调试 --- */
    "sourceMap": true              // 生成 Source Map 用于调试
  },
  "include": ["src/**/*"],         // 只编译 src 目录下的文件
  "exclude": ["node_modules"]      // 排除 node_modules
}
```
### 总结
`tsconfig.json` 远不止是一个配置文件，它是你与 TypeScript 编译器沟通的桥梁，是你项目架构的声明。一个深思熟虑的配置能够：

- **保证代码质量**：通过 `strict` 模式捕获大量潜在错误。
- **提升开发体验**：通过 `sourceMap` 和正确的模块解析简化调试。
- **确保兼容性**：通过 `target` 和 `module` 保证代码在目标环境中正确运行。
- **保持项目整洁**：通过 `outDir` 和 `rootDir` 分离源码与产物。

花时间去理解并精心配置你的 `tsconfig.json`，是每一个 TypeScript 开发者都应该投入的、回报率极高的投资。

## 在JS中集成TS

在 TypeScript 的世界里，一个常见的误解是：拥抱 TypeScript 意味着必须将整个 JavaScript 项目进行一次痛苦的、颠覆性的重写。但事实远非如此。TypeScript 的设计哲学中最精妙的一点，正是它作为 JavaScript 的“超集”所带来的渐进式采纳能力。

TypeScript 并非 JavaScript 的替代品，而是一个强大的协作者。它可以在不扰乱现有工作流的情况下，悄无声息地进入你的 JavaScript 项目，逐步为其注入类型安全和开发时工具的强大能力。本文将探索两种将 TypeScript 集成到 JavaScript 项目中的核心策略：直接集成与 JSDoc 增强。

### 策略一：直接集成

这是最直接的策略，适用于你准备开始将部分 `.js` 文件迁移到 `.ts` 的场景。

#### 第 1 步：搭建桥梁 tsconfig.json

首先，我们需要为项目引入 TypeScript 并创建一个配置文件。

安装 TypeScript：

```bash
npm install typescript --save-dev
```

生成 `tsconfig.json`：

```bash
npx tsc --init
```

配置关键选项：在生成的 `tsconfig.json` 文件中，找到并确保以下两个选项被设置为 `true`：

```jsonc
{
  "compilerOptions": {
    // ...
    "allowJs": true,     // 核心：允许编译器编译 .js 文件。
    "checkJs": true      // 推荐：让编译器开始报告 .js 文件中的类型错误。
    // ...
  }
}
```
`"allowJs": true` 是魔法的开关。它告诉 TypeScript 编译器：“请将 `.js` 文件也视为你项目的一部分。”
`"checkJs": true` 则更进一步，它指示 TypeScript 对这些 `.js` 文件进行类型检查（基于其强大的类型推断能力和 JSDoc 注释）。
#### 第 2 步：从一个文件开始

迁移不必一步到位。选择一个风险较低、逻辑相对独立的文件开始，比如一个工具函数库 `utils.js`。

- **重命名**：将 `utils.js` 重命名为 `utils.ts`。
- **添加类型**：TypeScript 的类型推断已经能帮你发现很多问题了。现在，你可以开始为函数参数和返回值添加明确的类型注解。

**之前 (`utils.js`)**：

```js
function truncate(str, length) {
  return str.substring(0, length);
}
```

**之后 (`utils.ts`)**：

```ts
function truncate(str: string, length: number): string {
  return str.substring(0, length);
}
```
就这样，`truncate` 函数现在是完全类型安全的了。任何试图传入非字符串或非数字参数的调用，都会在你的编辑器和编译时被立刻捕获。你的项目现在是一个 `.ts` 和 `.js` 文件和谐共存的状态。

### 策略二：JSDoc 增强
有时候，你可能因为团队规范、遗留系统或其他原因，无法或不想将文件重命名为 `.ts`。但这并不意味着你与类型安全无缘。TypeScript 能够理解并利用 `JSDoc` 注释来进行类型检查。

你只需完成上面提到的 `tsconfig.json` 设置（确保 `allowJs` 和 `checkJs` 为 `true`），就可以开始了。

#### 1. 为函数添加类型
使用 `@param` 和 `@returns` 标签，并用花括号 `{}` 标注类型。

```js
// file: src/formatters.js

/**
 * Greets a user by name.
 * @param {string} name - The name of the user.
 * @returns {string} The complete greeting.
 */
function greet(name) {
  return `Hello, ${name}!`;
}

greet(123); // 编辑器和 tsc 会报错：Argument of type 'number' is not assignable to parameter of type 'string'.
```
即使这仍然是一个 `.js` 文件，TypeScript 编译器和你的 IDE（如 VS Code）也能理解这个类型契约，并提供实时错误检查和智能提示。

#### 2. 定义复杂类型
JSDoc 的能力远不止于此。你可以使用 `@typedef` 来定义复杂的对象类型，甚至可以从其他文件导入类型定义。

首先，创建一个类型定义文件（可以是 `.ts` 或 `.d.ts`）：

```ts
// file: src/types.ts
export interface User {
  id: number;
  username: string;
}
```
然后，在你的 `.js` 文件中使用 `import()` 语法来引用它：

```js
// file: src/api.js

/**
 * Fetches a user profile.
 * @param {number} userId
 * @returns {Promise<import('./types').User>} A promise that resolves to the user object.
 */
async function fetchUser(userId) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

// TypeScript 会知道 fetchUser 返回的是 Promise<User>
fetchUser(1).then(user => {
  console.log(user.username); // 能够获得 'username' 的智能提示
  // console.log(user.email); // 会报错，因为 User 类型上没有 email 属性
});
```
这种 `import('./types').User` 语法是 `JSDoc` 的一个强大特性，它允许你在不改变 JavaScript 运行时行为的情况下，“借用” TypeScript 的类型定义。

### 总结：选择你的路径，或双管齐下
TypeScript 与 JavaScript 的协同工作并非一道单选题。它提供了一个灵活的、渐进的路径，让每个团队都能找到适合自己的节奏。

- **路径 A：逐步迁移**。通过设置 `"allowJs": true`，你可以将 `.js` 文件逐个重命名为 `.ts`，在新文件中享受完整的 TypeScript 语法和功能。
- **路径 B：JSDoc 增强**。通过设置 `"checkJs": true` 和编写 `JSDoc` 注释，你可以在保持 `.js` 文件不变的情况下，获得 TypeScript 带来的绝大部分类型检查和工具支持。

最棒的是，这两个路径可以并行不悖。在一个大型项目中，你可以：

- 对所有新功能，使用 `.ts` 文件编写。
- 对现有关键的 `.js` 模块，添加 `JSDoc` 注释以快速获得类型安全。
- 在重构或修复旧模块时，顺便将其从 `.js` + `JSDoc` 迁移到 `.ts`。

这种务实的策略，让 TypeScript 不再是一个遥远的目标，而是一个从今天起就能为你的 JavaScript 项目赋能的、触手可及的强大盟友。

## 关于声明文件 .d.ts

TypeScript 的强大之处在于其静态类型系统，它能在我们编码时就提供无与伦比的智能提示、错误检查和代码导航。但这引出了一个关键问题：当我们的 TypeScript 项目需要使用一个纯 JavaScript 编写的库（如一个 jQuery 插件、一个旧版的 npm 包，或者一个内部的工具库）时，会发生什么？

对于 TypeScript 编译器来说，这个 JavaScript 库就像一个“黑箱”。它不知道这个库导出了哪些函数，这些函数需要什么参数，又会返回什么。因此，编译器只能无奈地将所有从该库导入的东西都视为 `any` 类型。这意味着，我们失去了所有类型安全保障，回到了“刀耕火种”的 JavaScript 时代。

为了解决这个问题，TypeScript 提供了一套解决方案，其核心就是**声明文件 (Declaration Files)**，它们以 `.d.ts` 为后缀。

### 什么是声明文件？
你可以将 `.d.ts` 文件想象成一本API 使用手册。它只描述 JavaScript 代码的“形状”（shape），而不包含任何具体的实现。它告诉 TypeScript 编译器：

- 这个库里有哪些可用的变量、函数和类。
- 这些函数的参数是什么类型，返回值是什么类型。
- 这些类有哪些属性和方法。
- ...以及所有关于其公共 API 的类型信息。

它是一座桥梁，连接了 TypeScript 的静态类型世界和 JavaScript 的动态运行时世界。

### 在你动手写之前：先寻找现有的声明文件
在你准备为某个库从零开始编写 `.d.ts` 文件之前，请务必先做两件事，这能为你节省大量时间：

1.  **检查库本身**：许多现代 JavaScript 库在发布时已经内置了自己的 `.d.ts` 文件。这是一个越来越普遍的最佳实践。
2.  **搜索 DefinitelyTyped**：DefinitelyTyped 是一个庞大的、由社区驱动的开源项目，它为数千个流行的 JavaScript 库提供了高质量的 `.d.ts` 文件。这些文件都发布在 npm 的 `@types` scope 下。

例如，如果你想在项目中使用 `lodash`，你只需要运行：

```bash
npm install --save-dev @types/lodash
```

安装后，TypeScript 编译器会自动找到并使用这些类型定义，你就可以享受到对 `lodash` 的完整类型支持了。

只有在这两种方式都失败时，我们才需要亲手创建自己的声明文件。

### 动手实践：为一个 JS 模块创建声明文件
假设我们有一个简单的、内部使用的 JavaScript 工具库 `string-utils.js`：

```js
// file: lib/string-utils.js

function padLeft(str, len, char) {
  return char.repeat(len - str.length) + str;
}

function countChars(str) {
  return str.length;
}

module.exports = {
  padLeft,
  countChars,
};
```
这是一个典型的 CommonJS 模块。现在，让我们在 TypeScript 项目中使用它：

```ts
// file: src/index.ts
import * as utils from '../lib/string-utils'; // TypeScript 不知道 utils 的类型，会将其视为 any

const result = utils.padLeft("hello", 10, " "); // 没有类型提示，容易出错
```
为了修复这个问题，我们需要创建一个 `string-utils.d.ts` 文件。

#### 第 1 步：创建 .d.ts 文件
在你的项目中创建一个文件，例如 `types/string-utils.d.ts`。

#### 第 2 步：使用 declare module
因为这是一个模块，我们需要使用 `declare module '...'` 语法。模块的名称必须与你在 `import` 语句中使用的路径完全匹配。

```ts
// file: types/string-utils.d.ts

declare module '../lib/string-utils' {
  // 我们将在这里描述模块的 API
}
```

#### 第 3 步：描述导出的成员
现在，在 `declare module` 块内部，我们像编写普通 TypeScript 代码一样，使用 `export` 来描述 `string-utils.js` 导出的内容。

```ts
// file: types/string-utils.d.ts

declare module '../lib/string-utils' {
  /**
   * Pads a string on the left.
   * @param str The string to pad.
   * @param len The total desired length.
   * @param char The character to pad with.
   */
  export function padLeft(str: string, len: number, char: string): string;

  /**
   * Counts the characters in a string.
   * @param str The input string.
   */
  export function countChars(str: string): number;
}
```
**关键点**：

- 我们只写了函数的签名，没有函数体 `{}`。
- 我们使用了 `export` 关键字，因为原始 JS 模块导出了这些函数。
- 添加 `JSDoc` 注释是一个非常好的习惯，它能让使用者的体验更上一层楼。

#### 第 4 步：让 TypeScript 找到它
最后，确保你的 `tsconfig.json` 能够找到你创建的声明文件。通常，`include` 配置会自动处理，或者你可以通过 `typeRoots` 明确指定。

现在，回到我们的 `index.ts` 文件，你会发现奇迹发生了：

```ts
// file: src/index.ts
import * as utils from '../lib/string-utils';

// 1. 获得完整的智能提示
// 2. 获得参数类型检查
const result = utils.padLeft("hello", 10, " "); 

// utils.padLeft("hello", 10, 123); 
// 编译时错误: Argument of type 'number' is not assignable to parameter of type 'string'.
```

### 声明全局变量
对于那些不通过模块系统、而是直接向全局作用域（如浏览器的 `window` 对象）添加变量的旧脚本，我们可以使用 `declare var`, `declare let`, 或 `declare const`。

例如，为一个通过 `<script>` 标签引入的 `MY_GLOBAL_LIB` 库创建声明：

```ts
// file: types/global.d.ts

interface LibConfig {
  apiKey: string;
}

declare function MY_GLOBAL_LIB(config: LibConfig): void;
```
只要这个 `.d.ts` 文件被包含在你的项目中，你就可以在任何地方安全地调用 `MY_GLOBAL_LIB(...)`，并获得类型检查。

### 总结
声明文件是 TypeScript 生态系统中不可或缺的粘合剂。它们是 TypeScript 能够理解和赋能庞大 JavaScript 世界的基石。

- `.d.ts` 文件只包含类型声明，没有实现。
- 在动手编写前，务必先在 `@types` 中搜索。
- 对于模块化的 JS 库，核心是使用 `declare module '...'` 来包裹你的类型声明。
- 对于全局脚本，使用 `declare var/let/const/function`。

编写 `.d.ts` 文件可能起初看起来有些令人生畏，但它实际上是一个非常有价值的练习。它不仅能让你当前的项目变得更健壮，还能迫使你更深入地去理解你所依赖的 JavaScript 库的 API 设计。这是每一位专业 TypeScript 开发者都应具备的“超能力”。

## 关于装饰器

在 TypeScript 的高级特性中，装饰器 (Decorators) 无疑是最具“魔法”色彩的一个。它是一种特殊的声明，可以被附加到类、方法、访问器、属性或参数上，以一种声明式的语法来修改或注解它们。装饰器本质上是一种元编程（Metaprogramming）——即编写能够操作其他代码的代码。

它们在许多流行的框架（如 Angular、NestJS、TypeORM）中扮演着核心角色，用于实现依赖注入、路由映射、数据验证等功能。理解装饰器，是深入这些现代框架内部原理的钥匙。

**重要警告：这是一个实验性功能**

在开始之前，必须强调：装饰器目前仍然是 TypeScript 中的一项**实验性功能**。

这意味着：

- 它基于一个尚未最终确定的 TC39（ECMAScript 标准委员会）提案。
- 其未来的语法和行为可能会在 TypeScript 的新版本中发生变化。
- 要使用它，你必须在你的 `tsconfig.json` 文件中显式地启用 `experimentalDecorators` 选项：

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true // 通常与装饰器一同使用，用于元数据反射
  }
}
```
### 装饰器的本质：一个特殊的函数
抛开所有魔法外衣，装饰器本质上就是一个函数。这个函数会在类被定义时（而不是实例化时）被立即调用，并接收到有关其所装饰的目标的信息。TypeScript 根据装饰器被附加到的位置（类、方法等），向这个函数传入不同的参数。

让我们来探索装饰器的五种主要类型。

#### 1. 类装饰器 (Class Decorator)
- **作用**：应用于类的构造函数。
- **参数**：接收一个参数——被装饰的类的构造函数。
- **用途**：可以用来监视、修改或替换整个类的定义。
- **示例**：一个 `sealed` 装饰器，防止类被进一步扩展。

```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
  console.log(`Class ${constructor.name} has been sealed.`);
}

@sealed
class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}

// 在类定义时，控制台就会输出: "Class BugReport has been sealed."
```
`@sealed` 语法就是将 `sealed` 函数应用到 `BugReport` 类上。

#### 2. 方法装饰器 (Method Decorator)
- **作用**：应用于类的方法。
- **参数**：接收三个参数：
  - `target`: 对于静态方法是类的构造函数，对于实例方法是类的原型。
  - `propertyKey`: 方法的名称（一个字符串）。
  - `descriptor`: 该方法的属性描述符 (`PropertyDescriptor`)。
- **用途**：可以用来监视、修改甚至替换方法的实现。这是最常用的装饰器之一。
- **示例**：一个 `log` 装饰器，在方法调用前后打印日志。

```typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value; // 保存原始方法

  // 修改属性描述符，替换原始方法
  descriptor.value = function (...args: any[]) {
    console.log(`Calling method: ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Method ${propertyKey} returned:`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3);
// 控制台输出:
// Calling method: add with args: [2, 3]
// Method add returned: 5
```

#### 3. 属性装饰器 (Property Decorator) 和 4. 访问器装饰器 (Accessor Decorator)
- **作用**：分别应用于类的属性和 `get`/`set` 访问器。
- **参数**：接收两个参数 (`target` 和 `propertyKey`)。
- **用途**：主要用于记录元数据，因为它们不能直接修改属性的值（属性的值只在实例创建后才存在）。

#### 5. 参数装饰器 (Parameter Decorator)
- **作用**：应用于构造函数或方法的参数。
- **参数**：接收三个参数：
  - `target`: 类的构造函数或原型。
  - `propertyKey`: 方法的名称（构造函数中为 `undefined`）。
  - `parameterIndex`: 参数在参数列表中的索引。
- **用途**：几乎完全用于记录元数据。例如，标记哪些参数需要通过依赖注入来提供。
- **示例**：依赖注入的元数据记录（需要 `reflect-metadata` 库）

```typescript
import "reflect-metadata";

function Inject(service: any) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const existingInjections = Reflect.getOwnMetadata("injections", target, propertyKey) || [];
    existingInjections.push({ index: parameterIndex, service });
    Reflect.defineMetadata("injections", existingInjections, target, propertyKey);
  };
}

class ApiService {}

class MyComponent {
  constructor(@Inject(ApiService) private api: ApiService) {}
}
```
这个 `@Inject` 装饰器并没有改变 `api` 参数，它只是记录下：“第 0 个参数需要一个 `ApiService` 的实例”。然后，依赖注入框架会读取这些元数据并完成实际的注入工作。

### 装饰器工厂与组合
- **装饰器工厂 (Decorator Factory)**：如果你想向装饰器传递参数，你需要创建一个“工厂函数”，它返回一个真正的装饰器函数。

```typescript
function log(message: string) {
  // 这是工厂，返回真正的装饰器
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // ... 装饰器逻辑 ...
    console.log(message);
  };
}

class C { @log("Hello from decorator!") myMethod() {} }
```
- **装饰器组合**：可以对一个声明应用多个装饰器。它们的执行顺序是：
  - **评估**：自上而下。
  - **调用**：自下而上（像函数组合一样）。

### 结论：何时使用装饰器？
装饰器是一把双刃剑。

- **优势**：
  - **声明式**：代码意图清晰，将横切关注点（如日志、权限）与核心业务逻辑分离。
  - **可组合**：可以轻松地组合多个装饰器来添加复杂行为。
  - **框架利器**：为框架作者提供了强大的工具来减少模板代码，实现依赖注入、ORM 等。
- **风险**：
  - **实验性**：API 可能会变。
  - **调试困难**：它们增加了代码的“魔法”程度，可能让调试变得不那么直观。
- **建议**：
  - **对于应用程序开发者**：谨慎使用。在你真正需要一个清晰的横切关注点解决方案时，再考虑它。不要为了使用而使用。
  - **对于库或框架的开发者**：装饰器是你的强大盟友，值得深入研究。
  - **对于所有开发者**：即使你不亲自编写，也应该理解它们的工作原理，因为你很可能在你使用的框架中遇到它们。

装饰器代表了 TypeScript 与 JavaScript 语言演进的深度融合，它开启了元编程的大门，让我们能够以一种更优雅、更声明式的方式来构建复杂的软件系统。

> 目前，装饰器（Decorators）已经正式成为 ECMAScript (JS) 标准的一部分，并且 TypeScript 也早已在 5.0 版本中全面支持了符合标准的“原生装饰器”。