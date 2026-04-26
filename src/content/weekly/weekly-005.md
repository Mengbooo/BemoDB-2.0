---
title: 'W#7 开始上班的一周'
publishDate: '2026-04-20 08:00:00'
description: '累且充盈。'
language: 'zh-CN'
---

第一周上班，体验了一把"新手上路"的滋味——累，但回过头看，确实还挺充盈的。

这周发生了挺多事，趁着周末整理一下，不然过两天就忘了。

---

## AI 中转站踩坑记录

上班了，得给自己整一套 AI 工作流。

咸鱼 minimax 每周 5000 次，30 块一个月，打算买两个，日常开发任务用。不过这个站才开了几个月，没控制台只能查额度，有点担心它跑路——便宜的东西总有这毛病。

micu 中转站用人民币充值，拿来跑 Claude 系列的模型。Opus 4.7 写代码 review 是真猛，一口气挑出来 50 个问题。不过才请求了 3 次就花了 10 块，确实夸张。等 micu 的国产模型 part 修好了改用 glm5.1 试试，据说能省不少。

APIMART 充的是美元，10 刀 = 70 人民币。模型多，包含生图和视频生成的模型，不过还没买，后面可以充点玩玩。不过它的 LLM 好像比 micu 贵，多模态功能还没测试。

还有一些推特上推荐的中转站没看：https://dragoncode.codes/#model-pricing、https://api.tu-zi.com/

总之，单就大模型来说，可能只有中转简单点：官方容易被封且充值麻烦，中转容易跑路和数据不安全。

---

## 外币充值这事儿

光有中转站还不够，得解决充值问题。

**实体 visa 卡**：据说可以去工商银行开，学生身份应该可以，但估计用来充 Claude/OpenAI 额度还是有点悬。

**虚拟卡**：现在用的是 PayPal，之前用它白嫖了一个月的 GPT Plus 会员。

**礼品卡**：我是安卓机，通过 Google Play 礼品卡兑换额度来充值。不过审查很严，昨天买的 20 块 500 日元礼品卡直接被拦下来了。需要物理位置、Google 法定位置、Google 支付资料位置一致才行，总之很麻烦。

---

## VPN 这块儿

昨天才搞明白"机场"是个啥——实际上就是个类似 API 的东西。买了订阅，给个链接，通过 VPN 软件导入，就能拿到可用的节点了。

VPN 软件主流的还是 clash 系：
- 手机拿 Clash Verge Meta，更新勤，我下载的版本是三天前更新的。手机还有个 Clash for Android，不过没更新了。
- 电脑用 Clash Verge，配置项有点多，没太看懂。目前只会导入链接和开系统代理。

之前用的是 SakuraCat，它是机场+外壳的组合软件，外壳自己开发的，没有很多配置项，比较简单。不过和现在用的机场价格一比，简直贵到天上去了。

机场有挺多：
- 目前用**三毛机场**，29.9 包年，500G 一个月，极便宜。不过延迟高，非香港的大部分都 100ms 往上。
- MT 的文档和 X 上都推了 flowercloud.net，老牌稳定，但太贵。lite 包月 39 块 150G，pro 59 块 400G 包月。有钱了可以试试，或者正式工作了再说。
- 现在的三毛机场日常用没什么大问题，不过还是得考虑整一个专用机场。推上推荐了 https://cf.weidu.io/#/auth?invite=uuxJADEv 维度云，15 块 200G 一个月，用 weidu666 折扣码打 85 折。后面可以了解下。

上面这些只是构建 AI 工作流的基础设施问题，后面还得了解下怎么能正式跑起来。

---

## 图像生成初体验

然后是 GPT-image-2，效果难以置信——目前除了中文小字不太清晰以外，没发现什么问题。具体图片在相册里，这里不上传了。

它生成的设计图该怎么转为真实可用的、AI 能看懂的东西？试了一下 Figma Make，效果很差。这个问题先记着。

---

## Code Review 报告初体验

拿 micu 的 Opus 4.7 写了 code review 报告，写得是真好，50 个问题直接挑出来了。4.23 那天修了大概 1/5 到 1/4 的问题，进度还行。

等 micu 的国产模型修好了改用 glm5.1，省点钱。

---

## hermes 跑任务踩坑

尝试让 hermes 同时跑多个任务：跑通 bemoNews、实现一个根据原图 C2PA 判断图片是否是 AI 生成的小工具。

hermes 后面跑着跑着跑死了，换了 CC 才跑出来：https://check-img.bolaxious.cn/

这是第一次用二级域名，将记录值改为 xxx，类型选 CNAME，目标写成对应 URL，就能配置出 xxx.bolaxious.cn。因为阿里云的 DNS 代理在 Cloudflare 上，直接配置 Cloudflare 的 DNS 记录就行。Vercel 好像就是需要用 Cloudflare。

---

## 一些小技巧

学到了一个小技巧：接口出问题了，直接把对应请求的 cURL 复制给后端，更方便。

还学会了关 Google 安全模式：

```bash
#!/bin/bash
open -n /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir=/Users/qiumengbo.123/Desktop/openGoogle
exit
```

---

## 关注了一下这些

- [想象屏幕上的每一个像素都直接从模型实时流式传输而来](https://x.com/billtheinvestor/status/2047034155817680909)。没有 HTML，没有布局引擎，没有代码。只有你想要看到的画面。
- [真实照片 + 街头涂鸦叠加 skill](https://x.com/VigoCreativeAI/status/2046961307048427630)，这就是要的照片。
- [HTML enters 3D](https://x.com/gaborpribek/status/2047010011210273124)。
- [高桥流 PPT skill](https://x.com/lijigang/status/2046838238011396157)。可以参考这个人的 skill 集是怎么构建的，因为自己没搭过。

---

## 这周还在水 LinuxDO

这个社区活跃度真挺高的，评论很多。

---

## 模型炸裂周

这周模型出得也太多了，Opus 4.7 还没捂热，GPT 5.5 出来了，然后 DeepSeek V4 出来了——据说 V4 的交付效果跟 Opus 4.6 非 thinking 差不多。如果后面有便宜的 coding plan 可以试试。

另外据说 Codex 的 computer use 很牛，后面发工资了充点米拿它试试，据说能自主完成任务。

---

累是真的累，但回过头来看这一周，还是挺充盈的。

下周继续。
