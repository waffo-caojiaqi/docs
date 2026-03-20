---
title: "Postman collection"
description: "Download the Waffo API Postman collection to quickly test and debug all API endpoints without writing any code."
---

## Download the collection

Waffo provides an official Postman collection covering all core API endpoints. It includes preconfigured request examples and environment variables to help you get started quickly with API debugging.

### How to get it

**Option 1: Import via link**

In Postman, click “Import” → “Link”, then enter the following URL:

```
https://api.waffo.com/postman/collection.json
```

**Option 2: Download the file**

Visit the [Waffo Developer Center](https://portal.waffo.com/developer/postman) to download the latest Postman Collection file (`.json` format), then import it into Postman.

**Option 3: Fork the public collection**

Search for “Waffo Payment API” in the Postman Public API Network, and fork the official collection directly into your workspace.

## Environment configuration

The Waffo Postman collection includes two preset environments:

### Test environment (Test/Sandbox)

| Variable name | Example value | Description |
|--------|--------|------|
| `base_url` | `https://api-test.waffo.com/v1` | API base URL |
| `secret_key` | `sk_test_xxx` | Test secret key |
| `public_key` | `pk_test_xxx` | Test public key |
| `webhook_secret` | `whsec_test_xxx` | Webhook signing secret |

### Production environment (Production)

| Variable name | Example value | Description |
|--------|--------|------|
| `base_url` | `https://api.waffo.com/v1` | API base URL |
| `secret_key` | `sk_live_xxx` | Live secret key |
| `public_key` | `pk_live_xxx` | Live public key |
| `webhook_secret` | `whsec_live_xxx` | Webhook signing secret |

### Configuration steps

1. After importing the Postman collection, click “Environments” in the top-right corner
2. Select “Test Environment”
3. Enter your actual test keys into the `secret_key` and `public_key` variables
4. Save and activate the environment

## Usage

### Collection structure

The Waffo Postman collection is organized by API module and includes the following folders:

```
Waffo Payment API
├── Authentication        # Authentication tests
├── Payment Intents       # Payment intents
│   ├── Create Payment Intent
│   ├── Confirm Payment Intent
│   ├── Retrieve Payment Intent
│   └── Cancel Payment Intent
├── Checkout Sessions     # Checkout Session
│   ├── Create Session
│   └── Retrieve Session
├── Refunds              # Refunds
│   ├── Create Refund
│   └── Retrieve Refund
├── Subscriptions        # Subscriptions
│   ├── Create Subscription
│   ├── Update Subscription
│   └── Cancel Subscription
├── Payouts              # Payouts
│   ├── Create Payout
│   └── Retrieve Payout
└── Webhooks             # Webhook tests
```

### Use built-in test scripts

Each request in the collection includes a preset test script that automatically validates the response after running:

```javascript
// 示例：创建 PaymentIntent 的测试脚本
pm.test("Status code is 200", () => {
    pm.response.to.have.status(200);
});

pm.test("Response has client_secret", () => {
    const response = pm.response.json();
    pm.expect(response.client_secret).to.include('pi_');
});

// 将 PaymentIntent ID 保存为环境变量，供后续请求使用
pm.environment.set("payment_intent_id", pm.response.json().id);
```

### Run collection tests

Use the Postman Collection Runner to run all tests in bulk:

1. Click the “...” menu next to the collection → “Run collection”
2. Select the test environment
3. Click “Run Waffo Payment API”
4. Review the test report to confirm all endpoints respond normally

### Run with Newman in CI/CD

```bash
# 安装 Newman（Postman 命令行工具）
npm install -g newman

# 运行集合
newman run waffo-api-collection.json \
  --environment waffo-test-env.json \
  --reporters cli,junit \
  --reporter-junit-export results.xml
```

## FAQ

**Q: After importing, requests return a 401 error?**

A: Check whether the `secret_key` in your environment variables is filled in correctly, and confirm you have activated the correct environment.

**Q: How do I test Webhooks?**

A: The collection includes Webhook trigger requests. Together with the [Waffo CLI](/developer/tools/sdk), you can forward events to a local server for testing.

**Q: How do I update the collection version?**

A: Follow update announcements in the Waffo Developer Center, or re-import the latest collection. Your existing environment variable configuration will not be lost.