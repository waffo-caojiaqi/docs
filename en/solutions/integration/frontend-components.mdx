---
title: "Frontend components"
description: "Waffo frontend JS component library, supporting embedded payment forms, style customization, and building payment flows."
---

## Frontend integration

Waffo.js is a frontend JavaScript library provided by Waffo. It lets you embed a payment form in your own page without redirecting users to an external page. Waffo handles all sensitive card data to ensure PCI compliance.

**Include Waffo.js:**

```html
<script src="https://js.waffo.com/v1/waffo.js"></script>
```

**Initialize and mount the payment form:**

```javascript
// Initialize Waffo.js (use a publishable key, not a Secret Key)
const waffo = Waffo('pk_live_your_publishable_key');

// Create an Elements instance
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

// Mount the payment form
const paymentElement = elements.create('payment');
paymentElement.mount('#payment-element');
```

## Style customization

Waffo.js supports customizing the component appearance via the `appearance` configuration option—no need to modify CSS files:

```javascript
const elements = waffo.elements({
  appearance: {
    theme: 'flat',  // Optional: flat | minimal | night | stripe
    variables: {
      colorPrimary: '#2C8CFF',      // Primary color
      colorBackground: '#ffffff',   // Background color
      colorText: '#1a1a1a',         // Text color
      colorDanger: '#FF4D4F',       // Error color
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

## Create a payment

After the user finishes entering payment information, call `confirmPayment` to complete the payment:

```javascript
const form = document.getElementById('payment-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // First, retrieve the Client Secret from your server (by creating a PaymentIntent)
  const clientSecret = await fetchClientSecretFromServer();

  const { error } = await waffo.confirmPayment({
    elements,
    clientSecret,
    confirmParams: {
      return_url: 'https://yoursite.com/payment/result'
    }
  });

  if (error) {
    // Display the error message to the user
    document.getElementById('error-message').textContent = error.message;
  }
  // On successful payment, it will automatically redirect to return_url
});
```

**Complete HTML example:**

```html
<form id="payment-form">
  <div id="payment-element"></div>
  <div id="error-message" style="color: red;"></div>
  <button type="submit">Confirm payment</button>
</form>
```

For more frontend component options (such as a separate card number form, Apple Pay button, etc.), see the [Waffo.js API reference](/developer/api/common).