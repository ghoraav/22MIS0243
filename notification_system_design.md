# Campus Notification System Design

## Overview

The Campus Notification System is designed to deliver important notifications to students in a scalable and reliable way. The system supports different notification types such as placement alerts, exam results, academic announcements, and campus events.

The backend architecture is designed as a microservice-based system with priority handling, optimized querying, and scalable notification delivery.

---

# Stage 1 — REST API Design

## 1. Fetch Notifications

### Endpoint

GET /notifications

### Description

Fetch all notifications for a user.

### Response

```json
{
  "success": true,
  "notifications": []
}
```

---

## 2. Fetch Priority Notifications

### Endpoint

GET /notifications/priority

### Description

Returns top priority notifications based on ranking algorithm.

### Response

```json
{
  "success": true,
  "notifications": []
}
```

---

## 3. Mark Notification as Read

### Endpoint

PATCH /notifications/:id/read

### Description

Marks notification as read.

### Response

```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

# Stage 2 — Database Design

## Notifications Table

| Field | Type | Description |
|---|---|---|
| id | UUID | Unique notification id |
| user_id | UUID | Student id |
| type | VARCHAR | placement/result/event |
| title | VARCHAR | Notification title |
| message | TEXT | Notification body |
| is_read | BOOLEAN | Read status |
| created_at | TIMESTAMP | Notification timestamp |

---

## Users Table

| Field | Type |
|---|---|
| id | UUID |
| name | VARCHAR |
| email | VARCHAR |
| department | VARCHAR |

---

# Stage 3 — Query Optimization

To improve notification retrieval performance:

## Indexing Strategy

Indexes can be created on:

- user_id
- created_at
- type
- is_read

Example:

```sql
CREATE INDEX idx_user_notifications
ON notifications(user_id);
```

---

## Pagination

Pagination should be implemented to avoid loading large notification datasets.

Example:

```text
GET /notifications?page=1&limit=20
```

---

# Stage 4 — Scaling Strategy

## Horizontal Scaling

The notification service can be scaled horizontally using multiple backend instances behind a load balancer.

---

## Caching

Frequently accessed notifications can be cached using Redis.

Benefits:
- reduced database load
- faster response times

---

## Queue-Based Processing

Heavy notification delivery should use message queues such as RabbitMQ or Kafka.

This avoids blocking API requests.

---

# Stage 5 — Reliable Notification Delivery

To ensure reliable delivery:

## Retry Mechanism

Failed notifications should be retried automatically.

---

## Dead Letter Queue

Notifications that fail repeatedly can be moved to a dead-letter queue for manual inspection.

---

## Delivery Status Tracking

Each notification can maintain status values such as:

- pending
- sent
- failed
- read

---

# Stage 6 — Priority Inbox Implementation

The system prioritizes notifications based on:

- notification type
- recency
- unread status

---

## Priority Formula

```text
priorityScore =
(typeWeight * 0.7) +
(recencyWeight * 0.3)
```

---

## Type Weights

| Notification Type | Weight |
|---|---|
| Placement | 10 |
| Result | 7 |
| Event | 5 |

---

## Recency Scoring

Recent notifications receive higher priority scores.

Older notifications gradually decrease in ranking.

---

## Final Workflow

```text
Fetch Notifications
        ↓
Calculate Priority Score
        ↓
Sort by Priority
        ↓
Return Top Notifications
```

---

# Conclusion

The proposed notification system provides:

- scalable architecture
- reliable notification delivery
- optimized querying
- priority-based notification handling
- clean microservice separation

The system is designed to efficiently support large-scale campus communication platforms.
