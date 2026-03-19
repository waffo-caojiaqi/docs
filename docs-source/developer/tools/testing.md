---
title: "测试工具"
description: "使用 Waffo 沙盒环境和测试卡号验证您的支付集成，确保上线前一切正常运行。"
---

## 测试环境配置

Waffo 提供独立的沙盒（Sandbox）测试环境，与生产环境完全隔离。测试环境中的所有交易均为模拟数据，不会产生真实的资金流动。

### 获取测试密钥

登录 [portal.waffo.com](https://portal.waffo.com)，进入「开发者设置」→「API 密钥」，切换到「测试模式」即可获取：

- **测试公钥**：`pk_test_xxx`（用于前端 SDK 初始化）
- **测试私钥**：`sk_test_xxx`（用于服务端 API 调用）

### SDK 测试环境初始化

```javascript
const waffoPayment = new WaffoPayment({
  apiKey: 'pk_test_xxx',
  environment: 'test',  // 明确指定测试环境
});
```

```javascript
// 服务端 Node.js
const Waffo = require('@waffo/node');
const waffo = new Waffo('sk_test_xxx');
// 测试环境 API 端点：https://api-test.waffo.com/v1
```

## 测试卡号

在测试环境中，使用以下测试卡号模拟不同的支付场景：

### 成功支付卡

| 卡组织 | 卡号 | 过期日期 | CVV |
|--------|------|----------|-----|
| Visa | `4242 4242 4242 4242` | 任意未来日期 | 任意3位 |
| Mastercard | `5555 5555 5555 4444` | 任意未来日期 | 任意3位 |
| American Express | `3782 8224 6310 005` | 任意未来日期 | 任意4位 |
| UnionPay | `6200 0000 0000 0005` | 任意未来日期 | 任意3位 |
| Visa (3D Secure) | `4000 0027 6000 3184` | 任意未来日期 | 任意3位 |

### 失败场景卡

| 卡号 | 触发场景 | 错误码 |
|------|---------|--------|
| `4000 0000 0000 0002` | 卡被拒绝（通用） | `card_declined` |
| `4000 0000 0000 9995` | 余额不足 | `insufficient_funds` |
| `4000 0000 0000 0069` | 卡已过期 | `expired_card` |
| `4000 0000 0000 0127` | CVC 验证失败 | `incorrect_cvc` |
| `4000 0000 0000 0119` | 处理中错误 | `processing_error` |
| `4000 0000 0000 0341` | 欺诈风险拦截 | `fraudulent` |

### 3D Secure 测试卡

| 卡号 | 行为 |
|------|------|
| `4000 0025 0000 3155` | 始终要求 3DS 验证 |
| `4000 0027 6000 3184` | 3DS 验证成功 |
| `4000 0082 6000 3178` | 3DS 验证失败 |

## 测试场景

### 场景一：标准支付成功

```javascript
// 使用 Visa 测试卡完成一次正常支付
const paymentIntent = await waffo.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  payment_method_types: ['card'],
});

// 前端使用卡号 4242 4242 4242 4242 完成支付
// 预期结果：status 变为 succeeded，收到 payment_intent.succeeded Webhook
```

### 场景二：支付失败处理

```javascript
// 使用余额不足测试卡
// 卡号：4000 0000 0000 9995
// 预期结果：收到 card_declined 错误，status 保持 requires_payment_method
```

### 场景三：退款测试

```javascript
// 先完成一笔成功支付，再发起退款
const refund = await waffo.refunds.create({
  payment_intent: 'pi_test_xxx',  // 已成功支付的 PaymentIntent ID
  amount: 1000,  // 部分退款
});
// 预期结果：status 为 succeeded，原 charge 的 refunded 字段更新
```

### 场景四：Webhook 测试

使用 Waffo CLI 将 Webhook 事件转发到本地：

```bash
# 安装 Waffo CLI
npm install -g @waffo/cli

# 登录
waffo login

# 转发 Webhook 到本地开发服务器
waffo listen --forward-to localhost:3000/webhook

# CLI 将输出一个临时的 Webhook 签名密钥，用于本地验证
```

### 场景五：订阅测试

```javascript
// 创建订阅计划
const subscription = await waffo.subscriptions.create({
  customer: 'cus_test_xxx',
  items: [{ price: 'price_test_xxx' }],
  trial_period_days: 14,
});

// 使用以下测试卡模拟订阅续费失败
// 卡号：4000 0000 0000 0341（首次成功，后续失败）
```

## 测试数据清理

测试环境的数据会定期清理，但您也可以手动删除测试数据：

```javascript
// 取消测试订阅
await waffo.subscriptions.cancel('sub_test_xxx');

// 删除测试客户（同时删除关联的支付方式）
await waffo.customers.del('cus_test_xxx');
```

<Note>
测试环境中创建的数据（客户、支付方式、订阅等）不会影响生产环境，可以放心进行各种测试操作。
</Note>

## 切换到生产环境

完成测试后，将密钥替换为生产密钥，并修改 SDK 初始化配置：

```javascript
// 生产环境配置
const waffoPayment = new WaffoPayment({
  apiKey: process.env.WAFFO_PUBLIC_KEY,  // pk_live_xxx
  environment: 'production',
});
```

```javascript
// 服务端生产密钥
const waffo = new Waffo(process.env.WAFFO_SECRET_KEY);  // sk_live_xxx
```

<Warning>
切换生产环境前，请确保：
1. 所有测试场景均已通过验证
2. Webhook 端点已配置并测试
3. 错误处理逻辑已完善
4. 生产密钥已安全存储在环境变量中，未硬编码在代码里
</Warning>
