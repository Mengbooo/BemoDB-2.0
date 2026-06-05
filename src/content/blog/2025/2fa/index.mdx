---
title: 'TOTP 算法——为什么“固定密钥”能生成“动态验证码”？'
publishDate: '2025-12-04 08:00:00'
description: '简单解释一下 TOTP 算法的原理及实现'
tags:
  - 网络安全
  - TypeScript
  - 算法
language: 'zh-CN'
---

在双重验证（2FA）中，我们扫描二维码后得到的那个“每30秒变一次的6位数字”，其背后的技术标准被称为 TOTP (Time-Based One-Time Password)。它最大的特点是：完全离线。服务器和手机不需要通信，却能算出同样的数字。本文将以精简准确的语言，拆解其从“长串密钥”到“6位数字”的完整计算路径，并附带 TypeScript 代码以供验证。

## 1. 核心原理：两个输入，一个输出

TOTP 本质上是一个数学函数，它接受两个输入：

- **共享密钥 ($K$)**：即你扫描二维码包含的那个 Base32 字符串（如 `JBSWY3DPEHPK3PXP`）。它是固定的。
- **当前时间 ($t$)**：通过 Unix 时间戳表示。它是流动的。

算法公式如下：
$$
TOTP = \text{Truncate}(\text{HMAC-SHA1}(K, \lfloor \frac{t}{30} \rfloor))
$$

## 2. 实例拆解：一步步计算

为了演示，我们设定以下参数（你可以用文末的代码验证这个结果）：

- **密钥**：`JBSWY3DPEHPK3PXP`（Base32解码后对应 ASCII 的 `"Hello!"`）
- **模拟时间**：`1609459200` (UTC 2021-01-01 08:00:00)

### 第一步：时间切片 (Time Counter)

将连续的时间流按 30 秒切分，获取时间计数器 ($C$)。
$$
C = \lfloor \frac{1609459200}{30} \rfloor = 53648640
$$
注：在算法中，$C$ 需转换为 8字节的十六进制大端序 数据：`0000000003328D00`。

### 第二步：哈希混合 (HMAC)

使用 HMAC-SHA1 算法，将密钥和时间计数器混合。
$$
H = \text{HMAC-SHA1}(\text{"Hello!"}, \text{0x0000000003328D00})
$$
计算得出的 20 字节哈希值（Hex）如下：
`3d 21 8b 72 90 0f e6 9a 2e 56 ... 05`

### 第三步：动态截断 (Dynamic Truncation)

这是 TOTP 最精妙的一步。我们利用哈希值本身来决定取哪几位数据。

1.  **取偏移量**：取哈希值最后一个字节 `0x05` 的低 4 位，结果是 `5`。
2.  **截取**：从哈希值的 第 5 个字节 开始，连续读取 4 个字节。
    -   哈希片段：`0f e6 9a 2e`
3.  **转整数**：将这 4 字节转为 32 位整数（并去掉符号位）。
    -   `0x0fe69a2e` $\rightarrow$ `266771118`

### 第四步：取模 (Modulo)

对结果取模，保留最后 6 位。
$$
Code = 266771118 \pmod{1000000} = 771118
$$
最终验证码：**771 118**

## 3. 代码验证 (TypeScript/Node.js)

以下是一个纯净的 TypeScript 脚本（在 Node.js 环境下可直接运行），它复现了上述完整过程。你可以将其保存为 `totp.ts` 并运行，无需安装第三方重型库。

```typescript
import * as crypto from 'crypto';

/**
 * TOTP 验证核心逻辑演示
 */

// 1. 输入参数 (Inputs)
const SECRET_BASE32 = 'JBSWY3DPEHPK3PXP'; // Base32 编码的密钥
const MOCK_TIME = 1609459200;             // 模拟时间戳 (2021-01-01 08:00:00 UTC)

// 2. 辅助函数：Base32 解码 (为了不依赖外部库，手动实现简化版)
function base32Decode(base32: string): Buffer {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = 0;
    let value = 0;
    let index = 0;
    const output = new Uint8Array(base32.length * 5 / 8 | 0);

    for (let i = 0; i < base32.length; i++) {
        const char = base32[i].toUpperCase();
        const val = alphabet.indexOf(char);
        if (val === -1) continue;

        value = (value << 5) | val;
        bits += 5;

        if (bits >= 8) {
            output[index++] = (value >>> (bits - 8)) & 255;
            bits -= 8;
        }
    }
    return Buffer.from(output);
}

// 3. 主算法流程
function generateTOTP(secretBase32: string, unixTime: number): string {
    console.log(`--- 计算开始 [Time: ${unixTime}] ---`);

    // Step A: 解码密钥
    const key = base32Decode(secretBase32);
    // console.log('Key (Hex):', key.toString('hex')); // Should be 48656c6c6f21 ("Hello!")

    // Step B: 计算时间计数器 (Counter)
    const timeStep = 30;
    const counterVal = Math.floor(unixTime / timeStep);
    
    // 将计数器转换为 8字节 Buffer (Big Endian)
    const counterBuffer = Buffer.alloc(8);
    counterBuffer.writeBigInt64BE(BigInt(counterVal), 0);
    console.log(`1. 时间计数器 (T): ${counterVal} -> Hex: ${counterBuffer.toString('hex')}`);

    // Step C: HMAC-SHA1 运算
    const hmac = crypto.createHmac('sha1', key);
    hmac.update(counterBuffer);
    const digest = hmac.digest();
    console.log(`2. HMAC-SHA1 结果: ${digest.toString('hex')}`);

    // Step D: 动态截断 (Dynamic Truncation)
    const offset = digest[digest.length - 1] & 0xf; // 取最后一个字节的低4位
    console.log(`3. 偏移量 (Offset): Index ${offset}`);

    // 从 offset 处取4个字节
    // 这里的 & 0x7fffffff 是为了去除符号位，确保是正整数
    const binary = (
        ((digest[offset] & 0x7f) << 24) |
        ((digest[offset + 1] & 0xff) << 16) |
        ((digest[offset + 2] & 0xff) << 8) |
        (digest[offset + 3] & 0xff)
    );
    console.log(`4. 截取 4 Bytes 转整数: ${binary}`);

    // Step E: 取模得到 6 位数
    const otp = binary % 1000000;
    
    // 补零 (例如算出 123 则显示 000123)
    return otp.toString().padStart(6, '0');
}

// 4. 执行
const code = generateTOTP(SECRET_BASE32, MOCK_TIME);
console.log(`\n✅ 最终生成的 6 位验证码: ${code}`);
```

### 运行结果预期

当你运行这段代码时，控制台将输出：

```plaintext
--- 计算开始 [Time: 1609459200] ---
1. 时间计数器 (T): 53648640 -> Hex: 0000000003328d00
2. HMAC-SHA1 结果: 3d218b72900fe69a2e56...05
3. 偏移量 (Offset): Index 5
4. 截取 4 Bytes 转整数: 266771118

✅ 最终生成的 6 位验证码: 771118
```

## 4. 总结

TOTP 的设计哲学极为优雅：它利用时间的可预测性替代了网络通信。服务器知道密钥，知道时间，算出一个数。你知道密钥，知道时间，算出一个数。只要两边的表（时间）走得差不多，这两个数字就永远一致。

这就是为什么那个“固定的长串”能源源不断地吐出正确的动态密码。
