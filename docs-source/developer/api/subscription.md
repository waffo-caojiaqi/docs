---
title: "订阅支付API"
description: "Waffo 订阅支付接口文档，包含创建订阅、管理订阅和订阅查询的完整说明。"
---

## 创建订阅

`POST /v1/subscriptions`

为指定用户创建一个新的订阅，自动按周期发起扣款。

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| plan_id | string | 是 | 订阅计划 ID（在商户 Portal 中预先创建） |
| customer_id | string | 是 | 用户 ID（需先创建 Customer 对象） |
| payment_method_id | string | 是 | 用于扣款的支付方式 Token |
| trial_days | integer | 否 | 试用天数，试用期内不扣款 |
| start_date | string | 否 | 订阅开始日期（ISO 8601 格式），默认立即开始 |
| metadata | object | 否 | 自定义扩展字段 |
| coupon_id | string | 否 | 优惠券 ID，应用折扣 |

**响应示例：**

```json
{
  "id": "sub_def456abc",
  "object": "subscription",
  "status": "active",
  "customer_id": "cus_xyz789",
  "plan": {
    "id": "plan_monthly_basic",
    "amount": 999,
    "currency": "USD",
    "interval": "month",
    "interval_count": 1
  },
  "current_period_start": "2025-01-15T00:00:00Z",
  "current_period_end": "2025-02-15T00:00:00Z",
  "created_at": "2025-01-15T10:30:00Z"
}
```

## 管理订阅

**更新订阅** `PATCH /v1/subscriptions/{subscription_id}`

| 操作 | 参数 | 说明 |
|------|------|------|
| 升级/降级计划 | `plan_id` | 切换至其他订阅计划，立即生效或下期生效 |
| 更换支付方式 | `payment_method_id` | 更新续费使用的支付方式 |
| 暂停订阅 | `pause_collection` | 暂停自动扣款，保留订阅关系 |
| 恢复订阅 | 清除 `pause_collection` | 恢复自动续费 |

**取消订阅** `DELETE /v1/subscriptions/{subscription_id}`

| 参数 | 类型 | 说明 |
|------|------|------|
| cancel_at_period_end | boolean | `true` 表示当期结束后取消，`false` 表示立即取消 |
| cancellation_reason | string | 取消原因（可选，用于数据分析） |

## 订阅查询

**查询单个订阅** `GET /v1/subscriptions/{subscription_id}`

返回订阅的完整详情，包括当前状态、计划信息和下次扣款时间。

**查询订阅列表** `GET /v1/subscriptions`

支持以下过滤参数：

| 参数 | 说明 |
|------|------|
| customer_id | 按用户 ID 过滤 |
| status | 按状态过滤（active/canceled/past_due/trialing） |
| plan_id | 按订阅计划 ID 过滤 |
| created_after | 创建时间下限（Unix 时间戳） |
| limit | 返回条数（1-100，默认 20） |
| starting_after | 分页游标 |

**订阅相关 Webhook 事件：**

| 事件 | 说明 |
|------|------|
| subscription.created | 订阅创建成功 |
| subscription.updated | 订阅信息变更 |
| subscription.deleted | 订阅取消 |
| invoice.payment_succeeded | 订阅续费成功 |
| invoice.payment_failed | 订阅续费失败 |
