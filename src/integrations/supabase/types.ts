export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bracelet_materials: {
        Row: {
          active: boolean
          base_price: number
          color: string | null
          id: string
          image_url: string | null
          name: string
        }
        Insert: {
          active?: boolean
          base_price?: number
          color?: string | null
          id?: string
          image_url?: string | null
          name: string
        }
        Update: {
          active?: boolean
          base_price?: number
          color?: string | null
          id?: string
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
      bracelet_sizes: {
        Row: {
          description: string | null
          id: string
          size_name: string
          wrist_cm: number
        }
        Insert: {
          description?: string | null
          id?: string
          size_name: string
          wrist_cm: number
        }
        Update: {
          description?: string | null
          id?: string
          size_name?: string
          wrist_cm?: number
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          created_at: string
          customization_id: string | null
          id: string
          product_id: string | null
          quantity: number
          unit_price: number
          user_id: string
        }
        Insert: {
          created_at?: string
          customization_id?: string | null
          id?: string
          product_id?: string | null
          quantity?: number
          unit_price: number
          user_id: string
        }
        Update: {
          created_at?: string
          customization_id?: string | null
          id?: string
          product_id?: string | null
          quantity?: number
          unit_price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_customization_id_fkey"
            columns: ["customization_id"]
            isOneToOne: false
            referencedRelation: "custom_designs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      charm_categories: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      charms: {
        Row: {
          active: boolean
          category_id: string | null
          color: string | null
          created_at: string
          id: string
          image_url: string | null
          material: string | null
          name: string
          price: number
          stock_quantity: number
        }
        Insert: {
          active?: boolean
          category_id?: string | null
          color?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          material?: string | null
          name: string
          price?: number
          stock_quantity?: number
        }
        Update: {
          active?: boolean
          category_id?: string | null
          color?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          material?: string | null
          name?: string
          price?: number
          stock_quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "charms_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "charm_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          description: string | null
          id: string
          image_url: string | null
          name: string
          slug: string
        }
        Insert: {
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          slug: string
        }
        Update: {
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      coupons: {
        Row: {
          active: boolean
          code: string
          created_at: string
          discount_type: string
          discount_value: number
          expires_at: string | null
          id: string
          usage_limit: number | null
          used_count: number
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          discount_type: string
          discount_value: number
          expires_at?: string | null
          id?: string
          usage_limit?: number | null
          used_count?: number
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          id?: string
          usage_limit?: number | null
          used_count?: number
        }
        Relationships: []
      }
      custom_design_charms: {
        Row: {
          charm_id: string
          custom_design_id: string
          id: string
          position_index: number
          price_at_time: number
          quantity: number
        }
        Insert: {
          charm_id: string
          custom_design_id: string
          id?: string
          position_index?: number
          price_at_time?: number
          quantity?: number
        }
        Update: {
          charm_id?: string
          custom_design_id?: string
          id?: string
          position_index?: number
          price_at_time?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "custom_design_charms_charm_id_fkey"
            columns: ["charm_id"]
            isOneToOne: false
            referencedRelation: "charms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "custom_design_charms_custom_design_id_fkey"
            columns: ["custom_design_id"]
            isOneToOne: false
            referencedRelation: "custom_designs"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_designs: {
        Row: {
          base_material_id: string | null
          cord_color: string | null
          created_at: string
          id: string
          personal_note: string | null
          preview_image_url: string | null
          size_id: string | null
          total_price: number
          user_id: string
        }
        Insert: {
          base_material_id?: string | null
          cord_color?: string | null
          created_at?: string
          id?: string
          personal_note?: string | null
          preview_image_url?: string | null
          size_id?: string | null
          total_price?: number
          user_id: string
        }
        Update: {
          base_material_id?: string | null
          cord_color?: string | null
          created_at?: string
          id?: string
          personal_note?: string | null
          preview_image_url?: string | null
          size_id?: string | null
          total_price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "custom_designs_base_material_id_fkey"
            columns: ["base_material_id"]
            isOneToOne: false
            referencedRelation: "bracelet_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "custom_designs_size_id_fkey"
            columns: ["size_id"]
            isOneToOne: false
            referencedRelation: "bracelet_sizes"
            referencedColumns: ["id"]
          },
        ]
      }
      faq_items: {
        Row: {
          active: boolean
          answer: string
          id: string
          question: string
          sort_order: number
        }
        Insert: {
          active?: boolean
          answer: string
          id?: string
          question: string
          sort_order?: number
        }
        Update: {
          active?: boolean
          answer?: string
          id?: string
          question?: string
          sort_order?: number
        }
        Relationships: []
      }
      order_items: {
        Row: {
          custom_design_id: string | null
          id: string
          item_details: Json | null
          item_name: string
          order_id: string
          product_id: string | null
          quantity: number
          subtotal: number
          unit_price: number
        }
        Insert: {
          custom_design_id?: string | null
          id?: string
          item_details?: Json | null
          item_name: string
          order_id: string
          product_id?: string | null
          quantity: number
          subtotal: number
          unit_price: number
        }
        Update: {
          custom_design_id?: string | null
          id?: string
          item_details?: Json | null
          item_name?: string
          order_id?: string
          product_id?: string | null
          quantity?: number
          subtotal?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_custom_design_id_fkey"
            columns: ["custom_design_id"]
            isOneToOne: false
            referencedRelation: "custom_designs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_name: string
          discount_amount: number
          email: string
          id: string
          order_code: string
          order_status: Database["public"]["Enums"]["order_status"]
          payment_method: string
          payment_status: Database["public"]["Enums"]["payment_status"]
          phone: string
          shipping_address: string
          shipping_fee: number
          subtotal: number
          total_amount: number
          tracking_note: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          customer_name: string
          discount_amount?: number
          email: string
          id?: string
          order_code?: string
          order_status?: Database["public"]["Enums"]["order_status"]
          payment_method: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          phone: string
          shipping_address: string
          shipping_fee?: number
          subtotal: number
          total_amount: number
          tracking_note?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          customer_name?: string
          discount_amount?: number
          email?: string
          id?: string
          order_code?: string
          order_status?: Database["public"]["Enums"]["order_status"]
          payment_method?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          phone?: string
          shipping_address?: string
          shipping_fee?: number
          subtotal?: number
          total_amount?: number
          tracking_note?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          alt_text: string | null
          id: string
          image_url: string
          product_id: string
          sort_order: number
        }
        Insert: {
          alt_text?: string | null
          id?: string
          image_url: string
          product_id: string
          sort_order?: number
        }
        Update: {
          alt_text?: string | null
          id?: string
          image_url?: string
          product_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean
          category_id: string | null
          collection_id: string | null
          created_at: string
          description: string | null
          featured: boolean
          id: string
          image_url: string | null
          material: string | null
          name: string
          price: number
          product_story: string | null
          rating: number | null
          slug: string
          stock_quantity: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          category_id?: string | null
          collection_id?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          image_url?: string | null
          material?: string | null
          name: string
          price: number
          product_story?: string | null
          rating?: number | null
          slug: string
          stock_quantity?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          category_id?: string | null
          collection_id?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          image_url?: string | null
          material?: string | null
          name?: string
          price?: number
          product_story?: string | null
          rating?: number | null
          slug?: string
          stock_quantity?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          blocked: boolean
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          blocked?: boolean
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          blocked?: boolean
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          admin_reply: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_reply?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_reply?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: Database["public"]["Enums"]["ticket_status"]
          subject?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          active: boolean
          content: string
          created_at: string
          customer_name: string
          id: string
          image_url: string | null
          rating: number
        }
        Insert: {
          active?: boolean
          content: string
          created_at?: string
          customer_name: string
          id?: string
          image_url?: string | null
          rating?: number
        }
        Update: {
          active?: boolean
          content?: string
          created_at?: string
          customer_name?: string
          id?: string
          image_url?: string | null
          rating?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "customer" | "editor" | "super_admin"
      order_status:
        | "pending"
        | "confirmed"
        | "handmade"
        | "shipping"
        | "completed"
        | "cancelled"
      payment_status: "unpaid" | "paid" | "refunded"
      ticket_status: "open" | "in_progress" | "resolved" | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["customer", "editor", "super_admin"],
      order_status: [
        "pending",
        "confirmed",
        "handmade",
        "shipping",
        "completed",
        "cancelled",
      ],
      payment_status: ["unpaid", "paid", "refunded"],
      ticket_status: ["open", "in_progress", "resolved", "closed"],
    },
  },
} as const
