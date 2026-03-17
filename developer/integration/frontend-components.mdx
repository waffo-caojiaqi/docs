---
title: "前端组件"
description: "使用 Waffo Payment Element 将支付表单直接嵌入您的网页，提供完全自定义的支付体验。"
---

## 组件使用

Waffo Payment Element 是一套可高度定制的支付 UI 组件，支持将支付表单无缝嵌入您现有的网页，用户全程留在您的域名下，有效减少支付跳出率。

### 引入 SDK

```html
<!-- 在 HTML head 中引入 Waffo.js -->
<script src="https://js.waffo.com/v1/waffo.js"></script>
```

或使用 npm 包：

```bash
npm install @waffo/js
```

```javascript
import { loadWaffo } from '@waffo/js';
const waffoPromise = loadWaffo('pk_test_xxx');
```

### 初始化 SDK

```javascript
const waffoPayment = new WaffoPayment({
  apiKey: 'pk_test_xxx',
  environment: 'test' | 'production',
  locale: 'zh-CN' | 'en-US',
  appearance: {
    theme: 'light' | 'dark' | 'night',
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      borderRadius: '4px'
    }
  }
});
```

### 创建 Payment Element

```javascript
// 从服务端获取 clientSecret
const { clientSecret } = await fetch('/create-payment-intent').then(r => r.json());

// 初始化 Elements 实例
const elements = waffoPayment.elements({ 
  appearance, 
  clientSecret 
});

// 创建支付组件
const paymentElement = elements.create('payment', {
  layout: 'accordion',  // 或 'tabs'
  paymentMethodOrder: ['card', 'alipay', 'wechat_pay'],
  defaultValues: {
    billingDetails: {
      name: '张三',
      email: 'user@example.com',
    }
  }
});

// 挂载到 DOM 元素
paymentElement.mount('#payment-element');
```

### HTML 结构

```html
<form id="payment-form">
  <div id="payment-element">
    <!-- Waffo Payment Element 将在此渲染 -->
  </div>
  
  <div id="error-message">
    <!-- 错误信息展示区域 -->
  </div>
  
  <button type="submit" id="submit-button">
    确认支付
  </button>
</form>
```

### 提交支付

```javascript
const form = document.getElementById('payment-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  // 禁用提交按钮，防止重复提交
  document.getElementById('submit-button').disabled = true;
  
  const { error } = await waffoPayment.confirmPayment({
    elements,
    confirmParams: {
      return_url: 'https://example.com/order/complete',
    },
  });
  
  if (error) {
    // 展示错误信息
    const messageContainer = document.getElementById('error-message');
    messageContainer.textContent = error.message;
    document.getElementById('submit-button').disabled = false;
  }
  // 如果没有错误，用户将被重定向到 return_url
});
```

## 前端集成

### React 集成示例

```jsx
import { useState, useEffect } from 'react';

function PaymentForm({ clientSecret }) {
  const [waffo, setWaffo] = useState(null);
  const [elements, setElements] = useState(null);
  
  useEffect(() => {
    const instance = new WaffoPayment({ 
      apiKey: 'pk_test_xxx',
      appearance: { theme: 'light' }
    });
    setWaffo(instance);
    
    const elems = instance.elements({ clientSecret });
    const paymentEl = elems.create('payment');
    paymentEl.mount('#payment-element');
    setElements(elems);
  }, [clientSecret]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!waffo || !elements) return;
    
    const { error } = await waffo.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/complete` },
    });
    
    if (error) {
      console.error(error.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div id="payment-element" />
      <button type="submit">支付</button>
    </form>
  );
}
```

### Vue 3 集成示例

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div id="payment-element"></div>
    <button type="submit" :disabled="loading">
      {{ loading ? '处理中...' : '确认支付' }}
    </button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['clientSecret']);
const loading = ref(false);
const errorMessage = ref('');
let waffoInstance = null;
let elementsInstance = null;

onMounted(() => {
  waffoInstance = new WaffoPayment({ apiKey: 'pk_test_xxx' });
  elementsInstance = waffoInstance.elements({ clientSecret: props.clientSecret });
  
  const paymentElement = elementsInstance.create('payment');
  paymentElement.mount('#payment-element');
});

async function handleSubmit() {
  loading.value = true;
  
  const { error } = await waffoInstance.confirmPayment({
    elements: elementsInstance,
    confirmParams: { return_url: `${window.location.origin}/complete` },
  });
  
  if (error) {
    errorMessage.value = error.message;
    loading.value = false;
  }
}
</script>
```

## 样式定制

### CSS Variables 完整列表

```javascript
const appearance = {
  theme: 'custom',
  variables: {
    // 颜色
    colorPrimary: '#2C8CFF',      // 主色调（按钮、选中状态）
    colorBackground: '#ffffff',    // 背景色
    colorText: '#30313d',          // 正文文字颜色
    colorDanger: '#ef4444',        // 错误/危险状态颜色
    colorSuccess: '#22c55e',       // 成功状态颜色
    colorWarning: '#f59e0b',       // 警告状态颜色
    
    // 间距
    spacingUnit: '4px',            // 基础间距单元
    spacingGridRow: '16px',        // 行间距
    spacingGridColumn: '16px',     // 列间距
    
    // 圆角
    borderRadius: '8px',           // 输入框圆角
    
    // 字体
    fontFamily: '"PingFang SC", "Helvetica Neue", sans-serif',
    fontSizeBase: '14px',
    fontSizeSm: '12px',
    fontWeightNormal: '400',
    fontWeightMedium: '500',
  },
  rules: {
    // 针对特定组件的精细样式控制
    '.Input': {
      border: '1px solid #e5e7eb',
      boxShadow: 'none',
    },
    '.Input:focus': {
      borderColor: '#2C8CFF',
      boxShadow: '0 0 0 3px rgba(44, 140, 255, 0.1)',
    },
    '.Label': {
      fontWeight: '500',
      color: '#374151',
    },
  }
};
```

### 主题预设说明

| 主题 | 适用场景 |
|------|---------|
| `light` | 默认浅色主题，适合大多数网站 |
| `dark` | 深色主题，适合深色系网站 |
| `night` | 夜间模式，高对比度深色 |
| `custom` | 完全自定义，配合 `variables` 使用 |

## 事件监听

```javascript
paymentElement.on('change', (event) => {
  if (event.complete) {
    // 用户已填写完整支付信息，可以激活提交按钮
    document.getElementById('submit-button').disabled = false;
  }
  
  if (event.error) {
    // 实时展示验证错误
    document.getElementById('error-message').textContent = event.error.message;
  }
});

paymentElement.on('ready', () => {
  // 组件加载完成，可以隐藏 loading 状态
  document.getElementById('loading').style.display = 'none';
});
```

## 支持的语言

| 语言代码 | 语言 |
|---------|------|
| `zh-CN` | 简体中文 |
| `zh-TW` | 繁体中文 |
| `en-US` | 英语 |
| `ja-JP` | 日语 |
| `ko-KR` | 韩语 |

```javascript
const waffoPayment = new WaffoPayment({
  apiKey: 'pk_test_xxx',
  locale: 'zh-CN',  // 设置界面语言
});
```
