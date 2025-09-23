export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
        };
      };

      groups: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          description: string | null;
          color: string | null;
          icon: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          description?: string | null;
          color?: string | null;
          icon?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          owner_id?: string;
          name?: string;
          description?: string | null;
          color?: string | null;
          icon?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      user_groups: {
        Row: {
          user_id: string;
          group_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          group_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          group_id?: string;
          created_at?: string;
        };
      };

      wallets: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          color: string | null;
          icon: string | null;
          currency: 'USD' | 'EUR' | 'IRR';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          color?: string | null;
          icon?: string | null;
          currency: 'USD' | 'EUR' | 'IRR';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          name?: string;
          description?: string | null;
          color?: string | null;
          icon?: string | null;
          currency?: 'USD' | 'EUR' | 'IRR';
          created_at?: string;
          updated_at?: string;
        };
      };

      categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          color: string | null;
          icon: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          color?: string | null;
          icon?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          color?: string | null;
          icon?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      tags: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          color: string | null;
          icon: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          color?: string | null;
          icon?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          color?: string | null;
          icon?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      invitations: {
        Row: {
          id: string;
          group_id: string;
          email: string;
          status: 'pending' | 'accepted' | 'rejected';
          sent_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          group_id: string;
          email: string;
          status?: 'pending' | 'accepted' | 'rejected';
          sent_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          group_id?: string;
          email?: string;
          status?: 'pending' | 'accepted' | 'rejected';
          sent_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      transactions: {
        Row: {
          id: string;
          amount: number;
          type: 'income' | 'expense' | 'transfer';
          wallet_id: string;
          from_wallet_id: string | null;
          to_wallet_id: string | null;
          group_id: string | null;
          category_id: string | null;
          description: string | null;
          color: string | null;
          icon: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          amount: number;
          type: 'income' | 'expense' | 'transfer';
          wallet_id: string;
          from_wallet_id?: string | null;
          to_wallet_id?: string | null;
          group_id?: string | null;
          category_id?: string | null;
          description?: string | null;
          color?: string | null;
          icon?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          amount?: number;
          type?: 'income' | 'expense' | 'transfer';
          wallet_id?: string;
          from_wallet_id?: string | null;
          to_wallet_id?: string | null;
          group_id?: string | null;
          category_id?: string | null;
          description?: string | null;
          color?: string | null;
          icon?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      transaction_tags: {
        Row: {
          transaction_id: string;
          tag_id: string;
          created_at: string;
        };
        Insert: {
          transaction_id: string;
          tag_id: string;
          created_at?: string;
        };
        Update: {
          transaction_id?: string;
          tag_id?: string;
          created_at?: string;
        };
      };

      roles: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      permissions: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      role_permissions: {
        Row: {
          role_id: string;
          permission_id: string;
          created_at: string;
        };
        Insert: {
          role_id: string;
          permission_id: string;
          created_at?: string;
        };
        Update: {
          role_id?: string;
          permission_id?: string;
          created_at?: string;
        };
      };

      user_roles: {
        Row: {
          user_id: string;
          role_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          role_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          role_id?: string;
          created_at?: string;
        };
      };
    };
  };
}
