erDiagram
    auth_users ||--o| profiles : has
    profiles ||--o{ wallets : owns
    profiles ||--o{ user_group : member_of
    groups ||--o{ user_group : has_members
    groups ||--o{ categories : has
    groups ||--o{ tags : has
    groups ||--o{ invitation : has
    wallets ||--o{ transactions : makes
    categories ||--o{ transactions : classifies
    transactions ||--o{ transaction_tag : tagged_with
    tags ||--o{ transaction_tag : has
    roles ||--o{ role_permission : contains
    permissions ||--o{ role_permission : has
    profiles ||--o{ user_role : assigned
    roles ||--o{ user_role : defines
    groups ||--o{ user_role : context


erDiagram
    PROFILES {
        uuid id PK
        text first_name
        text last_name
        text avatar_url
        timestamp created_at
        timestamp updated_at
    }

    GROUPS {
        uuid id PK
        uuid owner_id FK
        text name
        text description
        text color
        text icon
        timestamp created_at
        timestamp updated_at
    }

    USER_GROUP {
        uuid user_id FK
        uuid group_id FK
        timestamp created_at
    }

    INVITATION {
        uuid id PK
        uuid group_id FK
        text email
        enum status
        timestamp sent_at
        timestamp created_at
        timestamp updated_at
    }

    WALLETS {
        uuid id PK
        uuid user_id FK
        text name
        text description
        text color
        text icon
        enum currency
        decimal balance
        timestamp created_at
        timestamp updated_at
    }

    CATEGORIES {
        uuid id PK
        uuid group_id FK
        text name
        text description
        text color
        text icon
        timestamp created_at
        timestamp updated_at
    }

    TAGS {
        uuid id PK
        uuid group_id FK
        text name
        text description
        text color
        text icon
        timestamp created_at
        timestamp updated_at
    }

    TRANSACTIONS {
        uuid id PK
        decimal amount
        enum type
        uuid from_wallet_id FK
        uuid to_wallet_id FK
        uuid group_id FK
        uuid category_id FK
        text description
        text name
        text color
        text icon
        timestamp created_at
        timestamp updated_at
    }

    TRANSACTION_TAG {
        uuid transaction_id FK
        uuid tag_id FK
        timestamp created_at
    }

    ROLES {
        uuid id PK
        text name
        text description
        timestamp created_at
        timestamp updated_at
    }

    PERMISSIONS {
        uuid id PK
        text name
        text description
        timestamp created_at
        timestamp updated_at
    }

    ROLE_PERMISSION {
        uuid role_id FK
        uuid permission_id FK
        timestamp created_at
    }

    USER_ROLE {
        uuid user_id FK
        uuid role_id FK
        uuid group_id FK
        timestamp created_at
    }

    %% روابط
    PROFILES ||--o{ WALLETS : "has"
    PROFILES ||--o{ USER_GROUP : "member of"
    PROFILES ||--o{ USER_ROLE : "assigned"

    GROUPS ||--o{ USER_GROUP : "includes"
    GROUPS ||--o{ INVITATION : "sends"
    GROUPS ||--o{ CATEGORIES : "defines"
    GROUPS ||--o{ TAGS : "defines"
    GROUPS ||--o{ TRANSACTIONS : "logs"

    CATEGORIES ||--o{ TRANSACTIONS : "categorized"
    TAGS ||--o{ TRANSACTION_TAG : "assigned"
    TRANSACTIONS ||--o{ TRANSACTION_TAG : "tagged"

    ROLES ||--o{ USER_ROLE : "applied"
    ROLES ||--o{ ROLE_PERMISSION : "granted"
    PERMISSIONS ||--o{ ROLE_PERMISSION : "granted"
