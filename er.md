erDiagram

  auth_users {
    uuid id PK
    text email
  }

  groups {
    bigint id PK
    text title
    text description
    uuid owner_id FK
    timestamp created_at
    timestamp updated_at
  }

  group_users {
    bigint id PK
    bigint group_id FK
    uuid user_id FK
    timestamp joined_at
  }

  categories {
    bigint id PK
    bigint group_id FK
    text name
    timestamp created_at
    timestamp updated_at
  }

  tags {
    bigint id PK
    bigint group_id FK
    text name
    timestamp created_at
    timestamp updated_at
  }

  transactions {
    bigint id PK
    bigint group_id FK
    uuid user_id FK
    numeric amount
    text type
    text description
    bigint category_id FK
    timestamp created_at
    timestamp updated_at
  }

  transaction_tags {
    bigint transaction_id FK
    bigint tag_id FK
  }

  invitations {
    bigint id PK
    bigint group_id FK
    text email
    uuid invited_by FK
    timestamp invited_at
    boolean accepted
  }

  %% روابط
  auth_users ||--o{ groups : "owns"
  auth_users ||--o{ group_users : "member_of"
  auth_users ||--o{ transactions : "creates"
  auth_users ||--o{ invitations : "sends"

  groups ||--o{ group_users : "has members"
  groups ||--o{ categories : "has"
  groups ||--o{ tags : "has"
  groups ||--o{ transactions : "has"
  groups ||--o{ invitations : "has"

  categories ||--o{ transactions : "categorizes"

  transactions ||--o{ transaction_tags : "tagged_with"
  tags ||--o{ transaction_tags : "tags"
 