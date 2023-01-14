export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      groups: {
        Row: {
          banner_url: string | null
          created_at: string | null
          description: string | null
          id: string
          logo_url: string | null
          name: string
          owner: string
          updated_at: string | null
        }
        Insert: {
          banner_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          owner: string
          updated_at?: string | null
        }
        Update: {
          banner_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          owner?: string
          updated_at?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_file_name: string | null
          banner_url: string | null
          created_at: string
          discriminator: string | null
          id: string
          reputation: number
          updated_at: string
          username: string | null
          verified: boolean
        }
        Insert: {
          avatar_file_name?: string | null
          banner_url?: string | null
          created_at?: string
          discriminator?: string | null
          id: string
          reputation?: number
          updated_at?: string
          username?: string | null
          verified?: boolean
        }
        Update: {
          avatar_file_name?: string | null
          banner_url?: string | null
          created_at?: string
          discriminator?: string | null
          id?: string
          reputation?: number
          updated_at?: string
          username?: string | null
          verified?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

