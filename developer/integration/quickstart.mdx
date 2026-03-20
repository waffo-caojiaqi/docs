---
title: "快速开始"
description: "通过本指南，在几分钟内完成 Waffo 支付集成，开始接受全球支付。"
---

## 集成指南

本指南将帮助您快速完成 Waffo 支付集成，从注册账户到完成第一笔测试支付，整个过程通常可在 30 分钟内完成。

### 前置条件

在开始集成之前，请确保您已完成以下准备：

1. **注册 Waffo 商户账户** — 前往 [portal.waffo.com](https://portal.waffo.com) 完成注册
2. **获取 API 密钥** — 在商户后台的「开发者设置」中获取测试密钥
3. **选择集成方式** — 根据业务需求选择[托管收银台](/developer/integration/checkout-integration)或[前端组件](/developer/integration/frontend-components)

### API 密钥说明

Waffo 提供两套独立环境的 API 密钥：

| 密钥类型 | 格式 | 用途 |
|---------|------|------|
| 测试公钥 | `pk_test_xxx` | 前端 SDK 初始化，可在浏览器中使用 |
| 测试私钥 | `sk_test_xxx` | 服务端 API 调用，**严禁暴露在前端** |
| 生产公钥 | `pk_live_xxx` | 正式环境前端使用 |
| 生产私钥 | `sk_live_xxx` | 正式环境服务端使用 |

<Warning>
私钥（Secret Key）必须仅在服务端使用。**严禁**将私钥写入前端代码、Git 仓库或任何客户端可访问的位置。
</Warning>

## 沙盒测试

测试环境（沙盒）与生产环境完全隔离，所有测试交易均为模拟数据，不会产生真实资金流动。

### 沙盒环境配置

```javascript
const waffoPayment = new WaffoPayment({
  apiKey: 'pk_test_xxx',      // 使用测试公钥
  environment: 'test',         // 指定测试环境
});
```

### 快速集成示例

以下示例展示了最简化的一次性支付集成流程：

**第一步：服务端创建支付会话**

```javascript
// Node.js 示例
const Waffo = require('@waffo/node');
const waffo = new Waffo('sk_test_xxx');

const paymentIntent = await waffo.paymentIntents.create({
  amount: 1000,          // 金额，单位为最小货币单位（如分）
  currency: 'usd',
  payment_method_types: ['card'],
});

// 将 client_secret 安全地传递给前端
res.json({ clientSecret: paymentIntent.client_secret });
```

**第二步：前端初始化支付**

```html
<script src="https://js.waffo.com/v1/waffo.js"></script>
<div id="checkout-container"></div>

<script>
  const waffoPayment = new WaffoPayment({ apiKey: 'pk_test_xxx', environment: 'test' });
  
  // 从服务端获取 client_secret
  const { clientSecret } = await fetch('/create-payment-intent').then(r => r.json());
  
  const checkout = waffoPayment.initCheckout({
    clientSecret,
    successUrl: 'https://example.com/success',
    cancelUrl: 'https://example.com/cancel',
  });
  
  checkout.mount('#checkout-container');
</script>
```

**第三步：处理支付结果**

```javascript
// 服务端 Webhook 处理
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const event = waffo.webhooks.constructEvent(req.body, req.headers['waffo-signature'], 'whsec_xxx');
  
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    // 处理支付成功逻辑，如更新订单状态
    fulfillOrder(paymentIntent.metadata.order_id);
  }
  
  res.json({ received: true });
});
```

## 认证配置

所有 API 请求必须在 HTTP Header 中携带认证信息：

```http
Authorization: Bearer sk_test_xxx
Content-Type: application/json
```

### Webhook 签名验证

为确保 Webhook 请求来自 Waffo，请验证请求签名：

```javascript
const signature = req.headers['waffo-signature'];
const payload = req.body; // 原始请求体，不要解析为 JSON

try {
  const event = waffo.webhooks.constructEvent(payload, signature, process.env.WEBHOOK_SECRET);
  // 验证通过，处理事件
} catch (err) {
  // 签名验证失败，拒绝请求
  return res.status(400).send('Webhook signature verification failed');
}
```

<Tip>
在开发阶段，您可以使用 Waffo CLI 工具将 Webhook 事件转发到本地开发服务器，无需部署即可调试 Webhook 处理逻辑。
</Tip>

## 下一步

<CardGroup cols={2}>
  <Card title="收银台集成" icon="credit-card" href="/developer/integration/checkout-integration">
    使用 Waffo 托管收银台，快速集成完整支付界面
  </Card>
  <Card title="前端组件" icon="code" href="/developer/integration/frontend-components">
    使用支付组件直接嵌入到您的页面中
  </Card>
  <Card title="测试工具" icon="flask" href="/developer/tools/testing">
    使用测试卡号和测试场景验证您的集成
  </Card>
  <Card title="API 参考" icon="book" href="/developer/api/one-time-payment">
    查看完整的 API 接口文档
  </Card>
</CardGroup>
