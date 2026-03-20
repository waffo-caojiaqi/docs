---
title: "前端组件"
description: "Waffo 前端 JS 组件库，支持内嵌支付表单、样式定制和创建支付流程。"
---

## 前端集成

Waffo.js 是 Waffo 提供的前端 JavaScript 库，允许您在自己的页面中嵌入支付表单，无需用户跳转至外部页面，同时由 Waffo 处理所有敏感卡数据，保障 PCI 合规。

**引入 Waffo.js：**

```html
<script src="https://js.waffo.com/v1/waffo.js"></script>
```

**初始化并挂载支付表单：**

```javascript
// 初始化 Waffo.js（使用可发布密钥，非 Secret Key）
const waffo = Waffo('pk_live_your_publishable_key');

// 创建 Elements 实例
const elements = waffo.elements({
  locale: 'zh-CN',
  appearance: {
    theme: 'flat',
    variables: {
      colorPrimary: '#2C8CFF',
      fontFamily: 'PingFang SC, sans-serif'
    }
  }
});

// 挂载支付表单
const paymentElement = elements.create('payment');
paymentElement.mount('#payment-element');
```

## 样式定制

Waffo.js 支持通过 `appearance` 配置项自定义组件外观，无需修改 CSS 文件：

```javascript
const elements = waffo.elements({
  appearance: {
    theme: 'flat',  // 可选: flat | minimal | night | stripe
    variables: {
      colorPrimary: '#2C8CFF',      // 主色
      colorBackground: '#ffffff',   // 背景色
      colorText: '#1a1a1a',         // 文字颜色
      colorDanger: '#FF4D4F',       // 错误提示色
      fontFamily: 'PingFang SC, sans-serif',
      borderRadius: '8px',
      spacingUnit: '4px'
    },
    rules: {
      '.Input': {
        border: '1px solid #d9d9d9',
        boxShadow: 'none'
      },
      '.Input:focus': {
        border: '1px solid #2C8CFF'
      }
    }
  }
});
```

## 创建支付

在用户填写完支付信息后，调用 `confirmPayment` 完成支付：

```javascript
const form = document.getElementById('payment-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // 先从服务端获取 Client Secret（通过创建 PaymentIntent）
  const clientSecret = await fetchClientSecretFromServer();

  const { error } = await waffo.confirmPayment({
    elements,
    clientSecret,
    confirmParams: {
      return_url: 'https://yoursite.com/payment/result'
    }
  });

  if (error) {
    // 向用户显示错误信息
    document.getElementById('error-message').textContent = error.message;
  }
  // 支付成功会自动跳转至 return_url
});
```

**完整 HTML 示例：**

```html
<form id="payment-form">
  <div id="payment-element"></div>
  <div id="error-message" style="color: red;"></div>
  <button type="submit">确认支付</button>
</form>
```

更多前端组件选项（如卡号单独表单、Apple Pay 按钮等），请参阅 [Waffo.js API 参考](/developer/api/common)。
